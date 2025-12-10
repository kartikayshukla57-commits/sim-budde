import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingBalloons from './FloatingBalloons';

const Step1 = ({ onNext }) => {
    const audioRef = useRef(null);
    const [showCard, setShowCard] = useState(true);
    const [showButton, setShowButton] = useState(false);

    const handleDismiss = () => {
        // Start music
        if (audioRef.current) {
            audioRef.current.volume = 0.5;
            audioRef.current.play().catch(e => console.log('Play failed:', e));
        }

        // Hide card
        setShowCard(false);

        // Show button after 3 seconds
        setTimeout(() => {
            setShowButton(true);
        }, 3000);
    };

    return (
        <div
            className="step-container"
            style={{
                position: 'relative',
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }}
        >
            {/* Background Music */}
            <audio
                ref={audioRef}
                src="/audio/he-hey-hey.mp3"
                loop
                preload="auto"
            />

            <FloatingBalloons />

            {/* Greeting Card Overlay */}
            <AnimatePresence>
                {showCard && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8, y: -50 }}
                        transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            backdropFilter: 'blur(8px)',
                            WebkitBackdropFilter: 'blur(8px)',
                            zIndex: 100
                        }}
                    >
                        <motion.div
                            initial={{ y: 50 }}
                            animate={{ y: 0 }}
                            style={{
                                background: 'linear-gradient(145deg, #fff5f7, #ffe4e9)',
                                borderRadius: '24px',
                                padding: 'clamp(1.5rem, 5vw, 3rem) clamp(1.5rem, 6vw, 4rem)',
                                textAlign: 'center',
                                boxShadow: '0 25px 60px rgba(183, 110, 121, 0.4), 0 0 0 4px rgba(255, 255, 255, 0.8)',
                                border: '3px solid #f8b4c0',
                                maxWidth: '90vw',
                                width: '100%',
                                maxHeight: '85vh',
                                overflowY: 'auto',
                                position: 'relative'
                            }}
                        >
                            {/* Decorative elements */}
                            <div style={{
                                position: 'absolute',
                                top: '-20px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                fontSize: '3rem'
                            }}>
                                🎀
                            </div>

                            {/* Hearts decoration */}
                            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                                💕 ✨ 💕
                            </div>

                            <h1 style={{
                                fontSize: '2.5rem',
                                background: 'linear-gradient(135deg, #B76E79, #E91E63)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                marginBottom: '0.5rem',
                                fontFamily: 'Outfit, sans-serif',
                                fontWeight: 'bold'
                            }}>
                                Happy Birthday
                            </h1>

                            <h2 style={{
                                fontSize: '3.5rem',
                                color: '#B76E79',
                                marginBottom: '1rem',
                                fontFamily: 'Outfit, sans-serif',
                                fontWeight: 'bold',
                                textShadow: '2px 2px 4px rgba(183, 110, 121, 0.2)'
                            }}>
                                Sim! 🎂
                            </h2>

                            <p style={{
                                fontSize: '1.2rem',
                                color: '#888',
                                marginBottom: '2rem',
                                fontStyle: 'italic'
                            }}>
                                Wishing you all the love and happiness! 💝
                            </p>

                            <motion.button
                                whileHover={{ scale: 1.08, boxShadow: '0 8px 25px rgba(183, 110, 121, 0.5)' }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleDismiss}
                                style={{
                                    padding: '1rem 2.5rem',
                                    fontSize: '1.3rem',
                                    fontWeight: 'bold',
                                    background: 'linear-gradient(135deg, #B76E79, #E91E63)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '50px',
                                    cursor: 'pointer',
                                    boxShadow: '0 6px 20px rgba(183, 110, 121, 0.4)',
                                    fontFamily: 'Outfit, sans-serif',
                                    letterSpacing: '1px'
                                }}
                            >
                                Open Card 💌
                            </motion.button>

                            {/* Bottom decorative flowers */}
                            <div style={{
                                position: 'absolute',
                                bottom: '10px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                fontSize: '1.5rem'
                            }}>
                                🌸 🌷 🌸
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content (shows after card is dismissed) */}
            <AnimatePresence>
                {!showCard && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        style={{ zIndex: 10, textAlign: 'center' }}
                    >
                        <h1 style={{
                            fontSize: '5rem',
                            color: 'var(--rose-gold)',
                            marginBottom: '2rem',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                        }}>
                            Happy Birthday Simmaa!
                        </h1>

                        {/* Button appears after 3 seconds */}
                        <AnimatePresence>
                            {showButton && (
                                <motion.button
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1.5, ease: 'easeOut' }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={onNext}
                                    style={{
                                        padding: '1rem 2rem',
                                        fontSize: '1.2rem',
                                        backgroundColor: 'var(--rose-gold)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '50px',
                                        cursor: 'pointer',
                                        boxShadow: '0 4px 15px rgba(183, 110, 121, 0.4)',
                                        letterSpacing: '1px'
                                    }}
                                >
                                    Let's Celebrate 🎉
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Step1;
