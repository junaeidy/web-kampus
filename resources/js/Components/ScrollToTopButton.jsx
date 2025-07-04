import React, { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full
                        bg-gray-800 text-white hover:bg-custom-blue transition-all duration-300 shadow-lg ${
                            isVisible
                                ? "opacity-100"
                                : "opacity-0 pointer-events-none"
                        }`}
        >
            <ChevronUp className="w-6 h-6" />
        </button>
    );
}
