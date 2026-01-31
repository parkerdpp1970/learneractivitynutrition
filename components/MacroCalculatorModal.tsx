import React, { useState, useEffect } from 'react';

export const MacroCalculatorModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const [tdee, setTdee] = useState<string>('2000');
  const [carbsPct, setCarbsPct] = useState<string>('50');
  const [proteinPct, setProteinPct] = useState<string>('20');
  const [fatPct, setFatPct] = useState<string>('30');

  const [results, setResults] = useState<{
    carbs: { kcal: number; grams: number };
    protein: { kcal: number; grams: number };
    fat: { kcal: number; grams: number };
  } | null>(null);

  const totalPct = (parseFloat(carbsPct) || 0) + (parseFloat(proteinPct) || 0) + (parseFloat(fatPct) || 0);
  const isValidTotal = totalPct === 100;

  useEffect(() => {
    calculateMacros();
  }, [tdee, carbsPct, proteinPct, fatPct]);

  const calculateMacros = () => {
    const calories = parseFloat(tdee);
    const cPct = parseFloat(carbsPct);
    const pPct = parseFloat(proteinPct);
    const fPct = parseFloat(fatPct);

    if (isNaN(calories) || isNaN(cPct) || isNaN(pPct) || isNaN(fPct)) {
      setResults(null);
      return;
    }

    // 1g Carbs = 4 kcal
    // 1g Protein = 4 kcal
    // 1g Fat = 9 kcal

    const cKcal = calories * (cPct / 100);
    const pKcal = calories * (pPct / 100);
    const fKcal = calories * (fPct / 100);

    setResults({
      carbs: { kcal: Math.round(cKcal), grams: Math.round(cKcal / 4) },
      protein: { kcal: Math.round(pKcal), grams: Math.round(pKcal / 4) },
      fat: { kcal: Math.round(fKcal), grams: Math.round(fKcal / 9) },
    });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex-1 bg-[#2c3e50] text-white py-8 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center gap-3 group border border-[#34495e]"
      >
        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
        </div>
        <div className="text-center">
          <span className="block text-lg font-bold mb-1">Calculate Macro Balance</span>
          <span className="block text-xs text-gray-400 font-medium">Determine CHO, Protein & Fat splits</span>
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full relative flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white rounded-t-lg">
              <h3 className="text-xl font-bold text-primary">Macronutrient Balance Calculator</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Target Daily Calories (TDEE)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={tdee}
                    onChange={(e) => setTdee(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-accent focus:border-accent text-lg font-bold text-primary"
                    placeholder="2000"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">kcal</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-2">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Carbs %</label>
                  <input 
                    type="number" 
                    value={carbsPct}
                    onChange={(e) => setCarbsPct(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-center"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Protein %</label>
                  <input 
                    type="number" 
                    value={proteinPct}
                    onChange={(e) => setProteinPct(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:border-green-500 focus:ring-1 focus:ring-green-500 text-center"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Fat %</label>
                  <input 
                    type="number" 
                    value={fatPct}
                    onChange={(e) => setFatPct(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600 text-center"
                  />
                </div>
              </div>

              <div className={`text-right text-sm mb-6 ${isValidTotal ? 'text-green-600 font-medium' : 'text-red-500 font-bold'}`}>
                Total: {totalPct}% {isValidTotal ? '✓' : ''}
              </div>

              {results && (
                <div className="overflow-hidden bg-gray-50 rounded-lg border border-gray-200">
                  <table className="min-w-full">
                    <thead className="bg-gray-100 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-bold text-primary">Macronutrient</th>
                        <th className="px-4 py-3 text-center text-sm font-bold text-primary">%</th>
                        <th className="px-4 py-3 text-right text-sm font-bold text-primary">Calories</th>
                        <th className="px-4 py-3 text-right text-sm font-bold text-primary">Grams</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 text-blue-700 font-medium">Carbohydrate (4kcal/g)</td>
                        <td className="px-4 py-3 text-center text-gray-600">{carbsPct}%</td>
                        <td className="px-4 py-3 text-right text-gray-600">{results.carbs.kcal}</td>
                        <td className="px-4 py-3 text-right font-bold text-primary">{results.carbs.grams}g</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-green-700 font-medium">Protein (4kcal/g)</td>
                        <td className="px-4 py-3 text-center text-gray-600">{proteinPct}%</td>
                        <td className="px-4 py-3 text-right text-gray-600">{results.protein.kcal}</td>
                        <td className="px-4 py-3 text-right font-bold text-primary">{results.protein.grams}g</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-amber-800 font-medium">Fat (9kcal/g)</td>
                        <td className="px-4 py-3 text-center text-gray-600">{fatPct}%</td>
                        <td className="px-4 py-3 text-right text-gray-600">{results.fat.kcal}</td>
                        <td className="px-4 py-3 text-right font-bold text-primary">{results.fat.grams}g</td>
                      </tr>
                      <tr className="bg-gray-100">
                        <td className="px-4 py-3 font-bold text-primary">TOTAL</td>
                        <td className="px-4 py-3 text-center font-bold text-primary">100%</td>
                        <td className="px-4 py-3 text-right font-bold text-primary">{tdee}</td>
                        <td className="px-4 py-3 text-right font-bold text-primary">-</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};