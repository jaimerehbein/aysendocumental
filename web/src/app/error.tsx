'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-netflix-black flex flex-col items-center justify-center text-white space-y-4">
            <h2 className="text-2xl font-bold">Algo salió mal</h2>
            <p className="text-gray-400">No pudimos cargar el contenido.</p>
            <button
                onClick={() => reset()}
                className="bg-netflix-red text-white px-6 py-2 rounded font-bold hover:bg-red-700 transition"
            >
                Intentar de nuevo
            </button>
        </div>
    );
}
