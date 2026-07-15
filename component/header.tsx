import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Plus, Search, Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between w-full bg-background/70 backdrop-blur-md px-8 py-3 mb-4 border-b border-primary/20 shadow-sm rounded-round">
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 bg-linear-to-br from-primary to-secondary rounded-full flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-primary font-bold text-2xl tracking-tight">
          Guarantor
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text/40" />
          <input
            type="text"
            placeholder="Search deals..."
            className="pl-9 pr-4 py-2 bg-background/50 rounded-full text-sm border border-primary/10 focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/5 w-64 transition-all"
          />
        </div>

        <Button className="bg-linear-to-r from-primary/25 to-primary/50 hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 gap-2">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Initiate a Deal</span>
        </Button>

        <div className="relative">
          <Bell className="text-text/60 hover:text-primary transition-colors cursor-pointer w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-error text-white text-[10px] rounded-full flex items-center justify-center">
            3
          </span>
        </div>

        <Avatar className="ring-2 ring-primary/20 ring-offset-2 ring-offset-background hover:ring-primary/40 transition-all cursor-pointer">
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            className="grayscale"
          />
          <AvatarFallback className="bg-primary/10 text-primary">
            CN
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
