import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Balloon = ({ color, x, delay, duration }) => {
    return (
        <motion.div
            initial={{ y: -200, x: `${x}vw` }}
            animate={{ y: '110vh' }}
            transition={{
                duration: duration,
                delay: delay,
                ease: 'linear',
                repeat: Infinity,
            }}
            style={{
                position: 'absolute',
                width: '90px',
                height: '110px',
                backgroundColor: color,
                borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
                boxShadow: `
                    inset -15px -15px 30px rgba(0,0,0,0.15),
                    inset 20px 20px 30px rgba(255,255,255,0.25)
                `,
                zIndex: 0,
            }}
        >
            {/* Balloon Shine/Highlight */}
            <div
                style={{
                    position: 'absolute',
                    top: '15%',
                    left: '20%',
                    width: '25px',
                    height: '35px',
                    backgroundColor: 'rgba(255,255,255,0.4)',
                    borderRadius: '50%',
                    transform: 'rotate(-30deg)',
                    filter: 'blur(3px)',
                }}
            />
            {/* Balloon Knot/Tie */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '-8px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '0',
                    height: '0',
                    borderLeft: '8px solid transparent',
                    borderRight: '8px solid transparent',
                    borderTop: `12px solid ${color}`,
                    filter: 'brightness(0.85)',
                }}
            />
            {/* Balloon String */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '-55px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '2px',
                    height: '50px',
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.15))',
                    borderRadius: '1px',
                }}
            />
        </motion.div>
    );
};

const FloatingBalloons = () => {
    const [balloons, setBalloons] = useState([]);

    useEffect(() => {
        const colors = ['#B76E79', '#E0BFB8', '#9E5B65', '#D4A5A5', '#F2D7D5'];
        const newBalloons = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            color: colors[Math.floor(Math.random() * colors.length)],
            x: Math.random() * 100, // 0 to 100vw
            delay: Math.random() * 5,
            duration: Math.random() * 5 + 5, // 5 to 10 seconds
        }));
        setBalloons(newBalloons);
    }, []);

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                overflow: 'hidden',
                zIndex: 0,
            }}
        >
            {balloons.map((b) => (
                <Balloon
                    key={b.id}
                    color={b.color}
                    x={b.x}
                    delay={b.delay}
                    duration={b.duration}
                />
            ))}
        </div>
    );
};

export default FloatingBalloons;
