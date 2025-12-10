import React from 'react';
import { motion } from 'framer-motion';

const Cake = () => {
    return (
        <div className="cake-container" style={{ position: 'relative', width: '200px', height: '200px' }}>
            {/* Plate */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '220px',
                    height: '20px',
                    backgroundColor: '#FFF',
                    borderRadius: '50%',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                }}
            />

            {/* Base Layer */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '180px',
                    height: '60px',
                    backgroundColor: '#B76E79',
                    borderRadius: '10px',
                    zIndex: 2,
                }}
            />

            {/* Top Layer */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '70px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '140px',
                    height: '50px',
                    backgroundColor: '#E0BFB8',
                    borderRadius: '10px',
                    zIndex: 3,
                }}
            />

            {/* Frosting Details */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '65px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '185px',
                    height: '10px',
                    backgroundColor: '#FFF',
                    borderRadius: '5px',
                    zIndex: 4,
                }}
            />

            {/* Candle */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '120px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '10px',
                    height: '30px',
                    backgroundColor: '#FEF9E7',
                    zIndex: 1,
                }}
            />
            {/* Flame */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
                style={{
                    position: 'absolute',
                    bottom: '150px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '10px',
                    height: '15px',
                    backgroundColor: '#FF9F43',
                    borderRadius: '50% 50% 20% 20%',
                    zIndex: 2,
                    boxShadow: '0 0 10px #FF9F43',
                }}
            />
        </div>
    );
};

export default Cake;
