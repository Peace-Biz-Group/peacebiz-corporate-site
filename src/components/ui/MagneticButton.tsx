import React, { useRef, useEffect, useState } from 'react';

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    strength?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
    children,
    className = "",
    onClick,
    strength = 20
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const frameIdRef = useRef<number | null>(null);
    const currentXRef = useRef(0);
    const currentYRef = useRef(0);
    const targetXRef = useRef(0);
    const targetYRef = useRef(0);
    const [isHoverDevice, setIsHoverDevice] = useState(false);

    useEffect(() => {
        setIsHoverDevice(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
    }, []);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Skip magnetic effect on touch / non-hover devices
        const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        if (!canHover) return;
        const magnetFactor = strength / 40;

        const lerp = (start: number, end: number, t: number) => {
            return start * (1 - t) + end * t;
        };

        const stopAnimation = () => {
            if (frameIdRef.current !== null) {
                cancelAnimationFrame(frameIdRef.current);
                frameIdRef.current = null;
            }
        };

        const animate = () => {
            currentXRef.current = lerp(currentXRef.current, targetXRef.current, 0.1);
            currentYRef.current = lerp(currentYRef.current, targetYRef.current, 0.1);

            element.style.transform = `translate3d(${currentXRef.current}px, ${currentYRef.current}px, 0)`;

            const isSettled =
                Math.abs(currentXRef.current - targetXRef.current) < 0.1 &&
                Math.abs(currentYRef.current - targetYRef.current) < 0.1;

            if (isSettled) {
                stopAnimation();
                return;
            }

            frameIdRef.current = requestAnimationFrame(animate);
        };

        const startAnimation = () => {
            if (frameIdRef.current === null) {
                frameIdRef.current = requestAnimationFrame(animate);
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            targetXRef.current = (e.clientX - centerX) * magnetFactor;
            targetYRef.current = (e.clientY - centerY) * magnetFactor;
            startAnimation();
        };

        const handleMouseLeave = () => {
            targetXRef.current = 0;
            targetYRef.current = 0;
            startAnimation();
        };

        element.addEventListener('mousemove', handleMouseMove, { passive: true });
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
            stopAnimation();
        };
    }, [strength]);

    return (
        <div
            ref={ref}
            className={`inline-block ${isHoverDevice ? 'cursor-none will-change-transform' : ''} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};
