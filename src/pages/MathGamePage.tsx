
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import MathGame from '@/components/games/MathGame';

const MathGamePage = () => {
  return (
    <PageLayout>
      <div className="market-container py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Math Challenge</h1>
        <div className="max-w-3xl mx-auto">
          <MathGame />
        </div>
      </div>
    </PageLayout>
  );
};

export default MathGamePage;
