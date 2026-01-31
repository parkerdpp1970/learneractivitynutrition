import React, { useState } from 'react';

export const VideoPlayerModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-primary hover:bg-secondary text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-300 flex items-center justify-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Watch Video Guide
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full relative flex flex-col">
            <div className="p-4 flex justify-between items-center border-b border-gray-200">
              <h3 className="text-xl font-bold text-primary">Video Guide</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="relative pt-[56.25%] bg-black rounded-b-xl overflow-hidden">
               <iframe 
                src="https://player.vimeo.com/video/1160422006" 
                frameBorder="0" 
                allow="autoplay; fullscreen; picture-in-picture" 
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
                title="Case Study Video"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};