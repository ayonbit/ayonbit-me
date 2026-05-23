"use client";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({
  error,
  reset,
}: GlobalErrorProps) {
  console.error(error);

  return (
    <html lang="en">
      <body>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a] p-4 text-white">
          <div className="max-w-md space-y-4 text-center">
            <h1 className="text-6xl font-bold text-red-600">500!</h1>

            <h2 className="text-3xl font-semibold">
              Something went wrong!
            </h2>

            <p className="text-sm text-gray-300">
              An unexpected error occurred. Please try again.
            </p>

            <button
              onClick={() => reset()}
              className="rounded-lg bg-accent px-6 py-3 text-white transition-colors hover:bg-accent/80"
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}