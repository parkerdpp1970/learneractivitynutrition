import React, { useState } from 'react';
import { ProfileHeader } from './components/ProfileHeader';
import { Card } from './components/Card';
import { InfoGrid } from './components/InfoGrid';
import { FoodDiary } from './components/FoodDiary';
import { NutritionPromptModal } from './components/NutritionPromptModal';
import { IntroPage } from './components/IntroPage';
import { EnergyNeedsModal } from './components/EnergyNeedsModal';
import { MacroCalculatorModal } from './components/MacroCalculatorModal';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { CASE_STUDIES } from './constants';

const App: React.FC = () => {
  const [activeStudyId, setActiveStudyId] = useState<string>('intro');

  const activeStudy = CASE_STUDIES.find(study => study.id === activeStudyId);

  return (
    <div className="max-w-[1200px] mx-auto p-5 pb-[50px]">
      <header className="bg-gradient-to-br from-primary to-secondary text-white py-8 px-4 text-center mb-8 rounded-xl shadow-lg">
        <h1 className="text-4xl md:text-5xl font-normal mb-6">Nutrition Case Studies</h1>
        
        <div className="flex justify-center gap-4 flex-wrap">
          {/* Instructions / Home Button */}
          <button
              onClick={() => setActiveStudyId('intro')}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 border-2 ${
                activeStudyId === 'intro'
                  ? 'bg-accent border-accent text-white shadow-lg scale-105' 
                  : 'bg-transparent border-white text-white hover:bg-white/10'
              }`}
            >
              Instructions
            </button>

          {/* Case Study Buttons */}
          {CASE_STUDIES.map((study) => (
            <button
              key={study.id}
              onClick={() => setActiveStudyId(study.id)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 border-2 ${
                activeStudyId === study.id 
                  ? 'bg-accent border-accent text-white shadow-lg scale-105' 
                  : 'bg-transparent border-white text-white hover:bg-white/10'
              }`}
            >
              {study.name}
            </button>
          ))}
        </div>
      </header>

      {activeStudyId === 'intro' ? (
        <IntroPage />
      ) : (
        activeStudy && (
          <div key={activeStudy.id} className="animate-fade-in">
            <ProfileHeader 
              name={activeStudy.name}
              imageUrl={activeStudy.imageUrl}
              details={activeStudy.profileDetails}
            />

            <Card title="Background">
              <div className="space-y-4 text-textDark leading-relaxed">
                {activeStudy.background.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </Card>

            <Card title="Dietary Habits & Lifestyle">
              <div className="space-y-6">
                <div>
                  <h3 className="text-secondary text-xl font-medium mt-6 mb-3">Current Eating Patterns:</h3>
                  <ul className="list-disc list-outside ml-5 space-y-2 text-textDark">
                    {activeStudy.lifestyle.eatingPatterns.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-secondary text-xl font-medium mt-6 mb-3">Lifestyle Factors:</h3>
                  <ul className="list-disc list-outside ml-5 space-y-2 text-textDark">
                    {activeStudy.lifestyle.lifestyleFactors.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-secondary text-xl font-medium mt-6 mb-3">Challenges:</h3>
                  <ul className="list-disc list-outside ml-5 space-y-2 text-textDark">
                    {activeStudy.lifestyle.challenges.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>

            <Card title="Health & Wellness">
              <InfoGrid items={activeStudy.healthStats.stats} className="grid-cols-2 lg:grid-cols-5" />
              
              <div className="bg-[#fff3cd] p-4 border-l-4 border-amber-400 rounded-md mt-6 text-textDark">
                <strong className="text-primary">Main Goal:</strong> {activeStudy.healthStats.mainGoal}
              </div>
            </Card>

            {/* Calculators Section */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 px-2">
              <EnergyNeedsModal />
              <MacroCalculatorModal />
            </div>

            <FoodDiary data={activeStudy.foodDiary} />
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-8 mb-12 flex-wrap">
              <NutritionPromptModal />
              
              <VideoPlayerModal />

              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSdtUkJGo3QOE2UdYUd1XSd22Dy6mSkcPvyjJMGo93soozwWNg/viewform?usp=dialog"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                Answer Consultation Questions
              </a>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default App;