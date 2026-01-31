import React, { useState } from 'react';

export const EnergyNeedsModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // State for inputs
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [weight, setWeight] = useState<string>('80'); // kg default from screenshot
  const [height, setHeight] = useState<string>('170'); // cm default from screenshot
  const [age, setAge] = useState<string>('35'); // years default from screenshot
  const [activityLevel, setActivityLevel] = useState<number>(1.2);

  // State for results
  const [bmr, setBmr] = useState<number | null>(null);
  const [tdee, setTdee] = useState<number | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);

    if (isNaN(w) || isNaN(h) || isNaN(a)) return;

    // Mifflin-St Jeor Equation
    // Men: (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5
    // Women: (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161
    let calculatedBmr = (10 * w) + (6.25 * h) - (5 * a);
    
    if (gender === 'male') {
      calculatedBmr += 5;
    } else {
      calculatedBmr -= 161;
    }

    const calculatedTdee = calculatedBmr * activityLevel;

    setBmr(Math.round(calculatedBmr));
    setTdee(Math.round(calculatedTdee));
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex-1 bg-[#2c3e50] text-white py-8 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center gap-3 group border border-[#34495e]"
      >
        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div className="text-center">
          <span className="block text-lg font-bold mb-1">Calculate Energy Needs</span>
          <span className="block text-xs text-gray-400 font-medium">Mifflin-St Jeor & Activity Multiplier</span>
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full relative flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white rounded-t-lg">
              <h3 className="text-xl font-bold text-primary">Energy Needs Calculator</h3>
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
              <form onSubmit={calculate} className="space-y-5">
                
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Gender</label>
                    <select 
                      value={gender}
                      onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                      className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-accent focus:border-accent bg-white"
                    >
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Age (years)</label>
                    <input 
                      type="number" 
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-accent focus:border-accent"
                      placeholder="e.g. 35"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Weight (kg)</label>
                    <input 
                      type="number" 
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-accent focus:border-accent"
                      placeholder="e.g. 80"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Height (cm)</label>
                    <input 
                      type="number" 
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-accent focus:border-accent"
                      placeholder="e.g. 170"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Activity Level</label>
                  <select 
                    value={activityLevel}
                    onChange={(e) => setActivityLevel(parseFloat(e.target.value))}
                    className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-accent focus:border-accent bg-white"
                  >
                    <option value={1.2}>Sedentary (little or no exercise)</option>
                    <option value={1.375}>Lightly active (1-3 days/week)</option>
                    <option value={1.55}>Moderately active (3-5 days/week)</option>
                    <option value={1.725}>Very active (6-7 days/week)</option>
                    <option value={1.9}>Extra active (physical job & training)</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-3 bg-[#27ae60] text-white rounded-md hover:bg-green-600 font-bold text-lg shadow-sm mt-4"
                >
                  Calculate
                </button>
              </form>

              {bmr !== null && tdee !== null && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">BMR</div>
                      <div className="text-xl font-bold text-primary">{bmr} <span className="text-sm font-normal text-gray-600">kcal</span></div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                      <div className="text-xs text-blue-600 uppercase tracking-wide font-semibold mb-1">TDEE</div>
                      <div className="text-xl font-bold text-blue-700">{tdee} <span className="text-sm font-normal text-blue-600">kcal</span></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};