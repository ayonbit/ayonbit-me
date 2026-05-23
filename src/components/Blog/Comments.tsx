"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
  type ReactElement,
} from "react";
import toast from "react-hot-toast";

import { Button } from "../ui/button";

import type { CommentType } from "../../types/blog.types";

type CommentsProps = {
  postSlug: string;
  onCommentCountChange?: (count: number) => void;
};

const formatDate = (value: string): string => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
};

const Comments = ({
  postSlug,
  onCommentCountChange,
}: CommentsProps): ReactElement => {
  const { data: session } = useSession();

  const [comments, setComments] = useState<CommentType[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!postSlug) {
      return;
    }

    const controller = new AbortController();

    const fetchComments = async (): Promise<void> => {
      try {
        const res = await fetch(
          `/api/comments?slug=${encodeURIComponent(postSlug)}`,
          {
            cache: "no-store",
            signal: controller.signal,
          },
        );

        if (!res.ok) {
          throw new Error("Failed to fetch comments");
        }

        const data: CommentType[] = await res.json();

        if (Array.isArray(data)) {
          setComments(data);
        }
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        console.error(error);
        toast.error("Failed to load comments");
      }
    };

    fetchComments();

    return () => {
      controller.abort();
    };
  }, [postSlug]);

  useEffect(() => {
    onCommentCountChange?.(comments.length);
  }, [comments.length, onCommentCountChange]);

  const handleAddComment = useCallback(async (): Promise<void> => {
    const desc = input.trim();

    if (!desc || loading) {
      return;
    }

    if (!session) {
      toast.error("Please sign in with Google to post a comment.");
      signIn("google", {
        callbackUrl: window.location.href,
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          desc,
          postSlug,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to post comment");
      }

      const saved: CommentType = await res.json();
      const newComment: CommentType = {
        ...saved,
        user: saved.user || {
          name: session.user?.name || "Guest User",
          image: session.user?.image || "",
        },
      };

      setComments((prev) => [newComment, ...prev]);
      setInput("");
      toast.success("Comment posted!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to post comment");
    } finally {
      setLoading(false);
    }
  }, [input, loading, postSlug, session]);

  return (
    <section className="mt-12 space-y-4 border-t border-white/10 pt-6 text-white">
      <div className="flex flex-col gap-2">
        <textarea
          className="rounded-md bg-[#2a2a35] p-3 text-white/90 outline-none"
          placeholder="Write a comment..."
          rows={2}
          value={input}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
            setInput(event.target.value)
          }
        />

        <Button
          onClick={handleAddComment}
          className="self-end rounded-md px-4 py-2 transition"
          disabled={loading}
        >
          {loading ? "Posting..." : "Comment"}
        </Button>
      </div>

      <div className="w-full space-y-4 lg:w-1/2">
        {comments.map((comment) => (
          <article
            key={comment.id}
            className="space-y-3 rounded-2xl p-4 shadow-sm transition-colors"
          >
            <div className="flex items-start gap-4">
              {comment.user?.image ? (
                <Image
                  src={comment.user.image}
                  alt={comment.user?.name || "User avatar"}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white/70">
                  {comment.user?.name?.[0] || "G"}
                </div>
              )}

              <div className="flex-1">
                <div className="flex flex-col">
                  <h4 className="font-semibold text-white">
                    {comment.user?.name || "Guest User"}
                  </h4>

                  <span className="mt-1 text-xs text-white/40">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>

                <p className="mt-6 leading-relaxed text-white/80">
                  {comment.desc}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Comments;
