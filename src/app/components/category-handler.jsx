"use client";
import React from "react";
import { categories } from "@/static/config";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export default function CategoryHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeCat    = searchParams.get("cat");
  const params = new URLSearchParams(searchParams.toString());
  const setCategory = (cat) => {
    params.set("cat", cat);
    router.push(`?${params.toString()}`);
  };
  return (
    <div className="w-full flex justify-evenly grid-cols-12 gap-3 px-8  border-b border-gray-100 py-2 overflow-x-auto">
      {categories.map((cat) => {
        return (
          <div
            onClick={() => setCategory(cat.label)}
            key={cat.label}
            className={cn(
                "flex flex-col gap-1 items-center cursor-pointer hover:bg-gray-100/4 transition-colors duration-200 delay-100 p-4 rounded-lg hover:text-pink-400",
            activeCat==cat.label && "bg-gray-100/40  text-pink-400"
            )}
          >
            <cat.icon />
            <cat.label />
          </div>
        );
      })}
    </div>
  );
}
