import type { ReactNode } from "react";

import { createMetadata } from "../../lib/seo";

export const metadata = createMetadata({
  title: "Write",
  description: "Private blog writing area for Ayon Bit.",
  path: "/write",
  noIndex: true,
});

export default function WriteLayout({ children }: { children: ReactNode }) {
  return children;
}
