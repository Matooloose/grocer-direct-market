
import React from 'react';
import { Button } from '@/components/ui/button';
import { Equal, Plus, Minus, Divide } from 'lucide-react';
import { Difficulty } from './DifficultySelector';

export type Operation = '+' | '-' | '*' | '/';

export interface Question {
  num1: number;
  num2: number;
  operation: Operation;
  answer: number;
  options: number[];
}

interface QuestionScreenProps {
  question: Question;
  questionCount: number;
  score: number;
  difficulty: Difficulty;
  onAnswerSelected: (answer: number) => void;
  onEndGame: () => void;
  onChangeDifficulty: (difficulty: Difficulty) => void;
}

const QuestionScreen: React.FC<QuestionScreenProps> = ({
  question,
  questionCount,
  score,
  difficulty,
  onAnswerSelected,
  onEndGame,
  onChangeDifficulty
}) => {
  const getOperationSymbol = (op: Operation) => {
    switch(op) {
      case '+': return <Plus className="inline h-5 w-5" />;
      case '-': return <Minus className="inline h-5 w-5" />;
      case '*': return 'x';
      case '/': return <Divide className="inline h-5 w-5" />;
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-medium text-gray-500">Question {questionCount} of 10</span>
        <span className="text-sm font-medium text-market-primary">Score: {score}</span>
      </div>
      
      <div className="mb-8">
        <div className="text-2xl font-bold text-center flex items-center justify-center gap-2 mb-6">
          <span>{question.num1}</span>
          <span>{getOperationSymbol(question.operation)}</span>
          <span>{question.num2}</span>
          <span><Equal className="h-5 w-5" /></span>
          <span>?</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {question.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => onAnswerSelected(option)}
              variant="outline"
              className="py-6 text-lg hover:bg-gray-100"
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onEndGame}>
          End Game
        </Button>
        <Button variant="ghost" onClick={() => onChangeDifficulty(difficulty)}>
          Difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </Button>
      </div>
    </div>
  );
};

export default QuestionScreen;
