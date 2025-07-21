import { useState } from "react";
import { Mic, MessageCircle, Send, Volume2 } from "lucide-react";
import { AIAvatar } from "./AIAvatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Mode = "voice" | "text";
type Status = "idle" | "listening" | "processing" | "speaking";

export function AIAssistant() {
  const [mode, setMode] = useState<Mode>("voice");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant", content: string }>>([]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setMessages(prev => [...prev, { role: "user", content: message }]);
    setStatus("processing");
    setMessage("");
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Hello! I'm your AI assistant. How can I help you today?" 
      }]);
      setStatus("speaking");
      
      setTimeout(() => {
        setStatus("idle");
      }, 2000);
    }, 1000);
  };

  const handleVoiceToggle = () => {
    if (status === "listening") {
      setStatus("processing");
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: "user", 
          content: "Voice message received" 
        }]);
        setStatus("speaking");
        
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            role: "assistant", 
            content: "I heard you! Voice interaction is active." 
          }]);
          setTimeout(() => setStatus("idle"), 2000);
        }, 1000);
      }, 1500);
    } else {
      setStatus("listening");
    }
  };

  const isActive = status !== "idle";
  const isListening = status === "listening";
  const isSpeaking = status === "speaking";

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-ai-core/5" />
      <div className="absolute inset-0">
        {/* Animated background particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-ai-particle/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `pulse ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 h-screen flex flex-col">
        {/* Header */}
        <header className="py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-tech bg-clip-text text-transparent">
            AI Assistant
          </h1>
          
          <div className="flex gap-2">
            <Button
              variant={mode === "voice" ? "default" : "secondary"}
              size="sm"
              onClick={() => setMode("voice")}
              className="gap-2"
            >
              <Mic className="w-4 h-4" />
              Voice
            </Button>
            <Button
              variant={mode === "text" ? "default" : "secondary"}
              size="sm"
              onClick={() => setMode("text")}
              className="gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Text
            </Button>
          </div>
        </header>

        {/* Main Interface */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          
          {/* Voice Mode - Centered Avatar */}
          {mode === "voice" && (
            <div className="flex flex-col items-center space-y-8 animate-scale-in">
              <AIAvatar 
                isActive={isActive}
                isListening={isListening}
                isSpeaking={isSpeaking}
                size="large"
              />
              
              <div className="text-center space-y-4">
                <h2 className="text-xl font-semibold">
                  {status === "idle" && "Tap to speak"}
                  {status === "listening" && "Listening..."}
                  {status === "processing" && "Processing..."}
                  {status === "speaking" && "Speaking..."}
                </h2>
                
                <Button
                  onClick={handleVoiceToggle}
                  disabled={status === "processing"}
                  className={cn(
                    "w-16 h-16 rounded-full text-lg transition-all duration-300",
                    isListening && "scale-110 shadow-glow-strong",
                    status === "processing" && "opacity-50"
                  )}
                >
                  {isListening ? <Volume2 className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                </Button>
              </div>
            </div>
          )}

          {/* Text Mode - Side Avatar with Chat */}
          {mode === "text" && (
            <div className="w-full max-w-4xl mx-auto flex flex-col h-full animate-fade-in-up">
              <div className="flex-1 flex gap-6">
                
                {/* Chat Messages */}
                <div className="flex-1 flex flex-col">
                  <Card className="flex-1 p-4 bg-card/50 backdrop-blur-sm border-ai-ring/20">
                    <div className="space-y-4 h-full overflow-y-auto">
                      {messages.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                          <p>Start a conversation...</p>
                        </div>
                      ) : (
                        messages.map((msg, index) => (
                          <div 
                            key={index}
                            className={cn(
                              "flex gap-3 animate-fade-in-up",
                              msg.role === "user" ? "justify-end" : "justify-start"
                            )}
                          >
                            <div 
                              className={cn(
                                "max-w-[70%] p-3 rounded-lg",
                                msg.role === "user" 
                                  ? "bg-primary text-primary-foreground" 
                                  : "bg-secondary text-secondary-foreground"
                              )}
                            >
                              {msg.content}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </Card>
                  
                  {/* Input Area */}
                  <div className="mt-4 flex gap-2">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 bg-card/50 backdrop-blur-sm border-ai-ring/20"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!message.trim() || status === "processing"}
                      className="px-4"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Side Avatar */}
                <div className="flex flex-col items-center justify-center w-48 space-y-4">
                  <AIAvatar 
                    isActive={isActive}
                    isListening={false}
                    isSpeaking={isSpeaking}
                    size="large"
                  />
                  <p className="text-sm text-center text-muted-foreground">
                    {status === "idle" && "Ready to chat"}
                    {status === "processing" && "Thinking..."}
                    {status === "speaking" && "Responding..."}
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <footer className="py-4 text-center text-sm text-muted-foreground">
          {mode === "voice" ? "Voice-activated AI Assistant" : "Text-based AI Assistant"}
        </footer>
      </div>
    </div>
  );
}