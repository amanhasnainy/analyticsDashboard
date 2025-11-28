import React from "react";

export default function Skeleton({ className = "" }) {
  return (
    <div
      className={
        "animate-pulse bg-gray-300 dark:bg-gray-700 rounded-md " + className
      }
    ></div>
  );
}
