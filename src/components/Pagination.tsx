"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type PaginationProps = {
  totalItems: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
  currentPage?: number;
  className?: string;
};

const Pagination = ({
  totalItems,
  itemsPerPage = 6,
  onPageChange,
  currentPage = 1,
  className = "",
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const [activePage, setActivePage] = useState<number>(currentPage);

  const handlePageChange = (page: number): void => {
    if (page < 1 || page > totalPages) return;

    setActivePage(page);
    onPageChange(page);
  };

  // Generate visible page numbers
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const leftBound = Math.max(2, activePage - 1);
      const rightBound = Math.min(totalPages - 1, activePage + 1);

      pages.push(1);

      if (leftBound > 2) pages.push("...");

      for (let i = leftBound; i <= rightBound; i++) {
        pages.push(i);
      }

      if (rightBound < totalPages - 1) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div
      className={`mt-12 flex items-center justify-center gap-2 ${className}`}
    >
      {/* Previous Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => handlePageChange(activePage - 1)}
        disabled={activePage === 1}
        className="rounded-md bg-white/5 px-4 py-2 transition-colors hover:bg-accent/20 disabled:opacity-30"
      >
        Prev
      </motion.button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`} className="px-3 py-1">
              ...
            </span>
          ) : (
            <motion.button
              key={page}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePageChange(page as number)}
              className={`flex h-10 w-10 items-center justify-center rounded-md transition-colors ${
                activePage === page
                  ? "bg-accent font-bold text-black"
                  : "bg-white/5 hover:bg-white/10"
              }`}
            >
              {page}
            </motion.button>
          ),
        )}
      </div>

      {/* Next Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => handlePageChange(activePage + 1)}
        disabled={activePage === totalPages}
        className="rounded-md bg-white/5 px-4 py-2 transition-colors hover:bg-accent/20 disabled:opacity-30"
      >
        Next
      </motion.button>
    </div>
  );
};

export default Pagination;
