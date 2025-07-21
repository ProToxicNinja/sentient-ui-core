import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CogMachineOrbProps {
  status: "idle" | "listening" | "thinking" | "speaking";
  size?: "small" | "medium" | "large";
  className?: string;
}

export function CogMachineOrb({ status, size = "large", className }: CogMachineOrbProps) {
  const [jitterOffset, setJitterOffset] = useState({ x: 0, y: 0 });

  // Random micro-jitters every 1-2 seconds when idle
  useEffect(() => {
    if (status !== "idle") return;
    
    const jitterInterval = setInterval(() => {
      setJitterOffset({
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2
      });
      
      setTimeout(() => {
        setJitterOffset({ x: 0, y: 0 });
      }, 200);
    }, Math.random() * 1000 + 1000);

    return () => clearInterval(jitterInterval);
  }, [status]);

  const sizeConfig = {
    small: { width: 120, height: 120, stroke: 1.5 },
    medium: { width: 200, height: 200, stroke: 2 },
    large: { width: 300, height: 300, stroke: 2.5 }
  };

  const config = sizeConfig[size];
  const center = config.width / 2;

  // Animation states
  const isListening = status === "listening";
  const isThinking = status === "thinking";
  const isSpeaking = status === "speaking";

  return (
    <div 
      className={cn("relative flex items-center justify-center", className)}
      style={{
        transform: `translate(${jitterOffset.x}px, ${jitterOffset.y}px)`,
        transition: "transform 0.2s ease-out"
      }}
    >
      {/* Listening Halo */}
      {isListening && (
        <div 
          className="absolute rounded-full border-2 border-[#FFD200]/60 animate-pulse"
          style={{
            width: config.width + 20,
            height: config.height + 20,
            animation: "listening-halo 1s ease-in-out infinite"
          }}
        />
      )}

      {/* Main SVG Orb */}
      <svg 
        width={config.width} 
        height={config.height} 
        viewBox={`0 0 ${config.width} ${config.height}`}
        className={cn(
          "relative z-10",
          isThinking && "animate-breathe"
        )}
      >
        {/* Gradient Definitions */}
        <defs>
          <radialGradient id="goldGradient" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FFA500" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FF8C00" stopOpacity="0.4" />
          </radialGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="innerGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Outer Ring - Slow rotation */}
        <g 
          style={{
            transformOrigin: `${center}px ${center}px`,
            animation: "rotate-clockwise 60s linear infinite"
          }}
        >
          {/* Outer gear teeth */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 15) * Math.PI / 180;
            const x1 = center + Math.cos(angle) * (center - 15);
            const y1 = center + Math.sin(angle) * (center - 15);
            const x2 = center + Math.cos(angle) * (center - 5);
            const y2 = center + Math.sin(angle) * (center - 5);
            
            return (
              <line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#FFD200"
                strokeWidth={config.stroke}
                opacity="0.7"
                filter="url(#glow)"
              />
            );
          })}
          
          {/* Outer ring circle */}
          <circle
            cx={center}
            cy={center}
            r={center - 20}
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth={config.stroke}
            opacity="0.8"
            filter="url(#glow)"
          />
        </g>

        {/* Middle Ring - Counter rotation */}
        <g 
          style={{
            transformOrigin: `${center}px ${center}px`,
            animation: "rotate-counter-clockwise 40s linear infinite"
          }}
        >
          {/* Middle geometric patterns */}
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * 22.5) * Math.PI / 180;
            const radius = center - 40;
            const x = center + Math.cos(angle) * radius;
            const y = center + Math.sin(angle) * radius;
            
            return (
              <g key={i}>
                <circle
                  cx={x}
                  cy={y}
                  r="3"
                  fill="#FFD200"
                  opacity="0.8"
                  filter="url(#innerGlow)"
                />
                {/* Connecting lines */}
                <line
                  x1={center + Math.cos(angle) * (radius - 15)}
                  y1={center + Math.sin(angle) * (radius - 15)}
                  x2={x}
                  y2={y}
                  stroke="#FFA500"
                  strokeWidth="1"
                  opacity="0.6"
                />
              </g>
            );
          })}
          
          <circle
            cx={center}
            cy={center}
            r={center - 40}
            fill="none"
            stroke="#FFA500"
            strokeWidth={config.stroke - 0.5}
            opacity="0.6"
            strokeDasharray="5,5"
          />
        </g>

        {/* Inner Ring - Fast rotation */}
        <g 
          style={{
            transformOrigin: `${center}px ${center}px`,
            animation: "rotate-clockwise 30s linear infinite"
          }}
        >
          {/* Inner complex geometry */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30) * Math.PI / 180;
            const radius = center - 70;
            
            return (
              <g key={i}>
                {/* Triangular segments */}
                <path
                  d={`M ${center} ${center} 
                      L ${center + Math.cos(angle) * radius} ${center + Math.sin(angle) * radius}
                      L ${center + Math.cos(angle + 0.3) * radius} ${center + Math.sin(angle + 0.3) * radius}
                      Z`}
                  fill="#FFD700"
                  opacity="0.3"
                  filter="url(#innerGlow)"
                />
                
                {/* Radial lines */}
                <line
                  x1={center + Math.cos(angle) * 20}
                  y1={center + Math.sin(angle) * 20}
                  x2={center + Math.cos(angle) * radius}
                  y2={center + Math.sin(angle) * radius}
                  stroke="#FFD200"
                  strokeWidth="1"
                  opacity="0.8"
                />
              </g>
            );
          })}
        </g>

        {/* Central Core */}
        <circle
          cx={center}
          cy={center}
          r="20"
          fill="url(#goldGradient)"
          filter="url(#glow)"
          className={cn(
            isSpeaking && "animate-pulse"
          )}
        />
        
        {/* Central pulse dot */}
        <circle
          cx={center}
          cy={center}
          r="8"
          fill="#FFD700"
          opacity="0.9"
          className={cn(
            status !== "idle" && "animate-pulse"
          )}
        />

        {/* Speaking ripples */}
        {isSpeaking && (
          <>
            <circle
              cx={center}
              cy={center}
              r="25"
              fill="none"
              stroke="#FFD200"
              strokeWidth="2"
              opacity="0.8"
              className="animate-ripple-1"
            />
            <circle
              cx={center}
              cy={center}
              r="35"
              fill="none"
              stroke="#FFD200"
              strokeWidth="1"
              opacity="0.6"
              className="animate-ripple-2"
            />
            <circle
              cx={center}
              cy={center}
              r="45"
              fill="none"
              stroke="#FFD200"
              strokeWidth="1"
              opacity="0.4"
              className="animate-ripple-3"
            />
          </>
        )}
      </svg>

      {/* Status indicator */}
      <div className="absolute -top-4 -right-4 z-20">
        <div className={cn(
          "w-4 h-4 rounded-full border-2 border-background",
          status === "idle" && "bg-gray-400",
          status === "listening" && "bg-green-400 animate-pulse",
          status === "thinking" && "bg-yellow-400 animate-pulse",
          status === "speaking" && "bg-[#FFD200] animate-pulse"
        )} />
      </div>
    </div>
  );
}