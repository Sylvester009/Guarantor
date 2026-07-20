"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell, Plus, Search, Sparkles } from "lucide-react";

import { useState } from "react";
import DealModal from "./deal-modal";
import { usePathname, useRouter } from "next/navigation";
import { UserProps } from "@/data/user";
import { dealsInviteResponse, getDealsInvite } from "@/services/deal";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Deal } from "@/data/deals";
import { toast } from "sonner";

export default function Header({ user }: UserProps) {
  const pathname = usePathname();
  const router = useRouter();
  const dealInvites = user ? getDealsInvite(user?.email) : [];

  const [isDealModalOpen, setIsDealModalOpen] = useState(false);

  const handleAccept = () => {
    dealsInviteResponse(user?.email || "", user?.id || "", "Accepted");
    toast.success("Deal accepted successfully!");
  };

  const handleDecline = () => {
    dealsInviteResponse(user?.email || "", "", "Declined");

    toast.success("Deal declined successfully!");
  };

  return (
    <>
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
          {pathname === "/" && (
            <>
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text/40" />
                <input
                  type="text"
                  placeholder="Search deals..."
                  className="pl-9 pr-4 py-2 bg-background/50 rounded-full text-sm border border-primary/10 focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/5 w-64 transition-all"
                />
              </div>

              <Button
                onClick={() => setIsDealModalOpen(true)}
                className="bg-linear-to-r from-primary/25 to-primary/50 hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 gap-2"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Initiate a Deal</span>
              </Button>

              <Popover>
                <PopoverTrigger
                  render={
                    <button type="button" className="relative cursor-pointer">
                      <Bell className="text-text/60 hover:text-primary transition-colors cursor-pointer w-5 h-5" />
                      {dealInvites.length > 0 && (
                        <span className="absolute -top-2 -right-1 min-w-4 h-4 px-1 bg-error text-white text-[10px] rounded-full flex items-center justify-center">
                          {dealInvites.length}
                        </span>
                      )}
                    </button>
                  }
                />
                <PopoverContent
                  align="end"
                  className="w-100 mt-6 bg-background border border-primary/90 shadow-md p-0"
                >
                  <div className="max-h-96 overflow-y-auto">
                    {dealInvites.length === 0 ? (
                      <div className="flex items-center justify-center py-10">
                        <p className="text-text font-semibold">
                          No Notifications...
                        </p>
                      </div>
                    ) : (
                      dealInvites.map((invite: Deal) => (
                        <div
                          key={invite.id}
                          className="p-4 border-b border-border hover:bg-primary/5 transition"
                        >
                          <div className="flex gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <Bell className="w-4 h-4 text-primary" />
                            </div>

                            <div className="flex-1">
                              <p className="text-sm">
                                <span className="font-semibold text-primary">
                                  {invite.creator}
                                </span>{" "}
                                invited you to collaborate on a deal.
                              </p>

                              <h4 className="font-semibold mt-1">
                                {invite.title}
                              </h4>

                              <p className="text-xs text-text/70 mt-1 line-clamp-2">
                                {invite.description}
                              </p>

                              {/* Action Buttons */}
                              <div className="flex gap-2 mt-4">
                                <button
                                  onClick={() => handleAccept()}
                                  className="flex-1 bg-primary text-white text-sm py-2 rounded-md hover:bg-primary/90 transition"
                                >
                                  Accept
                                </button>

                                <button
                                  onClick={() => handleDecline()}
                                  className="flex-1 border border-error text-error text-sm py-2 rounded-md hover:bg-error hover:text-white transition"
                                >
                                  Decline
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </>
          )}

          <Avatar
            onClick={() => router.push("/login")}
            className="ring-2 ring-primary/20 ring-offset-2 ring-offset-background hover:ring-primary/40 transition-all cursor-pointer"
          >
            <AvatarFallback className="bg-primary/10 text-primary">
              {user?.firstName?.charAt(0)?.toUpperCase() ?? "G"}
              {""}
              {user?.lastName?.charAt(0)?.toUpperCase() ?? "U"}
            </AvatarFallback>
          </Avatar>
        </div>
      </header>
      <DealModal open={isDealModalOpen} onOpenChange={setIsDealModalOpen} />
    </>
  );
}
