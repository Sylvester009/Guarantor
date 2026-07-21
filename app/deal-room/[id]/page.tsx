"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Send,
  FileText,
  Sparkles,
  Users,
  Paperclip,
  Mic,
  MoreVertical,
  ArrowRight,
  Loader2,
  Zap,
  ChevronRight,
  Badge,
  Clock,
  CheckCircle,
  PenTool,
  Layers,
} from "lucide-react";
import { use, useState } from "react";
import { getUserDeals } from "@/services/deal";
import { Deal } from "@/data/deals";
import { getUser } from "@/services/user";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { messages } from "@/data/messages";

export default function DealRoom({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const user = getUser();

  if (!user) {
    router.push("/login");
    return null;
  }

  const deals = getUserDeals(user.id);

  const contract = deals.find((deal: Deal) => deal.id === id);

  const handleSendMessage = (e: React.FormEvent) => {};

  const handleAIGenerate = () => {};

  return (
    <div className="flex h-screen bg-background">
      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col border-r">
        {/* Chat Header */}
        <div className="flex items-center justify-between border-b border-primary backdrop-blur-2xl shadow-xl bg-background/50 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-primary to-secondary">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold">{contract?.title}</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{contract?.participants} participants</span>
                <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  Active
                </span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>

        {/* Messages */}

        <div className="flex flex-col gap-3 overflow-y-auto p-6">
          {messages.map((message) => {
            const isOwn = message.senderId === "current-user";

            return (
              <div
                key={message.id}
                className={`
          border-2 rounded-lg p-3 my-2.5 overflow-hidden
          ${
            isOwn
              ? "border-primary/30 bg-primary/20"
              : "border-primary/30 bg-primary/10"
          }
          ${isOwn ? "ml-auto" : ""}
          max-w-[70%]
        `}
                style={{
                  // Clear floats
                  clear: "both",
                }}
              >
                {/* Avatar - floated left or right */}
                <Avatar
                  className={`
            flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-medium
            ${isOwn ? "float-right ml-5 mr-0" : "float-left mr-5"}
          `}
                >
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {user?.firstName?.charAt(0)?.toUpperCase() ?? "G"}
                    {user?.lastName?.charAt(0)?.toUpperCase() ?? "U"}
                  </AvatarFallback>
                </Avatar>

                {/* Message Content */}
                <div className="overflow-hidden">
                  <p className="text-sm text-text">{message.content}</p>
                  <span
                    className={`
            text-xs
            ${isOwn ? "text-text float-right" : "text-text/40 float-left"}
          `}
                  >
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        {/* Message Input */}
        <div className="border-t border-primary/10 bg-card/50 p-4 pb-0">
          <form
            onSubmit={handleSendMessage}
            className="flex gap-3 items-center mt-4"
          >
            <div className="relative flex-1">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50">
                <Paperclip className="h-4 w-4" />
              </div>

              <Input
                placeholder="Write a message..."
                className="w-full rounded-full border border-primary/10 bg-background/50 pl-10 pr-4 py-6 text-sm shadow-sm focus:border-primary/30 focus:ring-2 focus:ring-primary/20 focus:bg-background transition-all duration-200"
              />
            </div>

            <Button
              type="submit"
              size="icon"
              className="
        rounded-full transition-all duration-300 bg-linear-to-br from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/30 h-11 w-11 shrink-0"
            >
              <Send className="h-4 w-4 transition-all duration-300 rotate-12" />
            </Button>
          </form>
        </div>
      </div>

      {/* AI Contract Generator Panel */}
      <div className="flex w-96 flex-col bg-linear-to-b from-background/90 to-background/50 backdrop-blur-sm border-r border-primary/10 shadow-xl">
        <div className="flex items-center gap-3 border-b border-primary/10 px-6 py-5 bg-linear-to-r from-primary/5 via-transparent to-transparent">
          <div className="relative">
            <div className="absolute inset-0 rounded-xl bg-linear-to-br from-primary to-secondary blur-md opacity-20" />
            <div className="relative rounded-xl bg-linear-to-br from-primary to-secondary p-2.5 shadow-lg shadow-primary/20">
              <FileText className="h-5 w-5 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              Guarantor
            </h1>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              <p className="text-[10px] text-muted-foreground/60 font-medium tracking-wider uppercase">
                Active Draft • v2.4
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          <div className="group rounded-xl border border-primary/10 bg-linear-to-br from-background/80 to-background/40 backdrop-blur-sm p-4 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Current Draft
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="text-[10px] border-primary/20 bg-primary/5 px-2 py-0 h-5">
                  v2.4
                </Badge>
                <span className="text-[10px] text-muted-foreground/40 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  2m ago
                </span>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-start justify-between group-hover:text-primary transition-colors cursor-pointer">
                <p className="text-sm font-semibold text-foreground/90 group-hover:text-primary transition-colors">
                  Clause 4.2 - Intellectual Property
                </p>
                <ChevronRight className="h-4 w-4 text-muted-foreground/20 group-hover:text-primary/50 transition-all group-hover:translate-x-0.5" />
              </div>

              <p className="text-xs text-muted-foreground/60 leading-relaxed line-clamp-2">
                All intellectual property rights shall remain with the
                originating party unless otherwise agreed...
              </p>

              <div className="flex items-center gap-3 pt-2 border-t border-primary/5">
                <span className="text-[10px] text-muted-foreground/40 flex items-center gap-1.5">
                  <FileText className="h-3 w-3" />
                  124 words
                </span>
                <span className="text-[10px] text-muted-foreground/40 flex items-center gap-1.5">
                  <Layers className="h-3 w-3" />3 sections
                </span>
                <span className="text-[10px] text-muted-foreground/40 flex items-center gap-1.5 ml-auto">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/30" />
                  Draft
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-primary/10 bg-linear-to-br from-background/80 to-background/40 backdrop-blur-sm p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Quick Actions
              </h3>
            </div>

            <div className="space-y-2.5">
              <Button
                onClick={handleAIGenerate}
                disabled={false}
                className="w-full gap-2 bg-linear-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 group relative overflow-hidden h-10"
              >
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                {false ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                    Generate Contract
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                className=" flex items-center w-full gap-2 border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all duration-300 group h-10"
              >
                <FileText className="h-4 w-4 group-hover:text-primary transition-colors" />
                Head to Contract Page
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {[
              { label: "Total", value: "12", icon: FileText },
              { label: "Active", value: "8", icon: CheckCircle },
              { label: "Draft", value: "4", icon: PenTool },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="rounded-xl border border-primary/5 bg-linear-to-br from-background/80 to-background/40 backdrop-blur-sm p-3 text-center hover:border-primary/15 hover:shadow-md transition-all duration-200 group"
                >
                  <Icon className="h-3.5 w-3.5 text-muted-foreground/30 mx-auto mb-1 group-hover:text-primary/50 transition-colors" />
                  <p
                    className={`text-base font-bold ${
                      stat.label === "Active"
                        ? "text-green-600"
                        : stat.label === "Draft"
                          ? "text-amber-600"
                          : "text-foreground"
                    }`}
                  >
                    {stat.value}
                  </p>
                  <p className="text-[10px] text-muted-foreground/40">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
