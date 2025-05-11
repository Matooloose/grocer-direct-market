
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Calculator, Plus, Minus, Divide, Equal } from 'lucide-react';
import { toast } from 'sonner';
import GameScore from './GameScore';

type Operation = '+' | '-' | '*' | '/';
type Difficulty = 'easy' | 'medium' | 'hard';

interface Question {
  num1: number;
  num2: number;
  operation: Operation;
  answer: number;
  options: number[];
}

const MathGame = () => {
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  
  const getOperationSymbol = (op: Operation) => {
    switch(op) {
      case '+': return <Plus className="inline h-5 w-5" />;
      case '-': return <Minus className="inline h-5 w-5" />;
      case '*': return 'x';
      case '/': return <Divide className="inline h-5 w-5" />;
    }
  };
  
  const generateQuestion = () => {
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
    
    setCurrentQuestion({
      num1,
      num2,
      operation,
      answer,
      options: shuffledOptions
    });
    
    setQuestionCount(prev => prev + 1);
  };
  
  const handleOptionClick = (selectedAnswer: number) => {
    if (!currentQuestion) return;
    
    if (selectedAnswer === currentQuestion.answer) {
      toast.success("Correct answer!");
      setScore(prev => prev + 1);
    } else {
      toast.error(`Incorrect. The answer was ${currentQuestion.answer}`);
    }
    
    // Check if game is over
    if (questionCount >= 10) {
      setGameOver(true);
    } else {
      generateQuestion();
    }
  };
  
  const startGame = () => {
    setScore(0);
    setQuestionCount(0);
    setGameStarted(true);
    setGameOver(false);
    generateQuestion();
  };
  
  const restartGame = () => {
    startGame();
  };
  
  const changeDifficulty = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    if (gameStarted) {
      restartGame();
    }
  };
  
  if (!gameStarted) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <div className="flex justify-center mb-8">
          <Calculator className="h-16 w-16 text-market-primary" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Math Challenge</h2>
        <p className="text-gray-600 mb-8 text-center">Test your math skills with 10 questions!</p>
        
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-3">Select Difficulty:</h3>
          <div className="flex flex-wrap gap-2">
            <Button 
              onClick={() => changeDifficulty('easy')}
              variant={difficulty === 'easy' ? 'default' : 'outline'}
              className={difficulty === 'easy' ? 'bg-market-primary' : ''}
            >
              Easy
            </Button>
            <Button 
              onClick={() => changeDifficulty('medium')}
              variant={difficulty === 'medium' ? 'default' : 'outline'}
              className={difficulty === 'medium' ? 'bg-market-primary' : ''}
            >
              Medium
            </Button>
            <Button 
              onClick={() => changeDifficulty('hard')}
              variant={difficulty === 'hard' ? 'default' : 'outline'}
              className={difficulty === 'hard' ? 'bg-market-primary' : ''}
            >
              Hard
            </Button>
          </div>
        </div>
        
        <Button 
          onClick={startGame} 
          className="w-full bg-market-primary hover:bg-market-primary/90"
        >
          Start Game
        </Button>
      </div>
    );
  }
  
  if (gameOver) {
    return <GameScore score={score} total={10} onRestart={restartGame} />;
  }
  
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-medium text-gray-500">Question {questionCount} of 10</span>
        <span className="text-sm font-medium text-market-primary">Score: {score}</span>
      </div>
      
      <div className="mb-8">
        <div className="text-2xl font-bold text-center flex items-center justify-center gap-2 mb-6">
          <span>{currentQuestion?.num1}</span>
          <span>{getOperationSymbol(currentQuestion?.operation as Operation)}</span>
          <span>{currentQuestion?.num2}</span>
          <span><Equal className="h-5 w-5" /></span>
          <span>?</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {currentQuestion?.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleOptionClick(option)}
              variant="outline"
              className="py-6 text-lg hover:bg-gray-100"
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setGameOver(true)}>
          End Game
        </Button>
        <Button variant="ghost" onClick={() => changeDifficulty(difficulty)}>
          Difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </Button>
      </div>
    </div>
  );
};

export default MathGame;
