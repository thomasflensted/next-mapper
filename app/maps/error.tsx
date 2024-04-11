'use client';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {

    return (
        <main className="flex h-full flex-col items-center justify-center">
            <h2 className="text-blue-600 font-bold text-xl mb-2">Oops</h2>
            <h2 className="text-center">Something went wrong!</h2>
            <button
                className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-600"
                onClick={() => reset()}>
                Go Back
            </button>
        </main>
    );
}