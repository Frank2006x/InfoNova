"use client";
import { BookOpenCheck, Bug, Wrench, Info } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";



const RightPanel: React.FC = () => {
  const [isWide, setIsWide] = useState(true);
  const panelRef = useRef<HTMLDivElement>(null);
  const [selectedAgent, setSelectedAgent] = useState<"Lexa" | "Trace" | "Bolt" | null>(null);
  useEffect(() => {
    const observeResize = () => {
      if (panelRef.current) {
        const width = panelRef.current.offsetWidth;
        setIsWide(width > 530);
      }
    };

    observeResize();

    const resizeObserver = new ResizeObserver(observeResize);
    if (panelRef.current) {
      resizeObserver.observe(panelRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={panelRef} className="flex h-full flex-col p-6">
      {isWide ? (
        <section className="flex gap-3 w-full justify-evenly" id="agents">
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-full bg-muted flex items-center justify-center relative">
              <div className="absolute left-0 bg-muted w-15 h-15 rounded-full flex items-center justify-center ">
                <div className=" bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center">
                  <BookOpenCheck />
                </div>
              </div>
              <div className="bg-blue-700 w-35 h-15 rounded-full flex items-center justify-center pr-2 pl-12 mx-auto">
                <span className="text-white font-semibold text-md font-mono ">
                  Lexa
                </span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      aria-label="More info about Lexa"
                      className="absolute right-2 ml-2 hover:bg-blue-600 rounded-full p-1 transition-colors"
                    >
                      <Info size={16} className="text-white" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-[var(--card)] border-[var(--ring)] text-[var(--primary-foreground)]">
                    <div className="text-center max-w-xs">
                      <p className="font-semibold">Lexa - Code Explainer</p>
                      <p className="text-xs opacity-80">
                        Helps you understand code logic and structure clearly
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="rounded-full bg-muted flex items-center justify-center relative">
              <div className="absolute left-0 bg-muted w-15 h-15 rounded-full flex items-center justify-center ">
                <div className="bg-red-500 w-10 h-10 rounded-full flex items-center justify-center">
                  <Bug />
                </div>
              </div>
              <div className="bg-orange-600 w-35 h-15 rounded-full flex items-center justify-center pr-2 pl-12 mx-auto">
                <span className="text-white font-semibold text-md font-mono ">
                  Trace
                </span>
                <Tooltip >
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      aria-label="More info about Trace"
                      className="ml-2 absolute right-2 hover:bg-orange-500 rounded-full p-1 transition-colors"
                    >
                      <Info size={16} className="text-white" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-[var(--card)] border-[var(--border)] text-[var(--destructive-foreground)]">
                    <div className="text-center max-w-xs">
                      <p className="font-semibold">Trace - Debugger</p>
                      <p className="text-xs opacity-80">
                        Hunts down and fixes your errors efficiently
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="rounded-full bg-muted flex items-center justify-center relative">
              <div className="absolute left-0 bg-muted w-15 h-15 rounded-full flex items-center justify-center ">
                <div className="bg-green-500 w-10 h-10 rounded-full flex items-center justify-center">
                  <Wrench />
                </div>
              </div>
              <div className="bg-emerald-700 w-35 h-15 rounded-full flex items-center justify-center pr-2 pl-12 mx-auto">
                <span className="text-white font-semibold text-md font-mono ">
                  Bolt
                </span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      aria-label="More info about Bolt"
                      className="ml-2 absolute right-2 hover:bg-emerald-600 rounded-full p-1 transition-colors"
                    >
                      <Info size={16} className="text-white" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-[var(--card)] border-[var(--border)] text-[var(--accent-foreground)]">
                    <div className="text-center max-w-xs">
                      <p className="font-semibold">Bolt - Optimizer</p>
                      <p className="text-xs opacity-80">
                        Fast, powerful, and fine-tunes your code for performance
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="flex justify-between gap-3 w-full" id="agents">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="bg-muted w-20 h-20 rounded-full flex items-center justify-center ">
                  <div className="bg-blue-500 w-15 h-15 rounded-full flex items-center justify-center">
                    <BookOpenCheck size={30} />
                  </div>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-[var(--card)] border-[var(--border)] text-[var(--accent-foreground)]">
              <div className="text-center">
                <p className="font-semibold">Lexa</p>
                <p className="text-xs text-muted-foreground">
                  Code Explainer - Helps you understand code logic and structure
                  clearly
                </p>
              </div>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="bg-muted w-20 h-20 rounded-full flex items-center justify-center ">
                  <div className="bg-red-500 w-15 h-15 rounded-full flex items-center justify-center">
                    <Bug size={30} />
                  </div>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-[var(--card)] border-[var(--border)] text-[var(--accent-foreground)]">
              <div className="text-center">
                <p className="font-semibold">Trace</p>
                <p className="text-xs text-muted-foreground">
                  Debugger - Hunts down and fixes your errors efficiently
                </p>
              </div>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="bg-muted w-20 h-20 rounded-full flex items-center justify-center ">
                  <div className="bg-green-500 w-15 h-15 rounded-full flex items-center justify-center">
                    <Wrench size={30} />
                  </div>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-[var(--card)] border-[var(--border)] text-[var(--accent-foreground)]">
              <div className="text-center">
                <p className="font-semibold">Bolt </p>
                <p className="text-xs text-muted-foreground">
                  Optimizer - Fast, powerful, and fine-tunes your code for
                  performance
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </section>
      )}
    </div>
  );
};

export default RightPanel;
