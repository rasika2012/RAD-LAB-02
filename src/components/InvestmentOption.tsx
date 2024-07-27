
import React, { useEffect, useState } from 'react';
import { simulatePriceChange } from '../utils/priceSimulation';
import { InvestmentOption } from '../types/investment';

interface Props {
  options: InvestmentOption[];
  onSelect: (option: InvestmentOption) => void;
  setUpdatedOptions: React.Dispatch<React.SetStateAction<InvestmentOption[]>>;
}

const InvestmentOptions: React.FC<Props> = ({ options, onSelect, setUpdatedOptions }) => {
const [minimized, setMinimized] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdatedOptions((prevOptions) =>
        prevOptions.map((option) => ({
          ...option,
          currentPrice: simulatePriceChange(option),
          history: [...option.history, option.currentPrice],
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='w-full'>
      <h2 className='font-mono text-xl'>Market (Live)</h2>
      <div className='w-full flex gap-1 flex-col'>
        {(minimized? options.slice(0,3): options).map((option) => (
          <div className='bg-gradient-to-tr via-slate-700 from-slate-900 to-slate-800 flex border-solid border text-white rounded-md border-green-800 p-1 flex-row justify-between gap-1' key={option.type} onClick={() => onSelect(option)}>
            <div className='w-1/3 text-lg'>{option.name}</div>
            <div className='flex flex-col w-1/3'>
              <div className='text-sm text-green-300'>Risk Factor</div> 
              <div className='text-lg'>{option.risk}</div>
            </div> 
            <div className='flex flex-col w-1/3'>
              <div className='text-sm  text-green-300'>Price</div> 
              <div  className='text-lg'>{option.currentPrice.toFixed(2)}</div>
            </div> 
          </div>
        ))}
        <div className='text-blue-600' onClick={()=>setMinimized(!minimized)}>{minimized? "show more.." : "show less.."}</div>
      </div>
    </div>
  );
};

export default InvestmentOptions;
