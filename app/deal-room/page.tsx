"use client";

import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Send,
  FileText,
  Sparkles,
  Users,
  Paperclip,
  Mic,
  MoreVertical,
  MessageCircle,
  Clock,
  CheckCheck,
} from "lucide-react";
import { useState } from "react";

// Sample message data
const initialMessages = [
  {
    id: "1",
    sender: "You",
    content: "Hey everyone, let's review the contract terms.",
    timestamp: "10:32 AM",
    isOwn: true,
    status: "read",
  },
  {
    id: "2",
    sender: "Sarah Chen",
    content: "I've reviewed the draft. The payment terms look good.",
    timestamp: "10:35 AM",
    isOwn: false,
    status: "delivered",
    avatar: "SC",
  },
  {
    id: "3",
    sender: "Mike Johnson",
    content: "Can we add a clause about intellectual property?",
    timestamp: "10:38 AM",
    isOwn: false,
    status: "delivered",
    avatar: "MJ",
  },
  {
    id: "4",
    sender: "You",
    content: "Good point. I'll add that to the AI generator now.",
    timestamp: "10:42 AM",
    isOwn: true,
    status: "read",
  },
];

export default function DealRoom() {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isAIGenerating, setIsAIGenerating] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now().toString(),
      sender: "You",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isOwn: true,
      status: "sent",
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const handleAIGenerate = () => {
    setIsAIGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      const aiMessage = {
        id: Date.now().toString(),
        sender: "AI Assistant",
        content:
          "I've generated a draft contract with the IP clause included. Review it in the panel on the right.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isOwn: false,
        status: "delivered",
        isAI: true,
        avatar: "AI",
      };
      setMessages([...messages, aiMessage]);
      setIsAIGenerating(false);
    }, 1500);
  };

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
              <h2 className="font-semibold">Deal Room: Alpha Corp</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>2 participants</span>
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
        <MessageScrollerProvider autoScroll>
          <MessageScroller className="flex-1">
            <MessageScrollerViewport>
              <MessageScrollerContent className="space-y-4 p-6">
                {messages.map((message) => (
                  <MessageScrollerItem
                    key={message.id}
                    messageId={message.id}
                    className={cn(
                      "flex gap-3",
                      message.isOwn ? "justify-end" : "justify-start",
                    )}
                  >
                    {!message.isOwn && (
                      <div
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium text-white",
                          message.isOwn
                            ? "bg-linear-to-br from-secondary to-accent"
                            : "bg-primary",
                        )}
                      >
                        {message.avatar || message.sender.charAt(0)}
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[70%] rounded-2xl px-4 py-4",
                        message.isOwn
                          ? "bg-linear-to-br from-secondary/10 to-accent/10 border border-secondary/20 text-text"
                          : message.isOwn
                            ? "bg-linear-to-br from-secondary/10 to-accent/10 border border-secondary/20"
                            : "bg-primary/30",
                      )}
                    >
                      {!message.isOwn && (
                        <p className="mb-1 text-xs font-medium text-muted-foreground">
                          {message.sender}
                          {message.isOwn && (
                            <Badge
                              variant="outline"
                              className="ml-2 border-secondary/30 bg-secondary/10 text-secondary text-[10px]"
                            >
                              <Sparkles className="mr-1 h-2.5 w-2.5" />
                              AI
                            </Badge>
                          )}
                        </p>
                      )}
                      <p className="text-sm leading-relaxed">
                        {message.content}
                      </p>
                      <div
                        className={cn(
                          "mt-1 flex items-center gap-1 text-[10px]",
                          message.isOwn ? "text-primary" : "text-text",
                        )}
                      >
                        <span>{message.timestamp}</span>
                        {message.isOwn && (
                          <>
                            <span>•</span>
                            {message.status === "read" ? (
                              <CheckCheck className="h-3 w-3" />
                            ) : message.status === "delivered" ? (
                              <CheckCheck className="h-3 w-3 opacity-70" />
                            ) : (
                              <Clock className="h-3 w-3" />
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </MessageScrollerItem>
                ))}
                {isAIGenerating && (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-purple-500 to-pink-500 text-xs font-medium text-white">
                      AI
                    </div>
                    <div className="flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 delay-100" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 delay-200" />
                    </div>
                  </div>
                )}
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </MessageScrollerProvider>

        {/* Message Input */}
        <div className="border-t bg-card/50 p-4">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <div className="flex flex-1 items-center gap-2 rounded-lg border bg-background px-3 focus-within:ring-2 focus-within:ring-primary/20">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0 text-muted-foreground"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="border-0 bg-transparent px-0 py-2 shadow-none focus-visible:ring-0"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0 text-muted-foreground"
              >
                <Mic className="h-4 w-4" />
              </Button>
            </div>
            <Button type="submit" size="icon" className="shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>

      {/* AI Contract Generator Panel */}
      <div className="flex w-96 flex-col bg-background/30 py-6">
        <div className="flex items-center gap-2 border-b border-primary/40 backdrop-blur-2xl shadow-xl pb-3 px-6">
          <div className="rounded-lg bg-linear-to-br from-primary to-secondary p-2">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <div className="flex items-center p-1">
            <h1 className="text-primary font-bold text-2xl tracking-tight">
              Guarantor
            </h1>
          </div>
        </div>

        <div className="mt-4 flex-1 space-y-4 px-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Current Draft</CardTitle>
              <CardDescription className="text-xs">
                Last updated 2 min ago
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 rounded-lg bg-background/50 p-3 text-sm">
                <p className="text-text">
                  <span className="font-medium text-text">Clause 4.2</span> -
                  Intellectual Property
                </p>
                <p className="text-xs text-text/70">
                  All intellectual property rights shall remain with the
                  originating party unless otherwise agreed...
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 flex flex-col items-center justify-center">
              <Button
                onClick={handleAIGenerate}
                disabled={isAIGenerating}
                className="w-[85%] mr-auto gap-2 bg-linear-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80"
              >
                <Sparkles className="h-4 w-4" />
                {isAIGenerating ? "Generating..." : "Generate Contract"}
              </Button>
              <Button variant="outline" className="w-[85%] mr-auto gap-2">
                <FileText className="h-4 w-4" />
                Head to Contract Page
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Utility function for className merging
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}
