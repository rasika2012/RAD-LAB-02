// src/components/InvestmentScenario.tsx

import React, { useState } from 'react';
import { InvestmentOption, InvestmentScenario, UserInvestment } from '../types/investment';

interface Props {
  investment: UserInvestment;
  options: InvestmentOption[] | null;
  reSaled: (investment: UserInvestment, deposit:number) => void;
}

const Resale: React.FC<Props> = ({ options, investment, reSaled }) => {
  const [amount, setAmount] = useState<number>(100);

  const handleInvest = () => {
    const soldAmount = amount/100 * investment.amount;
    const moneyValue = soldAmount * (options?.find((option) => option.type === investment.option.type)?.currentPrice??0)/investment.option.currentPrice;
    reSaled({...investment,amount:investment.amount-soldAmount }, moneyValue);
  };

  return (
    <div className='flex flex-col gap-3'>
      <h2 className='font-mono text-xl pt-3'>Sell Options</h2>
      <div  className='bg-slate-700 p-3 rounded-md text-lg flex flex-row justify-center items-center' >
        <div  className='text-lg' >Selling mount in %: </div>
        <input max={100} min={0} type="number" className='bg-slate-700 outline-none p-3 w-16 text-lg' value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
        <div  className='text-lg' >%</div>
      </div>
      <br />
      <button onClick={handleInvest} className='bg-green-700 p-4 rounded-md'>Sell</button>
    </div>
  );
};

export default Resale;
