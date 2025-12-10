import React from 'react';
import { motion } from 'framer-motion';

const PhotoFrame = ({ delay, rotate }) => {
    return (
        <motion.div
            initial={{ scale: 0, opacity: 0, rotate: 0 }}
            animate={{ scale: 1, opacity: 1, rotate: rotate }}
            transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
                delay: delay
            }}
            style={{
                width: '120px',
                height: '150px',
                backgroundColor: '#FFF',
                border: '8px solid var(--rose-gold)',
                boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                margin: '10px'
            }}
        >
            <div style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#F9F9F9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--rose-gold-light)',
                fontSize: '0.8rem',
                textAlign: 'center',
                padding: '5px'
            }}>
                <span>Photo Placeholder</span>
            </div>
        </motion.div>
    );
};

export default PhotoFrame;
