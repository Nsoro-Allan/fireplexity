"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { SearchComponent } from "./search";
import { ChatInterface } from "./chat-interface";
import { SearchResult, NewsResult, ImageResult } from "./types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ErrorDisplay } from "@/components/error-display";
import { ThemeToggle } from "@/components/theme-toggle";

interface MessageData {
  sources: SearchResult[];
  newsResults?: NewsResult[];
  imageResults?: ImageResult[];
  followUpQuestions: string[];
  ticker?: string;
}

export default function FireplexityPage() {
  const [sources, setSources] = useState<SearchResult[]>([]);
  const [newsResults, setNewsResults] = useState<NewsResult[]>([]);
  const [imageResults, setImageResults] = useState<ImageResult[]>([]);
  const [followUpQuestions, setFollowUpQuestions] = useState<string[]>([]);
  const [searchStatus, setSearchStatus] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const lastDataLength = useRef(0);
  const [messageData, setMessageData] = useState<Map<number, MessageData>>(
    new Map()
  );
  const currentMessageIndex = useRef(0);
  const [currentTicker, setCurrentTicker] = useState<string | null>(null);
  const [firecrawlApiKey, setFirecrawlApiKey] = useState<string>("");
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState<boolean>(false);
  const [, setIsCheckingEnv] = useState<boolean>(true);
  const [pendingQuery, setPendingQuery] = useState<string>("");
  const [input, setInput] = useState<string>("");

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/fireplexity/search",
      body: firecrawlApiKey ? { firecrawlApiKey } : undefined,
    }),
  });

  // Single consolidated effect for handling streaming data
  useEffect(() => {
    // Handle response start
    if (status === "streaming" && messages.length > 0) {
      const assistantMessages = messages.filter((m) => m.role === "assistant");
      const newIndex = assistantMessages.length;

      // Only clear if we're starting a new message
      if (newIndex !== currentMessageIndex.current) {
        setSearchStatus("");
        setSources([]);
        setNewsResults([]);
        setImageResults([]);
        setFollowUpQuestions([]);
        setCurrentTicker(null);
        currentMessageIndex.current = newIndex;
        lastDataLength.current = 0; // Reset data tracking for new message
      }
    }

    // Handle data parts from messages
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage.parts || lastMessage.parts.length === 0) return;

      // Check if we've already processed this data
      const partsLength = lastMessage.parts.length;
      if (partsLength === lastDataLength.current) return;
      lastDataLength.current = partsLength;

      // Process ALL parts to accumulate data
      let hasSourceData = false;
      let latestSources: SearchResult[] = [];
      let latestNewsResults: NewsResult[] = [];
      let latestImageResults: ImageResult[] = [];
      let latestTicker: string | null = null;
      let latestFollowUpQuestions: string[] = [];
      let latestStatus: string | null = null;

      lastMessage.parts.forEach((part: any) => {
        // Handle different data part types
        if (part.type === "data-sources" && part.data) {
          hasSourceData = true;
          // Use the latest data from this part
          if (part.data.sources) latestSources = part.data.sources;
          if (part.data.newsResults) latestNewsResults = part.data.newsResults;
          if (part.data.imageResults)
            latestImageResults = part.data.imageResults;
        }

        if (part.type === "data-ticker" && part.data) {
          latestTicker = part.data.symbol;
        }

        if (part.type === "data-followup" && part.data && part.data.questions) {
          latestFollowUpQuestions = part.data.questions;
        }

        if (part.type === "data-status" && part.data) {
          latestStatus = part.data.message || "";
        }
      });

      // Apply updates
      if (hasSourceData) {
        setSources(latestSources);
        setNewsResults(latestNewsResults);
        setImageResults(latestImageResults);
      }
      if (latestTicker !== null) setCurrentTicker(latestTicker);
      if (latestFollowUpQuestions.length > 0)
        setFollowUpQuestions(latestFollowUpQuestions);
      if (latestStatus !== null) setSearchStatus(latestStatus);

      // Update message data map
      if (
        hasSourceData ||
        latestTicker !== null ||
        latestFollowUpQuestions.length > 0
      ) {
        setMessageData((prevMap) => {
          const newMap = new Map(prevMap);
          const existingData = newMap.get(currentMessageIndex.current) || {
            sources: [],
            followUpQuestions: [],
          };
          newMap.set(currentMessageIndex.current, {
            ...existingData,
            ...(hasSourceData && {
              sources: latestSources,
              newsResults: latestNewsResults,
              imageResults: latestImageResults,
            }),
            ...(latestTicker !== null && { ticker: latestTicker }),
            ...(latestFollowUpQuestions.length > 0 && {
              followUpQuestions: latestFollowUpQuestions,
            }),
          });
          return newMap;
        });
      }
    }
  }, [status, messages.length, messages[messages.length - 1]?.parts?.length]);

  // Check for environment variables on mount
  useEffect(() => {
    const checkApiKey = async () => {
      try {
        const response = await fetch("/api/fireplexity/check-env");
        const data = await response.json();

        if (data.hasFirecrawlKey) {
          setHasApiKey(true);
        } else {
          // Check localStorage for user's API key
          const storedKey = localStorage.getItem("firecrawl-api-key");
          if (storedKey) {
            setFirecrawlApiKey(storedKey);
            setHasApiKey(true);
          }
        }
      } catch (error) {
        // Error checking environment
      } finally {
        setIsCheckingEnv(false);
      }
    };

    checkApiKey();
  }, []);

  const handleApiKeySubmit = () => {
    if (firecrawlApiKey.trim()) {
      localStorage.setItem("firecrawl-api-key", firecrawlApiKey);
      setHasApiKey(true);
      setShowApiKeyModal(false);
      toast.success("API key saved successfully!");

      // If there's a pending query, submit it
      if (pendingQuery) {
        sendMessage({ text: pendingQuery });
        setPendingQuery("");
      }
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Check if we have an API key
    if (!hasApiKey) {
      setPendingQuery(input);
      setShowApiKeyModal(true);
      return;
    }

    setHasSearched(true);
    // Don't clear data here - wait for new data to arrive
    // This prevents layout jump
    sendMessage({ text: input });
    setInput("");
  };

  // Wrapped submit handler for chat interface
  const handleChatSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Check if we have an API key
    if (!hasApiKey) {
      setPendingQuery(input);
      setShowApiKeyModal(true);
      return;
    }

    // Store current data in messageData before new query
    if (messages.length > 0 && sources.length > 0) {
      const assistantMessages = messages.filter((m) => m.role === "assistant");
      const lastAssistantIndex = assistantMessages.length - 1;
      if (lastAssistantIndex >= 0) {
        const newMap = new Map(messageData);
        newMap.set(lastAssistantIndex, {
          sources: sources,
          newsResults: newsResults,
          imageResults: imageResults,
          followUpQuestions: followUpQuestions,
          ticker: currentTicker || undefined,
        });
        setMessageData(newMap);
      }
    }

    // Don't clear data here - wait for new data to arrive
    // The useEffect will clear when it detects a new assistant message starting
    sendMessage({ text: input });
    setInput("");
  };

  const isChatActive = hasSearched || messages.length > 0;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-orange-50/30 to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 transition-colors duration-500">
      {/* Animated background gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-orange-300 dark:bg-orange-900/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 dark:opacity-10 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 dark:bg-yellow-900/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 dark:opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-900/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 dark:opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header with logo and theme toggle */}
      <header className="px-4 sm:px-6 lg:px-8 py-1 mt-2 relative z-10">
        <div className="max-w-[1216px] mx-auto flex items-center justify-between">
          <Link
            href="/"
            rel="noopener noreferrer"
            className="flex items-center group"
          >
            <Image
              src="/firecrawl-logo.svg"
              alt="Firecrawl Logo"
              width={90}
              height={24}
              className="h-6 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero section - enhanced with animations */}
      <div
        className={`px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10 ${
          isChatActive ? "hidden" : "block"
        }`}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-[3rem] lg:text-[4rem] font-bold tracking-tight leading-tight animate-fade-up">
            <span className="text-[#ff4d00] block bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Fireplexity.
            </span>
            <span className="text-[#262626] dark:text-white block text-[3rem] lg:text-[4rem] font-bold -mt-2 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Search & Scrape
            </span>
          </h1>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto animate-fade-up animation-delay-200">
            Multi-source search with AI-powered insights, news, and images
          </p>

          {/* Feature badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 animate-fade-up animation-delay-400">
            <div className="px-4 py-2 rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                🔥 AI-Powered
              </span>
            </div>
            <div className="px-4 py-2 rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                ⚡ Real-time
              </span>
            </div>
            <div className="px-4 py-2 rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                🌐 Multi-source
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content wrapper */}
      <div className="flex-1 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto h-full">
          {!isChatActive ? (
            <SearchComponent
              handleSubmit={handleSearch}
              input={input}
              handleInputChange={(e) => setInput(e.target.value)}
              isLoading={status === "streaming"}
            />
          ) : (
            <ChatInterface
              messages={messages}
              sources={sources}
              newsResults={newsResults}
              imageResults={imageResults}
              followUpQuestions={followUpQuestions}
              searchStatus={searchStatus}
              isLoading={status === "streaming"}
              input={input}
              handleInputChange={(e) => setInput(e.target.value)}
              handleSubmit={handleChatSubmit}
              messageData={messageData}
              currentTicker={currentTicker}
            />
          )}
        </div>
      </div>

      {/* API Key Modal */}
      <Dialog open={showApiKeyModal} onOpenChange={setShowApiKeyModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Firecrawl API Key Required</DialogTitle>
            <DialogDescription>
              To use Fireplexity search, you need a Firecrawl API key. Get one
              for free at{" "}
              <a
                href="https://www.firecrawl.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 hover:text-orange-700 underline"
              >
                firecrawl.dev
              </a>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Enter your Firecrawl API key"
              value={firecrawlApiKey}
              onChange={(e) => setFirecrawlApiKey(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleApiKeySubmit();
                }
              }}
              className="h-12"
            />
            <Button
              onClick={handleApiKeySubmit}
              variant="orange"
              className="w-full"
            >
              Save API Key
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
