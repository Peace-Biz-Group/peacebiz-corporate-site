import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Force immediate scroll to top without animation
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "auto" // Immediate scroll without animation
        });

        // Manual override for some browsers that might try to restore scroll
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
    }, [pathname]);

    return null;
}
