
import React from 'react';
import { Button } from '@/components/ui/button';

export type Difficulty = 'easy' | 'medium' | 'hard';

interface DifficultySelectorProps {
  selectedDifficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ 
  selectedDifficulty, 
  onDifficultyChange 
}) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium mb-3">Select Difficulty:</h3>
      <div className="flex flex-wrap gap-2">
        <Button 
          onClick={() => onDifficultyChange('easy')}
          variant={selectedDifficulty === 'easy' ? 'default' : 'outline'}
          className={selectedDifficulty === 'easy' ? 'bg-market-primary' : ''}
        >
          Easy
        </Button>
        <Button 
          onClick={() => onDifficultyChange('medium')}
          variant={selectedDifficulty === 'medium' ? 'default' : 'outline'}
          className={selectedDifficulty === 'medium' ? 'bg-market-primary' : ''}
        >
          Medium
        </Button>
        <Button 
          onClick={() => onDifficultyChange('hard')}
          variant={selectedDifficulty === 'hard' ? 'default' : 'outline'}
          className={selectedDifficulty === 'hard' ? 'bg-market-primary' : ''}
        >
          Hard
        </Button>
      </div>
    </div>
  );
};

export default DifficultySelector;
