
import React from 'react';
import { InvestmentOption } from '../types/investment';

interface Props {
  selectedOption: InvestmentOption;
}

const RiskReturnVisualization: React.FC<Props> = ({ selectedOption }) => {
  return (
    <div>
      <h2>Risk and Return Visualization</h2>
      <p>Risk Level: {selectedOption.risk}</p>
    </div>
  );
};

export default RiskReturnVisualization;
