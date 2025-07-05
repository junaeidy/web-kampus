import React from 'react';
import { Atom } from 'react-loading-indicators';

export default function LoadingOverlay() {
    return (
        <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center transition-opacity duration-300">
            <Atom color="#334eac" size="medium" text="" textColor="" />
        </div>
    );
}
