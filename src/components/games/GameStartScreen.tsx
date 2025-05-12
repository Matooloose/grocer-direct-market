
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calculator } from 'lucide-react';
import DifficultySelector, { Difficulty } from './DifficultySelector';

interface GameStartScreenProps {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onStartGame: () => void;
}

const GameStartScreen: React.FC<GameStartScreenProps> = ({
  difficulty,
  onDifficultyChange,
  onStartGame
}) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <div className="flex justify-center mb-8">
        <Calculator className="h-16 w-16 text-market-primary" />
      </div>
      <h2 className="text-2xl font-bold text-center mb-6">Math Challenge</h2>
      <p className="text-gray-600 mb-8 text-center">Test your math skills with 10 questions!</p>
      
      <DifficultySelector 
        selectedDifficulty={difficulty}
        onDifficultyChange={onDifficultyChange}
      />
      
      <Button 
        onClick={onStartGame} 
        className="w-full bg-market-primary hover:bg-market-primary/90"
      >
        Start Game
      </Button>
    </div>
  );
};

export default GameStartScreen;
