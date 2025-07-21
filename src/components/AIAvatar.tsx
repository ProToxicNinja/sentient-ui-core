import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AIAvatarProps {
  isActive?: boolean;
  isListening?: boolean;
  isSpeaking?: boolean;
  size?: "small" | "large";
  className?: string;
}

export function AIAvatar({ 
  isActive = false, 
  isListening = false, 
  isSpeaking = false,
  size = "large",
  className 
}: AIAvatarProps) {
  const [pulseCount, setPulseCount] = useState(0);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setPulseCount(prev => prev + 1);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isActive]);

  const sizeClasses = {
    small: "w-16 h-16",
    large: "w-32 h-32 md:w-40 md:h-40"
  };

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {/* Outer rotating ring */}
      <div 
        className={cn(
          "absolute inset-0 rounded-full border-2 border-dashed border-ai-ring/30",
          size === "large" ? "animate-rotate-ring" : "",
          sizeClasses[size]
        )}
      />
      
      {/* Pulse rings */}
      {isActive && (
        <>
          <div 
            className={cn(
              "absolute inset-0 rounded-full border border-ai-pulse/20 animate-ripple",
              sizeClasses[size]
            )}
            key={`pulse-1-${pulseCount}`}
          />
          <div 
            className={cn(
              "absolute inset-0 rounded-full border border-ai-pulse/20 animate-ripple",
              sizeClasses[size]
            )}
            style={{ animationDelay: '0.5s' }}
            key={`pulse-2-${pulseCount}`}
          />
        </>
      )}

      {/* Main avatar core */}
      <div 
        className={cn(
          "relative rounded-full bg-gradient-primary shadow-glow transition-all duration-300",
          isActive && "animate-pulse-glow",
          isSpeaking && "shadow-glow-strong scale-110",
          isListening && "shadow-glow-strong",
          sizeClasses[size]
        )}
      >
        {/* Inner circle with rotating elements */}
        <div className="absolute inset-4 rounded-full bg-ai-core/20 flex items-center justify-center">
          <div 
            className={cn(
              "w-8 h-8 rounded-full bg-ai-core",
              size === "small" && "w-4 h-4",
              isActive && "animate-pulse-glow"
            )}
          />
          
          {/* Animated dots around center */}
          {isActive && (
            <>
              <div 
                className={cn(
                  "absolute w-2 h-2 bg-ai-particle rounded-full",
                  size === "small" && "w-1 h-1"
                )}
                style={{
                  top: '20%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  animation: 'pulse 1s ease-in-out infinite'
                }}
              />
              <div 
                className={cn(
                  "absolute w-2 h-2 bg-ai-particle rounded-full",
                  size === "small" && "w-1 h-1"
                )}
                style={{
                  bottom: '20%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  animation: 'pulse 1s ease-in-out infinite 0.5s'
                }}
              />
              <div 
                className={cn(
                  "absolute w-2 h-2 bg-ai-particle rounded-full",
                  size === "small" && "w-1 h-1"
                )}
                style={{
                  top: '50%',
                  left: '20%',
                  transform: 'translateY(-50%)',
                  animation: 'pulse 1s ease-in-out infinite 0.25s'
                }}
              />
              <div 
                className={cn(
                  "absolute w-2 h-2 bg-ai-particle rounded-full",
                  size === "small" && "w-1 h-1"
                )}
                style={{
                  top: '50%',
                  right: '20%',
                  transform: 'translateY(-50%)',
                  animation: 'pulse 1s ease-in-out infinite 0.75s'
                }}
              />
            </>
          )}
        </div>

        {/* Status indicator */}
        {(isListening || isSpeaking) && (
          <div className="absolute -top-2 -right-2">
            <div 
              className={cn(
                "w-4 h-4 rounded-full",
                isListening && "bg-green-400 animate-pulse",
                isSpeaking && "bg-ai-core animate-pulse-glow"
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
}