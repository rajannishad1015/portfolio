'use client';

import { useState, useEffect } from 'react';

const CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>/?~0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface CipherRevealProps {
    text: string;
    className?: string;
    delay?: number;
}

export default function CipherReveal({ text, className = "", delay = 0 }: CipherRevealProps) {
    const [displayText, setDisplayText] = useState('');
    const [isHovered, setIsHovered] = useState(false);

    const scramble = () => {
        let iterations = 0;
        const interval = setInterval(() => {
            setDisplayText(
                text.split("").map((letter, index) => {
                    if (index < iterations) {
                        return text[index];
                    }
                    return CHARS[Math.floor(Math.random() * CHARS.length)];
                }).join("")
            );

            if (iterations >= text.length) {
                clearInterval(interval);
                setDisplayText(text); // Ensure final text is clean
            }
            
            iterations += 1 / 3; // Speed control
        }, 30);
    };

    useEffect(() => {
        // Initial reveal
        const timeout = setTimeout(() => {
            scramble();
        }, delay * 1000);
        return () => clearTimeout(timeout);
    }, [delay]);

    return (
        <span 
            className={`inline-block cursor-default ${className}`}
            onMouseEnter={() => scramble()}
        >
            {displayText}
        </span>
    );
}
