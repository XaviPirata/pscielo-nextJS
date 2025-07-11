import { ChevronDown } from "lucide-react";

export default function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center animate-bounce">
      <div className="flex flex-col items-center space-y-1">
        <span className="text-white/60 text-sm font-light hidden md:block">
          Scroll para explorar
        </span>
        <ChevronDown className="w-8 h-8 text-white/80" />
      </div>
    </div>
  );
} 