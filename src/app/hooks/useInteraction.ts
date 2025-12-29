'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

type ScrollVelocity = 'LOW' | 'HIGH';

interface InteractionState {
    scrollVelocity: ScrollVelocity;
    idle: boolean;
}

const IDLE_TIMEOUT_MS = 1500;
const VELOCITY_THRESHOLD = 50; // pixels per 100ms
const VELOCITY_SAMPLE_INTERVAL = 100; // ms

export function useInteraction(): InteractionState {
    const [scrollVelocity, setScrollVelocity] = useState<ScrollVelocity>('LOW');
    const [idle, setIdle] = useState(true);

    const lastScrollY = useRef(0);
    const lastScrollTime = useRef(Date.now());
    const idleTimer = useRef<NodeJS.Timeout | null>(null);

    const resetIdleTimer = useCallback(() => {
        setIdle(false);

        if (idleTimer.current) {
            clearTimeout(idleTimer.current);
        }

        idleTimer.current = setTimeout(() => {
            setIdle(true);
        }, IDLE_TIMEOUT_MS);
    }, []);

    useEffect(() => {
        // Calculate scroll velocity
        const handleScroll = () => {
            const now = Date.now();
            const currentScrollY = window.scrollY;
            const timeDelta = now - lastScrollTime.current;

            if (timeDelta >= VELOCITY_SAMPLE_INTERVAL) {
                const distance = Math.abs(currentScrollY - lastScrollY.current);
                const velocity = (distance / timeDelta) * 100; // normalize to per 100ms

                setScrollVelocity(velocity > VELOCITY_THRESHOLD ? 'HIGH' : 'LOW');

                lastScrollY.current = currentScrollY;
                lastScrollTime.current = now;
            }

            resetIdleTimer();
        };

        // Track other interactions for idle detection
        const handleInteraction = () => {
            resetIdleTimer();
        };

        // Initialize
        lastScrollY.current = window.scrollY;
        lastScrollTime.current = Date.now();

        // Add event listeners
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('mousemove', handleInteraction, { passive: true });
        window.addEventListener('keydown', handleInteraction, { passive: true });
        window.addEventListener('touchstart', handleInteraction, { passive: true });
        window.addEventListener('click', handleInteraction, { passive: true });

        // Start idle timer
        resetIdleTimer();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
            window.removeEventListener('click', handleInteraction);

            if (idleTimer.current) {
                clearTimeout(idleTimer.current);
            }
        };
    }, [resetIdleTimer]);

    return { scrollVelocity, idle };
}
