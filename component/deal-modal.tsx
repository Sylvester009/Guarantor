"use client";

import { Button } from "@/components/ui/button";
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
import { createDeal } from "@/services/deal";
import { getUser } from "@/services/user";

import { Calendar, Mail, Plus, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface DealFormData {
  title: string;
  userId: string;
  creator: string;
  description: string;
  deadline: string;
  participant: string;
}

interface DealModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DealModal({
  open,
  onOpenChange,
}: DealModalProps) {
  const user = getUser();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<DealFormData>({
    title: "",
    userId: "",
    creator: "",
    description: "",
    deadline: "",
    participant: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const addParticipant = () => {
    if (!formData.participant.trim()) {
      toast.error("Please enter an email address");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.participant)) {
      toast.warning("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleDeal = () => {
    if (!formData.title.trim()) {
      toast.error("Deal title is required");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Deal description is required");
      return;
    }

    if (!formData.deadline) {
      toast.error("Please set a deadline");
      return;
    }

    if (!addParticipant()) {
      return;
    }

    if (!user) {
      toast.error("You must be logged in to create a deal");
      return;
    }

    let userName = `${user.firstName} ${user.lastName}`;

    setIsLoading(true);

    const result = createDeal({
      title: formData.title,
      userId: user.id,
      creator: userName,
      description: formData.description,
      deadline: formData.deadline,
      counterparty: formData.participant,
    });

    if (!result.success) {
      toast.error(result.message, {
        position: "top-center",
      });

      return;
    } else {
      toast.success(result.message, {
        position: "top-center",
      });

      setIsLoading(false);

      setFormData({
        title: "",
        userId: "",
        creator: "",
        description: "",
        deadline: "",
        participant: "",
      });

      setTimeout(() => {
        setIsLoading(false);
        onOpenChange(false);
        // Refresh page or update deal list
        router.refresh();
      }, 1500);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form>
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
                  value={formData.title}
                  onChange={handleChange}
                  disabled={isLoading}
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
                  value={formData.description}
                  onChange={handleChange}
                  disabled={isLoading}
                  rows={4}
                  className="resize-none"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="deadline" className="text-sm font-medium">
                  Deadline <span className="text-error">*</span>
                </FieldLabel>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text/50" />
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="h-11 pl-9 text-text"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <FieldDescription className="text-xs text-muted-foreground/70">
                  Set a realistic deadline for this deal.
                </FieldDescription>
              </Field>

              <Field className="space-y-3">
                <FieldLabel className="text-sm font-medium">
                  Invite Participant <span className="text-error">*</span>
                </FieldLabel>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <div className="flex-1 space-y-2 sm:space-y-0 sm:flex sm:gap-2">
                    <Input
                      id="participant"
                      type="email"
                      placeholder="Email *"
                      value={formData.participant}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="h-11 sm:flex-1"
                    />
                  </div>
                </div>
              </Field>
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
              onClick={handleDeal}
              className=" text-text gap-2 bg-linear-to-r from-primary/10 to-primary/40 shadow-md shadow-primary/20"
            >
              {isLoading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Creating...
                </>
              ) : (
                <>
                  Create Deal
                  <Mail className="h-4 w-4" />
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
