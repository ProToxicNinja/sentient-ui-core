import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  timestamp: number;
  isNew?: boolean;
}

interface TranscriptWindowProps {
  messages: Message[];
  className?: string;
}

export function TranscriptWindow({ messages, className }: TranscriptWindowProps) {
  const [displayMessages, setDisplayMessages] = useState<Message[]>([]);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Handle new messages with animations
  useEffect(() => {
    if (messages.length === 0) {
      setDisplayMessages([]);
      return;
    }

    const latestMessage = messages[messages.length - 1];
    
    // Add new message with highlight
    setDisplayMessages(prev => {
      const newMessages = [...prev];
      
      // Mark message as new for animation
      const messageWithAnimation = { ...latestMessage, isNew: true };
      newMessages.push(messageWithAnimation);
      
      // Keep only last 4 messages
      return newMessages.slice(-4);
    });

    // Highlight new message
    setHighlightedId(latestMessage.id);
    
    // Remove highlight after animation
    const highlightTimer = setTimeout(() => {
      setHighlightedId(null);
      
      // Remove isNew flag
      setDisplayMessages(prev => 
        prev.map(msg => ({ ...msg, isNew: false }))
      );
    }, 500);

    // Auto-scroll after a delay
    const scrollTimer = setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, 1500);

    return () => {
      clearTimeout(highlightTimer);
      clearTimeout(scrollTimer);
    };
  }, [messages]);

  if (displayMessages.length === 0) {
    return (
      <div className={cn(
        "w-[60%] max-w-4xl mx-auto bg-black/60 backdrop-blur-md rounded-lg border border-[#FFD200]/20 p-6",
        "min-h-[120px] flex items-center justify-center",
        className
      )}>
        <p className="text-white/70 font-mono text-sm">
          Waiting for conversation...
        </p>
      </div>
    );
  }

  return (
    <div className={cn(
      "w-[60%] max-w-4xl mx-auto bg-black/60 backdrop-blur-md rounded-lg border border-[#FFD200]/20 p-4",
      "max-h-32 overflow-hidden relative",
      className
    )}>
      <div 
        ref={scrollRef}
        className="space-y-2 h-full overflow-y-auto scrollbar-hide"
      >
        {displayMessages.map((message, index) => (
          <div
            key={message.id}
            className={cn(
              "font-mono text-sm leading-relaxed transition-all duration-300",
              "text-white/90",
              message.isNew && "animate-fade-in",
              highlightedId === message.id && "text-[#FFD200] bg-[#FFD200]/10 px-2 py-1 rounded",
              index < displayMessages.length - 4 && "opacity-60"
            )}
            style={{
              animationDelay: message.isNew ? '200ms' : '0ms'
            }}
          >
            <span className="text-[#FFD200]/60 text-xs mr-2">
              {new Date(message.timestamp).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
            {message.text}
          </div>
        ))}
      </div>
      
      {/* Gradient fade at top */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
    </div>
  );
}
