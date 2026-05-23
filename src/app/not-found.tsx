import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import React from "react";
import { Button } from "../components/ui/button";

const NotFound = (): React.JSX.Element => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 size-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center shadow-2xl backdrop-blur-xl">
        <div className="space-y-6">
          {/* 404 */}
          <h1 className="bg-linear-to-r from-red-500 to-orange-400 bg-clip-text text-7xl font-extrabold text-transparent md:text-8xl">
            404
          </h1>

          {/* Title */}
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Page Not Found
          </h2>

          {/* Description */}
          <p className="mx-auto max-w-md text-base leading-7 text-white/70 md:text-lg">
            Sorry, the page you&apos;re looking for doesn&apos;t exist, was
            removed, or may have been moved to another location.
          </p>

          {/* Button */}
          <div className="pt-4">
            <Button
              asChild
              size="lg"
              className="group rounded-full px-8 text-base font-medium transition-all duration-300 hover:scale-105"
            >
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
