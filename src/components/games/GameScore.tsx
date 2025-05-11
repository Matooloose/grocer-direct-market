
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calculator } from 'lucide-react';

interface GameScoreProps {
  score: number;
  total: number;
  onRestart: () => void;
}

const GameScore: React.FC<GameScoreProps> = ({ score, total, onRestart }) => {
  const percentage = Math.round((score / total) * 100);
  
  const getMessage = () => {
    if (percentage >= 90) return "Excellent! You're a math genius!";
    if (percentage >= 70) return "Great job! You've got solid math skills!";
    if (percentage >= 50) return "Good effort! Keep practicing!";
    return "Practice makes perfect! Keep trying!";
  };
  
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg text-center">
      <div className="flex justify-center mb-6">
        <Calculator className="h-16 w-16 text-market-primary" />
      </div>
      
      <h2 className="text-2xl font-bold mb-2">Game Over</h2>
      <p className="text-gray-600 mb-6">Here's how you did:</p>
      
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <div className="text-4xl font-bold text-market-primary mb-2">
          {score}/{total}
        </div>
        <div className="text-lg text-gray-700">{percentage}%</div>
        <p className="mt-4 text-gray-600">{getMessage()}</p>
      </div>
      
      <Button 
        onClick={onRestart} 
        className="w-full bg-market-primary hover:bg-market-primary/90"
      >
        Play Again
      </Button>
    </div>
  );
};

export default GameScore;
