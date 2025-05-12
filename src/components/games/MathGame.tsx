
import React, { useState } from 'react';
import { toast } from 'sonner';
import GameScore from './GameScore';
import GameStartScreen from './GameStartScreen';
import QuestionScreen from './QuestionScreen';
import { useQuestionGenerator } from './useQuestionGenerator';
import { Difficulty } from './DifficultySelector';
import { Question } from './QuestionScreen';

const MathGame = () => {
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');

  const { generateQuestion } = useQuestionGenerator(difficulty);
  
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
      setCurrentQuestion(generateQuestion());
      setQuestionCount(prev => prev + 1);
    }
  };
  
  const startGame = () => {
    setScore(0);
    setQuestionCount(0);
    setGameStarted(true);
    setGameOver(false);
    setCurrentQuestion(generateQuestion());
    setQuestionCount(1);
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
      <GameStartScreen 
        difficulty={difficulty} 
        onDifficultyChange={changeDifficulty}
        onStartGame={startGame}
      />
    );
  }
  
  if (gameOver) {
    return <GameScore score={score} total={10} onRestart={restartGame} />;
  }
  
  return currentQuestion ? (
    <QuestionScreen 
      question={currentQuestion}
      questionCount={questionCount}
      score={score}
      difficulty={difficulty}
      onAnswerSelected={handleOptionClick}
      onEndGame={() => setGameOver(true)}
      onChangeDifficulty={changeDifficulty}
    />
  ) : null;
};

export default MathGame;
