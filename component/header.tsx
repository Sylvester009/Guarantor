"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Bell,
  Calendar,
  Mail,
  Plus,
  Search,
  Sparkles,
  UserPlus,
  Users,
} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getUser } from "@/services/user";

export default function Header() {
  const user = getUser();
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

        <Dialog>
          <form>
            <DialogTrigger
              render={
                <Button className="bg-linear-to-r from-primary/25 to-primary/50 hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 gap-2">
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Initiate a Deal</span>
                </Button>
              }
            />
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  Initiate a Deal
                </DialogTitle>
                <DialogDescription>
                  Create a new deal and invite participants to collaborate.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-5 py-4">
                <FieldGroup className="gap-4">
                  <Field>
                    <FieldLabel htmlFor="title" className="text-sm font-medium">
                      Deal Title <span className="text-error">*</span>
                    </FieldLabel>
                    <Input
                      id="title"
                      type="text"
                      placeholder="Enter deal title..."
                      className="h-11 text-text"
                    />
                  </Field>
                  <Field>
                    <FieldLabel
                      htmlFor="description"
                      className="text-sm font-medium"
                    >
                      Description <span className="text-error">*</span>
                    </FieldLabel>
                    <Textarea
                      id="description"
                      placeholder="Describe the deal, its objectives, and key terms..."
                      rows={4}
                      className="resize-none"
                    />
                  </Field>
                  <Field>
                    <FieldLabel
                      htmlFor="deadline"
                      className="text-sm font-medium"
                    >
                      Deadline <span className="text-error">*</span>
                    </FieldLabel>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text/50" />
                      <Input
                        id="deadline"
                        type="date"
                        className="h-11 pl-9 text-text"
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <FieldDescription className="text-xs text-muted-foreground/70">
                      Set a realistic deadline for this deal.
                    </FieldDescription>
                  </Field>

                  <div className="space-y-3">
                    <FieldLabel className="text-sm font-medium">
                      Invite Participants <span className="text-error">*</span>
                    </FieldLabel>

                    <div className="flex flex-col gap-2 sm:flex-row">
                      <div className="flex-1 space-y-2 sm:space-y-0 sm:flex sm:gap-2">
                        <Input
                          type="email"
                          placeholder="Email *"
                          className="h-11 sm:flex-1"
                        />
                      </div>
                      <Select value="">
                        <SelectTrigger className="h-11 px-2 py-5 sm:w-[140px]">
                          <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="counterparty">
                            Counterparty
                          </SelectItem>
                          <SelectItem value="observer">Observer</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        type="button"
                        variant="outline"
                        className="h-11 gap-2 shrink-0"
                      >
                        <UserPlus className="h-4 w-4" />
                        Add
                      </Button>
                    </div>
                  </div>
                </FieldGroup>
              </div>
              <DialogFooter className="gap-2">
                <DialogClose
                  render={
                    <Button variant="outline" className="w-full md:w-25">
                      Cancel
                    </Button>
                  }
                />
                <Button
                  type="button"
                  className=" text-text gap-2 bg-linear-to-r from-primary/10 to-primary/40 shadow-md shadow-primary/20"
                >
                  <>
                    Create Deal
                    <Mail className="h-4 w-4" />
                  </>
                </Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>

        <div className="relative">
          <Bell className="text-text/60 hover:text-primary transition-colors cursor-pointer w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-error text-white text-[10px] rounded-full flex items-center justify-center">
            3
          </span>
        </div>

        <Avatar className="ring-2 ring-primary/20 ring-offset-2 ring-offset-background hover:ring-primary/40 transition-all cursor-pointer">
          <AvatarFallback className="bg-primary/10 text-primary">
            {user?.firstName?.charAt(0)?.toUpperCase() ?? "U"}
            {""}
            {user?.lastName?.charAt(0)?.toUpperCase() ?? "S"}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
