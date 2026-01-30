import React from 'react';
import { Card } from './Card';
import { StylePromptModal } from './StylePromptModal';

export const IntroPage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <Card title="Learner Activity Instructions">
        <div className="space-y-6 text-textDark leading-relaxed">
          {/* Resources Section */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
            <h3 className="text-xl font-bold text-primary mb-4 text-center">Resources Needed for This Activity</h3>
            <div className="flex flex-col sm:flex-row justify-center gap-8 items-center">
              <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-lg shadow-sm border border-gray-100">
                <img 
                  src="https://res.cloudinary.com/dlshlye2v/image/upload/v1769791938/SIDER_LOGO_vavsc6.png" 
                  alt="Sider Logo" 
                  className="w-8 h-8 object-contain" 
                />
                <span className="font-bold text-lg text-primary">Sider</span>
              </div>
              
              <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-lg shadow-sm border border-gray-100">
                <img 
                  src="https://res.cloudinary.com/dlshlye2v/image/upload/v1769792206/Notebook_LM_logo_xsaihd.png" 
                  alt="NotebookLM Logo" 
                  className="w-8 h-8 object-contain" 
                />
                <span className="font-bold text-lg text-primary">NotebookLM</span>
              </div>

              <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-lg shadow-sm border border-gray-100">
                <img 
                  src="https://res.cloudinary.com/dlshlye2v/image/upload/v1769796954/Padlet_Logo_o4n9m5.png" 
                  alt="Padlet Logo" 
                  className="w-8 h-8 object-contain" 
                />
                <span className="font-bold text-lg text-primary">Padlet</span>
              </div>
            </div>
          </div>

          <p className="text-lg">
            The purpose of this case study is to demonstrate your competency in carrying out a nutrition consultation, 
            analysing a client's dietary habits, and providing recommendations aligned with evidence-based healthy eating practices. 
            You are required to carry out a nutrition consultation using the prewritten case study as your client.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r shadow-sm">
            <p className="text-blue-800 font-medium">
              To complete the questions, you need to click the "Consultation Questions" button at the bottom of each case study to input the correct data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-bgLight p-6 rounded-lg border-l-4 border-accent shadow-sm">
              <h3 className="text-xl font-bold text-primary mb-2">Section 1</h3>
              <p className="text-gray-700">Complete your name and email address.</p>
            </div>

            <div className="bg-bgLight p-6 rounded-lg border-l-4 border-accent shadow-sm">
              <h3 className="text-xl font-bold text-primary mb-2">Section 2</h3>
              <p className="text-gray-700">Answer the nutrition consultation questions.</p>
            </div>

            <div className="bg-bgLight p-6 rounded-lg border-l-4 border-accent shadow-sm">
              <h3 className="text-xl font-bold text-primary mb-2">Section 3</h3>
              <p className="text-gray-700">Calculate your client’s current energy needs.</p>
            </div>

            <div className="bg-bgLight p-6 rounded-lg border-l-4 border-accent shadow-sm">
              <h3 className="text-xl font-bold text-primary mb-2">Section 4</h3>
              <p className="text-gray-700 mb-2">Create a summary report that you could send to the client.</p>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Copy the prompt located at the bottom of each case study.</li>
                <li>Copy this prompt into the 'text box'.</li>
                <li>Add the relevant information as instructed.</li>
                <li>Press submit.</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-primary to-secondary text-white rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4 text-center">Final Step - Create an Infographic Report</h3>
            <ul className="list-disc pl-6 space-y-2 text-lg">
              <li>Copy the text generated from Step 4.</li>
              <li>Paste text into the "Source" panel as a new source in Notebook LM.</li>
              <li>Click the edit icon on the infographic option in the studio panel.</li>
              <li>Click "detailed" and input your prompt description of how you want your infographic to look.</li>
              <li>Download your infographic and upload it to your personal padlet or the main student padlet for others to view.</li>
            </ul>
            <div className="flex justify-center mt-6">
              <StylePromptModal />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};