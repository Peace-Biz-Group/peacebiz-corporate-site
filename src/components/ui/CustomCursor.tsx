import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue } from 'motion/react';

export const CustomCursor = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovering, setIsHovering] = useState(false);
    const [isCursorReady, setIsCursorReady] = useState(false);
    const hoverStateRef = useRef(false);

    useEffect(() => {
        const canUseCustomCursor = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 768px)').matches;
        if (!canUseCustomCursor) {
            return;
        }

        const updateMousePosition = (e: MouseEvent) => {
            if (!isCursorReady) {
                setIsCursorReady(true);
            }
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const nextIsHovering = !!(
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a') ||
                target.classList.contains('cursor-pointer')
            );

            if (hoverStateRef.current !== nextIsHovering) {
                hoverStateRef.current = nextIsHovering;
                setIsHovering(nextIsHovering);
            }
        };

        window.addEventListener('mousemove', updateMousePosition, { passive: true });
        window.addEventListener('mouseover', handleMouseOver, { passive: true });

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [isCursorReady, mouseX, mouseY]);

    if (!isCursorReady) {
        return null;
    }

    return (
        <motion.div
            className="fixed top-0 left-0 w-4 h-4 bg-brand-blue/80 rounded-full pointer-events-none z-[10000] hidden md:block shadow-[0_0_8px_rgba(0,107,182,0.5)]"
            style={{
                x: mouseX,
                y: mouseY,
                translateX: '-50%',
                translateY: '-50%',
            }}
            animate={{
                scale: isHovering ? 2.5 : 1,
            }}
            transition={{
                scale: {
                    type: "spring",
                    stiffness: 150,
                    damping: 15,
                    mass: 0.1
                }
            }}
        />
    );
};
