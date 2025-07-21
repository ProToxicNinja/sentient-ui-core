import { useState } from "react";
import { Plus, History, Settings, HelpCircle, ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface LeftSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface ChatSession {
  id: string;
  title: string;
  timestamp: string;
}

const mockSessions: ChatSession[] = [
  { id: "1", title: "API Integration Help", timestamp: "2 hours ago" },
  { id: "2", title: "Database Design", timestamp: "1 day ago" },
  { id: "3", title: "React Components", timestamp: "3 days ago" },
];

export function LeftSidebar({ isOpen, onToggle }: LeftSidebarProps) {
  const [activeSection, setActiveSection] = useState<string>("chat");
  const [searchQuery, setSearchQuery] = useState("");

  const sidebarWidth = isOpen ? "w-[280px]" : "w-[60px]";

  const menuItems = [
    { id: "chat", icon: Plus, label: "New Chat", shortcut: "Ctrl+N" },
    { id: "history", icon: History, label: "History", shortcut: "Ctrl+H" },
    { id: "settings", icon: Settings, label: "Settings" },
    { id: "help", icon: HelpCircle, label: "Help" },
  ];

  const filteredSessions = mockSessions.filter(session =>
    session.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className={cn(
      "bg-[#14161B] border-r border-border/20 transition-all duration-200 flex flex-col h-full",
      sidebarWidth
    )}>
      {/* Toggle Button */}
      <div className="p-3 border-b border-border/20">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="w-full justify-start text-muted-foreground hover:text-[#FFD200]"
        >
          <ChevronRight className={cn(
            "w-4 h-4 transition-transform",
            isOpen && "rotate-180"
          )} />
          {isOpen && <span className="ml-2">Collapse</span>}
        </Button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            size="sm"
            onClick={() => setActiveSection(item.id)}
            className={cn(
              "w-full justify-start mb-1 transition-all",
              activeSection === item.id 
                ? "bg-[#FFD200]/20 text-[#FFD200]" 
                : "text-muted-foreground hover:text-[#FFD200] hover:bg-[#FFD200]/10",
              !isOpen && "justify-center"
            )}
            title={isOpen ? undefined : item.label}
          >
            <item.icon className="w-4 h-4" />
            {isOpen && (
              <>
                <span className="ml-3 flex-1">{item.label}</span>
                {item.shortcut && (
                  <span className="text-xs opacity-60">{item.shortcut}</span>
                )}
              </>
            )}
          </Button>
        ))}
      </nav>

      {/* Expanded Content */}
      {isOpen && (
        <div className="flex-1 p-3 border-t border-border/20">
          {activeSection === "chat" && (
            <div className="space-y-3">
              <Button className="w-full bg-[#FFD200] text-black hover:bg-[#FFD200]/90">
                <Plus className="w-4 h-4 mr-2" />
                Start New Chat
              </Button>
            </div>
          )}

          {activeSection === "history" && (
            <div className="space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-background/50"
                />
              </div>
              
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {filteredSessions.map((session) => (
                  <div
                    key={session.id}
                    className="p-2 rounded-lg bg-background/30 hover:bg-background/50 cursor-pointer transition-colors"
                  >
                    <div className="text-sm font-medium text-foreground truncate">
                      {session.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {session.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "settings" && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Theme</label>
                <select className="w-full mt-1 p-2 bg-background border border-border rounded-md text-sm">
                  <option>Dark</option>
                  <option>Light</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Model</label>
                <select className="w-full mt-1 p-2 bg-background border border-border rounded-md text-sm">
                  <option>GPT-4</option>
                  <option>Claude</option>
                  <option>Gemini</option>
                </select>
              </div>
            </div>
          )}

          {activeSection === "help" && (
            <div className="space-y-3">
              <Button variant="ghost" className="w-full justify-start text-sm">
                📚 Documentation
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                ⌨️ Keyboard Shortcuts
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                💬 Support
              </Button>
            </div>
          )}
        </div>
      )}
    </aside>
  );
}