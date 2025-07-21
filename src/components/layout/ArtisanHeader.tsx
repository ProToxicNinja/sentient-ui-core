import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ArtisanHeaderProps {
  onDevOpsToggle: () => void;
  isDevOpsOpen: boolean;
}

export function ArtisanHeader({ onDevOpsToggle, isDevOpsOpen }: ArtisanHeaderProps) {
  return (
    <header className="h-[60px] bg-[#0F1116] border-b border-border/20 shadow-lg flex items-center justify-between px-6 z-50">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-[#FFD200] tracking-wider">
          ARTISAN
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onDevOpsToggle}
          className={`
            p-2 transition-all duration-200
            ${isDevOpsOpen 
              ? 'bg-[#FFD200]/20 text-[#FFD200]' 
              : 'text-muted-foreground hover:text-[#FFD200] hover:bg-[#FFD200]/10'
            }
          `}
          title="Toggle DevOps Panel (Ctrl+D)"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}