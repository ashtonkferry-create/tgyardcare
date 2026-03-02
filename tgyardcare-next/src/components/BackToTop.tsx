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
    <Button
      onClick={scrollToTop}
      size="icon"
      className="fixed bottom-[5.5rem] right-6 z-40 h-10 w-10 rounded-full shadow-md bg-emerald-500/80 hover:bg-emerald-400 text-white transition-all duration-300 animate-fade-in hover:shadow-[0_0_15px_rgba(52,211,153,0.25)]"
      aria-label="Back to top"
    >
      <ArrowUp className="h-4 w-4" />
    </Button>
  );
}
