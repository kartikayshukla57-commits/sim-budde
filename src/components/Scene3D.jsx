import React, { Suspense, useState, useRef, useCallback, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky, Stars, Environment } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import PicnicScene from './PicnicScene';

const Scene3D = () => {
    const [isBlowing, setIsBlowing] = useState(false);
    const [candleOut, setCandleOut] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [blowProgress, setBlowProgress] = useState(0);
    const blowStartTime = useRef(null);
    const blowInterval = useRef(null);
    const REQUIRED_BLOW_TIME = 2.3; // seconds

    const startBlowing = useCallback(() => {
        if (candleOut) return; // Already blown out

        setIsBlowing(true);
        setShowMessage(false);
        blowStartTime.current = Date.now();

        // Update progress every 50ms
        blowInterval.current = setInterval(() => {
            const elapsed = (Date.now() - blowStartTime.current) / 1000;
            const progress = Math.min(elapsed / REQUIRED_BLOW_TIME, 1);
            setBlowProgress(progress);

            if (elapsed >= REQUIRED_BLOW_TIME) {
                // Success! Blow out candle
                clearInterval(blowInterval.current);
                setIsBlowing(false);
                setCandleOut(true);
                setBlowProgress(0);
            }
        }, 50);
    }, [candleOut]);

    const stopBlowing = useCallback(() => {
        if (!isBlowing || candleOut) return;

        clearInterval(blowInterval.current);
        setIsBlowing(false);
        setBlowProgress(0);

        // Show "Blow harder" message if not successful
        const elapsed = (Date.now() - blowStartTime.current) / 1000;
        if (elapsed < REQUIRED_BLOW_TIME) {
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 1000); ``
        }
    }, [isBlowing, candleOut]);

    // Audio ref for background music
    const audioRef = useRef(null);

    // Play background music and cleanup on unmount
    useEffect(() => {
        // Play hapy-cats audio in loop
        audioRef.current = new Audio('/audio/hapy-cats.mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = 0.4;
        audioRef.current.play().catch(e => console.log('Audio autoplay blocked:', e));

        return () => {
            if (blowInterval.current) clearInterval(blowInterval.current);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            <Canvas shadows camera={{ position: [0, 1, 3.5], fov: 50 }}>
                {/* Lights */}
                <ambientLight intensity={0.5} />
                <directionalLight
                    position={[5, 10, 5]}
                    intensity={1}
                    castShadow
                    shadow-mapSize={1024}
                />

                {/* Environment */}
                <Sky sunPosition={[100, 20, 100]} turbidity={0.5} rayleigh={0.5} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <Environment preset="park" />

                {/* Content */}
                <Suspense fallback={null}>
                    <PicnicScene isBlowing={isBlowing} candleOut={candleOut} />
                </Suspense>

                {/* Controls */}
                <OrbitControls
                    enablePan={false}
                    maxPolarAngle={Math.PI / 2.2}
                    minPolarAngle={Math.PI / 6}
                    minDistance={isBlowing ? 2 : 5}
                    maxDistance={isBlowing ? 4 : 15}
                    target={isBlowing ? [0, 0.8, 0] : [0, 0, 0]}
                />
            </Canvas>

            {/* Motion Blur / Focus Effect when blowing */}
            <AnimatePresence>
                {isBlowing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            pointerEvents: 'none',
                            background: `radial-gradient(circle at 50% 45%, transparent 15%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.4) 100%)`,
                            boxShadow: 'inset 0 0 150px 50px rgba(0,0,0,0.3)',
                            zIndex: 5,
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Blow Button */}
            {!candleOut && (
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    onMouseDown={startBlowing}
                    onMouseUp={stopBlowing}
                    onMouseLeave={stopBlowing}
                    onTouchStart={startBlowing}
                    onTouchEnd={stopBlowing}
                    style={{
                        position: 'absolute',
                        bottom: '15%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        padding: '1.2rem 3rem',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        background: 'linear-gradient(135deg, #B76E79, #E0BFB8)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50px',
                        cursor: 'pointer',
                        boxShadow: '0 8px 25px rgba(183, 110, 121, 0.4)',
                        fontFamily: 'Outfit, sans-serif',
                        letterSpacing: '2px',
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        zIndex: 10,
                    }}
                >
                    {isBlowing ? '💨 Blowing...' : '🌬️ Hold to Blow'}
                </motion.button>
            )}

            {/* Success Card - shows after blowing out candles */}
            <AnimatePresence>
                {candleOut && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.5, type: 'spring', bounce: 0.4 }}
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
                            {/* Decorative ribbon */}
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
                                🎉 ✨ 🎉
                            </div>

                            <h1 style={{
                                fontSize: '2.5rem',
                                background: 'linear-gradient(135deg, #B76E79, #E91E63)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                marginBottom: '1rem',
                                fontFamily: 'Outfit, sans-serif',
                                fontWeight: 'bold'
                            }}>
                                Happy Birthday Sim-Simm! 🎂
                            </h1>

                            <p style={{
                                fontSize: '1.1rem',
                                color: '#666',
                                marginBottom: '2rem',
                                lineHeight: '1.8',
                                maxWidth: '500px',
                                margin: '0 auto 2rem auto',
                                fontFamily: 'Outfit, sans-serif'
                            }}>
                                Happhy budde simm!!! Enjoy your day birdie have funnn! 🎈✨<br />
                                And keep being the absolute vibe that you are. 💅🔥<br />
                                Eat kekh 🍰 and dont drink matcha (without me) 🍵<br />
                                (kekh vi aaake kila dena) 🏃‍♀️🥄😋
                            </p>

                            <motion.button
                                whileHover={{ scale: 1.08, boxShadow: '0 8px 25px rgba(183, 110, 121, 0.5)' }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => window.location.reload()}
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
                                Celebrate Again! 🎊
                            </motion.button>

                            {/* Bottom decorative */}
                            <div style={{
                                marginTop: '1.5rem',
                                fontSize: '1.5rem'
                            }}>
                                💝 Wth Love, KK 💝
                            </div>

                            {/* Left Decoration - Subject 5 */}
                            <motion.img
                                src="/photos/Subject 5.png"
                                initial={{ opacity: 0, x: -20, rotate: -10, rotateX: 0 }}
                                animate={{ opacity: 1, x: 0, rotate: 0, rotateX: 360 }}
                                transition={{
                                    opacity: { delay: 0.8, duration: 0.5 },
                                    x: { delay: 0.8, duration: 0.5 },
                                    rotate: { delay: 0.8, duration: 0.5 },
                                    rotateX: { duration: 8, repeat: Infinity, ease: "linear" }
                                }}
                                style={{
                                    position: 'absolute',
                                    bottom: '20px',
                                    left: '20px',
                                    width: '120px',
                                    height: 'auto',
                                    pointerEvents: 'none'
                                }}
                            />

                            {/* Right Decoration - Subject 6 */}
                            <motion.img
                                src="/photos/Subject 6.png"
                                initial={{ opacity: 0, x: 20, rotate: 10, rotateY: 0 }}
                                animate={{ opacity: 1, x: 0, rotate: 0, rotateY: 360 }}
                                transition={{
                                    opacity: { delay: 0.8, duration: 0.5 },
                                    x: { delay: 0.8, duration: 0.5 },
                                    rotate: { delay: 0.8, duration: 0.5 },
                                    rotateY: { duration: 8, repeat: Infinity, ease: "linear" }
                                }}
                                style={{
                                    position: 'absolute',
                                    bottom: '20px',
                                    right: '20px',
                                    width: '120px',
                                    height: 'auto',
                                    pointerEvents: 'none'
                                }}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Blow Harder Message */}
            <AnimatePresence>
                {showMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        style={{
                            position: 'absolute',
                            bottom: '28%',
                            width: '100%',
                            textAlign: 'center',
                            zIndex: 10,
                        }}
                    >
                        <span style={{
                            fontSize: '1.8rem',
                            color: '#FF5722',
                            fontWeight: 'bold',
                            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                            fontFamily: 'Outfit, sans-serif',
                            background: 'rgba(255,255,255,0.9)',
                            padding: '0.5rem 1.5rem',
                            borderRadius: '30px',
                        }}>
                            Blow harder! 😤
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Scene3D;
