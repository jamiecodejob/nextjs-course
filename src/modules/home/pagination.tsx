"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
// import {useState, useEffect} from 'react';
interface PaginationProps {
  totalPages: number;
}

const Pagination = ({ totalPages }: PaginationProps) => {
  const currentPage = useSearchParams().get("page") || "1";
  const [time, setTime]=useState(0);
  // useEffect(()=> {
  //   setTime(new Date().getTime());
  // }, [currentPage]);

  return (
    <div className="flex gap-4 text-sm font-semibold">
      {Array.from({ length: totalPages }).map((_, index) => (
        <Link
          href={`?page=${index + 1}`}
          key={index}
          className={`${currentPage === `${index + 1}` ? "text-[#E87A90]" : "text-[#77969A]"}`}
        >
          {index + 1}
        </Link>
      ))}
      {/* 用來計算時間 */}
      {/* {time.toString()} */}
    </div>
  );
};

export default Pagination;
