import { useState, useEffect } from "react";
import { ArtisanHeader } from "./layout/ArtisanHeader";
import { LeftSidebar } from "./layout/LeftSidebar";
import { CogMachineOrb } from "./orb/CogMachineOrb";
import { TranscriptWindow } from "./transcript/TranscriptWindow";
import { FooterInput } from "./input/FooterInput";
import { cn } from "@/lib/utils";

type Status = "idle" | "listening" | "thinking" | "speaking";

interface Message {
  id: string;
  text: string;
  timestamp: number;
}

export function ArtisanLayout() {
  const [status, setStatus] = useState<Status>("idle");
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [devOpsSidebarOpen, setDevOpsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'n':
            e.preventDefault();
            // New chat logic
            setMessages([]);
            break;
          case 'h':
            e.preventDefault();
            setLeftSidebarOpen(prev => !prev);
            break;
          case 'd':
            e.preventDefault();
            setDevOpsSidebarOpen(prev => !prev);
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text: `User: ${text}`,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, newMessage]);
    setStatus("thinking");

    // Simulate AI processing
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `AI: I understand you said "${text}". How can I help you further?`,
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setStatus("speaking");
      
      setTimeout(() => {
        setStatus("idle");
      }, 2000);
    }, 1500);
  };

  const handleVoiceToggle = () => {
    if (status === "listening") {
      setStatus("thinking");
      
      const voiceMessage: Message = {
        id: Date.now().toString(),
        text: "User: [Voice message received]",
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, voiceMessage]);
      
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: "AI: I heard your voice message. Voice interaction is active.",
          timestamp: Date.now()
        };
        
        setMessages(prev => [...prev, aiResponse]);
        setStatus("speaking");
        
        setTimeout(() => setStatus("idle"), 2000);
      }, 1500);
    } else if (status === "idle") {
      setStatus("listening");
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "listening": return "Listening...";
      case "thinking": return "Processing...";
      case "speaking": return "Responding...";
      default: return "Ready";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-ai-core/5 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#FFD200]/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <ArtisanHeader 
        onDevOpsToggle={() => setDevOpsSidebarOpen(prev => !prev)}
        isDevOpsOpen={devOpsSidebarOpen}
      />

      {/* Main Layout */}
      <div className="flex-1 flex relative">
        {/* Left Sidebar */}
        <LeftSidebar 
          isOpen={leftSidebarOpen}
          onToggle={() => setLeftSidebarOpen(prev => !prev)}
        />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col items-center justify-center relative px-8 py-12">
          {/* Status Badge */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
            <div className={cn(
              "px-4 py-2 rounded-full text-sm font-medium border backdrop-blur-sm",
              "transition-all duration-300",
              status === "idle" && "bg-gray-500/20 border-gray-500/30 text-gray-300",
              status === "listening" && "bg-green-500/20 border-green-500/30 text-green-300",
              status === "thinking" && "bg-yellow-500/20 border-yellow-500/30 text-yellow-300",
              status === "speaking" && "bg-[#FFD200]/20 border-[#FFD200]/30 text-[#FFD200]"
            )}>
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  status !== "idle" && "animate-pulse",
                  status === "idle" && "bg-gray-400",
                  status === "listening" && "bg-green-400",
                  status === "thinking" && "bg-yellow-400",
                  status === "speaking" && "bg-[#FFD200]"
                )} />
                {getStatusText()}
              </div>
            </div>
          </div>

          {/* Cog Machine Orb */}
          <div className="mb-8">
            <CogMachineOrb 
              status={status}
              size="large"
            />
          </div>

          {/* Transcript Window */}
          <TranscriptWindow 
            messages={messages}
            className="mb-8"
          />
        </main>

        {/* DevOps Sidebar (when implemented) */}
        {devOpsSidebarOpen && (
          <aside className="w-[350px] bg-[#14161B] border-l border-border/20 animate-slide-in-from-right">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-[#FFD200] mb-4">DevOps & Monitoring</h3>
              <div className="space-y-4">
                <div className="p-3 bg-background/30 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">System Status</h4>
                  <div className="text-xs text-muted-foreground">
                    All systems operational
                  </div>
                </div>
                <div className="p-3 bg-background/30 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Performance</h4>
                  <div className="text-xs text-muted-foreground">
                    CPU: 23% | RAM: 45% | GPU: 12%
                  </div>
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* Footer Input */}
      <FooterInput 
        onSendMessage={handleSendMessage}
        onVoiceToggle={handleVoiceToggle}
        isListening={status === "listening"}
        isProcessing={status === "thinking"}
      />
    </div>
  );
}