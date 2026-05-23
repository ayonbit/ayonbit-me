"use client";

import { useEffect } from "react";

import { motion } from "framer-motion";

import { signIn, useSession } from "next-auth/react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { FcGoogle } from "react-icons/fc";

import { Button } from "../../components/ui/button";

const LoginPage = () => {
  const { status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/write");
    }
  }, [status, router]);

  const handleSignIn = (provider: string) => {
    signIn(provider, {
      callbackUrl: "/write",
    });
  };

  return (
    <div className="container flex items-center justify-center bg-primary p-12">
      <motion.div
        whileHover={{ y: -8 }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            delay: 2.4,
            duration: 0.4,
            ease: "easeIn",
          },
        }}
        className="mx-auto w-full max-w-md"
      >
        <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-xl backdrop-blur-lg">
          <div className="space-y-6 p-6 sm:p-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                Welcome Back
              </h1>

              <p className="mt-2 text-sm text-white/60 sm:text-base">
                Sign in to post articles and manage your blog.
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <Button
                onClick={() => handleSignIn("google")}
                className="w-full gap-3 bg-accent py-3 transition-colors hover:bg-accent/90"
                aria-label="Sign in with Google"
              >
                <FcGoogle className="h-4 w-4 sm:h-5 sm:w-5" />

                <span>Continue with Google</span>
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20" />
              </div>

              <div className="relative flex justify-center">
                <span className="bg-primary px-2 text-xs text-white/50 sm:text-sm">
                  OR
                </span>
              </div>
            </div>

            <div className="text-center">
              <Button
                variant="primary"
                className="text-xs text-white/60 hover:text-accent focus:ring-0 sm:text-sm"
              >
                Continue with Email (Coming Soon)
              </Button>
            </div>
          </div>

          <div className="border-t border-white/10 bg-white/5 px-6 py-4 text-center">
            <p className="text-xs text-white/50 sm:text-sm">
              By signing in, you agree to our{" "}
              <Link href="/terms" className="underline hover:text-white">
                terms & conditions
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
