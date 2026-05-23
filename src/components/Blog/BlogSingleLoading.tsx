import type { ReactElement } from "react";

const BlogSingleLoading = (): ReactElement => {
  return (
    <section className="container mx-auto animate-pulse px-4 py-12 text-white">
      <div className="mb-8 space-y-5">
        <div className="h-12 max-w-4xl rounded bg-white/10" />
        <div className="h-10 max-w-2xl rounded bg-white/10" />
      </div>

      <div className="space-y-4">
        <div className="h-5 rounded bg-white/10" />
        <div className="h-5 rounded bg-white/10" />
        <div className="h-5 w-4/5 rounded bg-white/10" />
      </div>
    </section>
  );
};

export default BlogSingleLoading;
