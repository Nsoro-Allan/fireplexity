"use client";

import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchComponentProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  input: string;
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  isLoading: boolean;
}

export function SearchComponent({
  handleSubmit,
  input,
  handleInputChange,
  isLoading,
}: SearchComponentProps) {
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto pt-12 animate-fade-up animation-delay-600"
    >
      <div className="relative flex items-center group">
        <Input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Ask anything..."
          className="pr-24 h-16 text-lg rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm transition-all duration-300 focus:border-orange-400 dark:focus:border-orange-500 focus:shadow-lg focus:shadow-orange-100 dark:focus:shadow-orange-900/20 hover:border-gray-300 dark:hover:border-gray-600"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input || input.trim() === ""}
          className="absolute right-2 p-0 flex items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed active:scale-95 transition-all duration-300 shadow-md hover:shadow-lg disabled:shadow-none"
        >
          <div className="w-[60px] h-[44px] flex items-center justify-center">
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin text-white" />
            ) : (
              <svg
                fill="none"
                height="20"
                viewBox="0 0 20 20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white transition-transform duration-300 group-hover:translate-x-1"
              >
                <path
                  d="M11.6667 4.79163L16.875 9.99994M16.875 9.99994L11.6667 15.2083M16.875 9.99994H3.125"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            )}
          </div>
        </button>
      </div>
    </form>
  );
}
