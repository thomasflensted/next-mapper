import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="flex h-full flex-col items-center justify-center gap-4">
            <h2 className="text-xl font-bold">Oops</h2>
            <p className='font-light text-sm text-center'>It looks like you tried to access <br />a map that doesn't exist.</p>
            <Link href="/maps"
                className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400">
                Go Back
            </Link>
        </main>
    );
}