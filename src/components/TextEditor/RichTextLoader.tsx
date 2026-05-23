"use client";

import type { ReactNode } from "react";

type RichTextLoaderProps = {
  children: ReactNode;
};

export default function RichTextLoader({ children }: RichTextLoaderProps) {
  return <>{children}</>;
}
