
import React from 'react';
import { InvestmentSimulationResult } from '../types/investment';

interface Props {
  result: InvestmentSimulationResult;
}

const SimulationResult: React.FC<Props> = ({ result }) => {
  return (
    <div>
      <h2>Simulation Result</h2>
      <p>Final Amount: ${result.finalAmount.toFixed(2)}</p>
      <p>Total Interest: ${result.totalInterest.toFixed(2)}</p>
    </div>
  );
};

export default SimulationResult;
