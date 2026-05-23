import type { ReactNode } from "react";

import { createMetadata } from "../../lib/seo";

export const metadata = createMetadata({
  title: "Sign In",
  description: "Sign in to manage Ayon Bit blog content.",
  path: "/sign-in",
  noIndex: true,
});

export default function SignInLayout({ children }: { children: ReactNode }) {
  return children;
}
