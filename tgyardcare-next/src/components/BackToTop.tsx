import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChatContext } from "@/contexts/ChatContext";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { isChatOpen } = useChatContext();

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 400px
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Hide when chat is open or not scrolled enough
  if (!isVisible || isChatOpen) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-[5.5rem] right-7 z-40 h-9 w-9 rounded-full
        bg-gradient-to-br from-emerald-500 via-emerald-600 to-green-700
        border border-emerald-400/25
        shadow-[0_3px_14px_rgba(16,185,129,0.3),inset_0_1px_0_rgba(255,255,255,0.12)]
        hover:shadow-[0_4px_20px_rgba(16,185,129,0.45)]
        hover:scale-105 active:scale-95
        text-white transition-all duration-300 animate-fade-in
        flex items-center justify-center"
      aria-label="Back to top"
    >
      <ArrowUp className="h-4 w-4 drop-shadow-sm" />
    </button>
  );
}
