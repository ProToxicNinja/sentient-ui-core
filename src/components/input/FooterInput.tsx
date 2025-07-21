import { useState, useRef } from "react";
import { Mic, Send, Paperclip, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface FooterInputProps {
  onSendMessage: (message: string) => void;
  onVoiceToggle: () => void;
  isListening: boolean;
  isProcessing: boolean;
  className?: string;
}

export function FooterInput({ 
  onSendMessage, 
  onVoiceToggle, 
  isListening, 
  isProcessing,
  className 
}: FooterInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (!message.trim() || isProcessing) return;
    
    onSendMessage(message.trim());
    setMessage("");
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    const newHeight = Math.min(textarea.scrollHeight, 72); // Max 3 lines
    textarea.style.height = `${newHeight}px`;
  };

  return (
    <footer className={cn(
      "sticky bottom-0 bg-[#14161B] border-t border-border/20 shadow-2xl z-50",
      "h-[70px] flex items-center px-6 gap-4",
      className
    )}>
      {/* Voice/Recording Control */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onVoiceToggle}
        disabled={isProcessing}
        className={cn(
          "p-3 rounded-full transition-all duration-200",
          isListening 
            ? "bg-red-500/20 text-red-400 hover:bg-red-500/30 animate-pulse" 
            : "text-muted-foreground hover:text-[#FFD200] hover:bg-[#FFD200]/10"
        )}
        title={isListening ? "Stop Recording" : "Start Voice Recording"}
      >
        {isListening ? (
          <Square className="w-5 h-5" />
        ) : (
          <Mic className="w-5 h-5" />
        )}
      </Button>

      {/* Text Input Area */}
      <div className="flex-1 relative">
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyPress}
          placeholder={isListening ? "Listening..." : "Type your message... (Ctrl+Enter to send)"}
          disabled={isListening || isProcessing}
          className={cn(
            "min-h-[44px] max-h-[72px] resize-none",
            "bg-background/50 border-border/50 focus:border-[#FFD200]/50",
            "placeholder:text-muted-foreground/70",
            "scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
          )}
          rows={1}
        />
      </div>

      {/* Attachment Button */}
      <Button
        variant="ghost"
        size="sm"
        disabled={isProcessing}
        className="p-3 text-muted-foreground hover:text-[#FFD200] hover:bg-[#FFD200]/10"
        title="Attach File"
      >
        <Paperclip className="w-5 h-5" />
      </Button>

      {/* Send Button */}
      <Button
        onClick={handleSend}
        disabled={!message.trim() || isProcessing}
        size="sm"
        className={cn(
          "p-3 rounded-full transition-all duration-200",
          (!message.trim() || isProcessing)
            ? "opacity-50 cursor-not-allowed"
            : "bg-[#FFD200] text-black hover:bg-[#FFD200]/90 shadow-lg"
        )}
        title="Send Message (Ctrl+Enter)"
      >
        <Send className="w-5 h-5" />
      </Button>
    </footer>
  );
}