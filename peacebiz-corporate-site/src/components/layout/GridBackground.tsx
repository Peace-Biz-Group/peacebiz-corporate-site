import React from 'react';

export const GridBackground = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none flex justify-between px-6 md:px-20 max-w-[1920px] mx-auto w-full">
            {/* Left Line */}
            <div className="w-px h-full bg-black/5 dark:bg-white/5" />

            {/* Center Left */}
            <div className="hidden md:block w-px h-full bg-black/5 dark:bg-white/5" />

            {/* Center Right */}
            <div className="hidden md:block w-px h-full bg-black/5 dark:bg-white/5" />

            {/* Right Line */}
            <div className="w-px h-full bg-black/5 dark:bg-white/5" />
        </div>
    );
};
