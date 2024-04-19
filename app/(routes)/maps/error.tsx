'use client';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {

    return (
        <main className="flex flex-col items-center justify-center h-full">
            <h2 className="mb-2 text-xl font-bold text-blue-600">Oops</h2>
            <h2 className="text-center">Something went wrong!</h2>
            <button
                className="px-4 py-2 mt-4 text-sm text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600"
                onClick={() => reset()}>
                Go Back
            </button>
        </main>
    );
}