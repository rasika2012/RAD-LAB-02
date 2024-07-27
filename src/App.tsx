
import React, { useState } from 'react';
import InvestmentOptions from './components/InvestmentOption';
import RiskReturnVisualization from './components/RiskReturnVisualization';
import SimulationResult from './components/SimulationResult';
import InvestmentScenario from './components/InvestmentScenario';
import './output.css';
import UserInvestments from './components/UserInvestment';
import { InvestmentOption, InvestmentScenario as Scenario, InvestmentSimulationResult, UserInvestment } from './types/investment';

const App: React.FC = () => {
  const [updatedOptions, setUpdatedOptions] = useState<InvestmentOption[]>([
    { name: 'Land', type: 'land', description: 'Moderate risk and return.', risk: 3, liqudity: 5, currentPrice: 100, history: []  },
    { name: 'Bitcoin', type: 'bitcoin', description: 'High risk, high return.', risk: 10, liqudity: 20, currentPrice: 100, history: []  },
    { name: 'Ethereum', type: 'ethereum', description: 'High risk, high return.', risk: 9, liqudity: 18, currentPrice: 100, history: []  },
    { name: 'Gold', type: 'gold', description: 'Moderate risk and return.', risk: 5, liqudity: 6, currentPrice: 100, history: [] },
    { name: 'Silver', type: 'silver', description: 'Moderate risk and return.', risk: 5, liqudity: 5, currentPrice: 100, history: [] },
  ]);
  const [selectedOption, setSelectedOption] = useState<InvestmentOption | null>(null);
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [result, setResult] = useState<InvestmentSimulationResult | null>(null);
  const [userInvestments, setUserInvestments] = useState<UserInvestment[]>([]);
  const [bankBalance, setBankBalance] = useState<number>(10000);
  const handleOptionSelect = (option: InvestmentOption) => {
    setSelectedOption(option);
    setScenario(null);
    setResult(null);
  };


  const handleInvest = (investment: UserInvestment) => {
    if(investment.amount > bankBalance) {
      return;
    }
    setBankBalance(bankBalance - investment.amount);
    setUserInvestments([...userInvestments, JSON.parse(JSON.stringify(investment))]);
  };

  return (
    <div className='bg-gradient-to-t from-slate-800 to-slate-900 text-slate-50 gap-4 overflow-hidden relative h-screen flex items-center flex-col justify-center'>
      <div className=' py-3 px-2 bg-gradient-to-t from-slate-800 to-green-900  border-solid border-gray-700 border-b-2 sticky  w-full gap-2 flex flex-col'>
        <h1 className='text-white font-sans font-bold text-2xl'>Virtual Money Market</h1>  
        <h2 className='bg-gray-800 border-green-300 border-solid border w-fit px-2 py-1 rounded-md text-gray-100'>Bank: {bankBalance.toFixed(2) + "$"}</h2>
      </div>
      <div className='overflow-auto px-2 flex h-full w-full flex-col'>
      <InvestmentOptions options={updatedOptions} setUpdatedOptions={setUpdatedOptions} onSelect={handleOptionSelect} />
      {selectedOption && <div className='absolute z-20 h-screen top-0 left-0 w-full bg-white opacity-70' onClick={()=>setSelectedOption(null)}/>}
      {selectedOption && (
        <div className='absolute z-50 top-1/3 bg-gray-600 w-3/4 left-12 px-2 py-3 shadow-md rounded-lg'>
          <InvestmentScenario option={selectedOption} onInvest={handleInvest} />
        </div>
      )}
      {result && <SimulationResult result={result} />}
      <UserInvestments investments={userInvestments} depositBanak={(deposit)=> setBankBalance(balence => balence+deposit)} setUserInvestments={setUserInvestments}  options={updatedOptions}/>
      </div>
    </div>
  );
};

export default App;
