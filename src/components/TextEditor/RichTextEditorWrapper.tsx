"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

type RichTextEditorProps = {
  content: string;
  onChange: (content: string) => void;
};

const LoadingState = () => (
  <div className="w-full space-y-2">
    <div className="min-h-[40px] bg-[#2a2a35] rounded-md animate-pulse"></div>
    <div className="min-h-[200px] bg-[#2a2a35] rounded-md animate-pulse"></div>
  </div>
);

const RichTextEditor = dynamic<RichTextEditorProps>(
  () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        import("./RichTextEditor.client").then((mod) => resolve(mod.default));
      }, 50);
    });
  },
  {
    ssr: false,
    loading: () => <LoadingState />,
  }
);

export default function RichTextEditorWrapper({
  content,
  onChange,
}: RichTextEditorProps) {
  return (
    <Suspense fallback={<LoadingState />}>
      <RichTextEditor content={content} onChange={onChange} />
    </Suspense>
  );
}
