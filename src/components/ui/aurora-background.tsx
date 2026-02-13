"use client";

import { cn } from "../../utils/cn";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col h-[100vh] items-center justify-center bg-zinc-50 dark:bg-zinc-900 text-slate-950 transition-bg",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            "pointer-events-none absolute -inset-[10px] opacity-50 will-change-transform",
            "blur-[10px] invert dark:invert-0",
            "after:content-[''] after:absolute after:inset-0",
            "after:animate-aurora after:[background-attachment:fixed]",
            "after:mix-blend-difference",
            showRadialGradient &&
              "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]"
          )}
          style={{
            backgroundImage: [
              'repeating-linear-gradient(100deg, #fff 0%, #fff 7%, transparent 10%, transparent 12%, #fff 16%)',
              'repeating-linear-gradient(100deg, #3b82f6 10%, #a5b4fc 15%, #93c5fd 20%, #ddd6fe 25%, #60a5fa 30%)',
            ].join(', '),
            backgroundSize: '300% 100%, 200% 100%',
            backgroundPosition: '50% 50%, 50% 50%',
          }}
        >
          {/* Animated after pseudo-element via inline style override */}
          <div
            className="absolute inset-0 animate-aurora mix-blend-difference"
            style={{
              backgroundImage: [
                'repeating-linear-gradient(100deg, #fff 0%, #fff 7%, transparent 10%, transparent 12%, #fff 16%)',
                'repeating-linear-gradient(100deg, #3b82f6 10%, #a5b4fc 15%, #93c5fd 20%, #ddd6fe 25%, #60a5fa 30%)',
              ].join(', '),
              backgroundSize: '200% 100%, 100% 100%',
              backgroundAttachment: 'fixed',
            }}
          />
        </div>
        {/* Dark mode variant overlay */}
        <div
          className={cn(
            "pointer-events-none absolute -inset-[10px] opacity-50 will-change-transform",
            "blur-[10px]",
            "hidden dark:block",
            showRadialGradient &&
              "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]"
          )}
          style={{
            backgroundImage: [
              'repeating-linear-gradient(100deg, #000 0%, #000 7%, transparent 10%, transparent 12%, #000 16%)',
              'repeating-linear-gradient(100deg, #3b82f6 10%, #a5b4fc 15%, #93c5fd 20%, #ddd6fe 25%, #60a5fa 30%)',
            ].join(', '),
            backgroundSize: '300% 100%, 200% 100%',
            backgroundPosition: '50% 50%, 50% 50%',
          }}
        >
          <div
            className="absolute inset-0 animate-aurora mix-blend-difference"
            style={{
              backgroundImage: [
                'repeating-linear-gradient(100deg, #000 0%, #000 7%, transparent 10%, transparent 12%, #000 16%)',
                'repeating-linear-gradient(100deg, #3b82f6 10%, #a5b4fc 15%, #93c5fd 20%, #ddd6fe 25%, #60a5fa 30%)',
              ].join(', '),
              backgroundSize: '200% 100%, 100% 100%',
              backgroundAttachment: 'fixed',
            }}
          />
        </div>
      </div>
      {children}
    </div>
  );
};
