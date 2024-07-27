// src/components/InvestmentScenario.tsx

import React, { useState } from 'react';
import { InvestmentOption, UserInvestment } from '../types/investment';

interface Props {
  option: InvestmentOption;
  onInvest: (investment: UserInvestment) => void;
}

const InvestmentScenario: React.FC<Props> = ({ option, onInvest }) => {
  const [amount, setAmount] = useState<number>(1000);

  const handleInvest = () => {
    onInvest({ option, amount, investedAt: Date.now() });
  };

  return (
    <div className='flex flex-col z-50 gap-3'>
    <h2 className='font-mono text-xl pt-3'>Buy Option {option.name}</h2>
      
    <div  className='bg-slate-700 p-3 rounded-md text-lg flex flex-row justify-center items-center' >
        <div  className='text-lg' >Selling mount in USD: </div>
        <input max={100} min={0} type="number" className='bg-slate-700 outline-none p-3 w-16 text-lg' value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
        <div  className='text-lg' >$</div>
      </div>
      <br /> 
      <button onClick={handleInvest} className='bg-green-700 p-4 rounded-md'>Buy</button>
      </div>
  );
};

export default InvestmentScenario;
