import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Step1 from './components/Step1';
import Step2 from './components/Step2';

function App() {
  const [step, setStep] = useState(1);

  return (
    <div className="app-container" style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.8 }}
            style={{ width: '100%', height: '100%', position: 'absolute' }}
          >
            <Step1 onNext={() => setStep(2)} />
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ width: '100%', height: '100%', position: 'absolute' }}
          >
            <Step2 />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
