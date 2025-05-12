
import { useState } from 'react';
import { Question, Operation } from './QuestionScreen';
import { Difficulty } from './DifficultySelector';

export const useQuestionGenerator = (difficulty: Difficulty) => {
  const generateQuestion = (): Question => {
    const operations: Operation[] = ['+', '-', '*', '/'];
    let range: number;
    let operationPool: Operation[];
    
    // Set difficulty
    switch(difficulty) {
      case 'easy':
        range = 10;
        operationPool = ['+', '-'];
        break;
      case 'medium':
        range = 20;
        operationPool = ['+', '-', '*'];
        break;
      case 'hard':
        range = 50;
        operationPool = operations;
        break;
      default:
        range = 10;
        operationPool = ['+', '-'];
    }
    
    const operation = operationPool[Math.floor(Math.random() * operationPool.length)];
    
    let num1: number, num2: number, answer: number;
    
    // Make sure we have nice numbers
    do {
      num1 = Math.floor(Math.random() * range) + 1;
      num2 = Math.floor(Math.random() * range) + 1;
      
      // For division, ensure we get a clean division result
      if (operation === '/') {
        num1 = num1 * num2; // This ensures division works out to a whole number
      }
      
      switch(operation) {
        case '+': answer = num1 + num2; break;
        case '-': 
          // Swap if num2 > num1 to avoid negative results
          if (num2 > num1) [num1, num2] = [num2, num1];
          answer = num1 - num2; 
          break;
        case '*': answer = num1 * num2; break;
        case '/': answer = num1 / num2; break;
      }
    } while (answer < 0 || !Number.isInteger(answer));
    
    // Generate 3 incorrect options
    const options = [answer];
    while (options.length < 4) {
      // Generate a random offset between -5 and 5, but not 0
      let offset = Math.floor(Math.random() * 10) - 5;
      if (offset === 0) offset = 1;
      
      const option = answer + offset;
      if (option >= 0 && !options.includes(option)) {
        options.push(option);
      }
    }
    
    // Shuffle options
    const shuffledOptions = options.sort(() => Math.random() - 0.5);
    
    return {
      num1,
      num2,
      operation,
      answer,
      options: shuffledOptions
    };
  };

  return { generateQuestion };
};
