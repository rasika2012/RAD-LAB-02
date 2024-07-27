// src/components/UserInvestments.tsx

import React, { useState } from 'react';
import { InvestmentOption, UserInvestment } from '../types/investment';
import Resale from './Resale';

interface Props {
  investments: UserInvestment[];
  options: InvestmentOption[] | null;
  setUserInvestments: (investments: UserInvestment[]) => void;
  depositBanak: (deposit:number) => void;
}

const UserInvestments: React.FC<Props> = ({ investments, options,setUserInvestments, depositBanak }) => {
  const [minimized, setMinimized] = useState<boolean>(false);
  const [selectedInvestment, setSelectedInvestment] = React.useState<UserInvestment | null>(null);
  const handleSale = (investment: UserInvestment, deposit:number) => {
    const filteredInvestments = investments.filter((inv) => inv.investedAt !== investment.investedAt);
    setUserInvestments([...filteredInvestments, investment]);
    depositBanak(deposit);
  }
  const currentPrice = (investment: UserInvestment) => options?.find(op=> op.name === investment.option.name)?.currentPrice??0;
  return (
    <div>
      <h2 className='font-mono text-xl pt-3'>User Options</h2>
      <div className='flex gap-2 flex-col'>
        {(minimized? investments.slice(0,3): investments).filter(i=>i.amount).map((investment, index) => (
          
           <div className={`bg-gradient-to-tr ${ currentPrice(investment) > investment.option.currentPrice ?'via-slate-800 from-green-900 to-green-800' : 'via-red-700 animate-pulse from-green-900 to-green-800' } flex border-solid border transition-all text-white rounded-md border-green-800 p-1 flex-row justify-between gap-1`}  key={investment.investedAt}  onClick={()=>setSelectedInvestment(investment)}>
            <div className='w-1/3 text-lg'>{investment.option.name}</div>
            <div className='flex flex-col w-1/4'>
              <div className='text-sm text-green-300'>Buying</div> 
              <div className='text-lg'>{investment.option.currentPrice.toFixed(2)}$</div>
            </div> 
            <div className='flex flex-col w-1/4'>
              <div className='text-sm  text-green-300'>Current</div> 
              <div  className='text-lg'>{currentPrice(investment)?.toFixed(2)}$</div>
            </div> 
            <div className='flex flex-col w-1/4'>
              <div className='text-sm  text-green-300'>Amount</div> 
              <div  className='text-lg'>{investment.amount?.toFixed(2)}</div>
            </div> 
          </div>
  
        ))}
      </div>
      <div className='text-blue-600' onClick={()=>setMinimized(!minimized)}>{minimized? "show more.." : "show less.."}</div>
      {selectedInvestment && <div className='absolute h-screen z-20 top-0 w-full animate-[wiggle_1s_ease-in-out_infinite]" left-0 bg-white opacity-70' onClick={()=>setSelectedInvestment(null)}/>}
      {selectedInvestment && ( 
        <div className='absolute z-50 top-1/3 bg-slate-600 w-3/4 left-12 px-3 py-2 shadow-md rounded-lg'>
          <div>
            <Resale investment={selectedInvestment} options={options} reSaled={handleSale}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInvestments;
