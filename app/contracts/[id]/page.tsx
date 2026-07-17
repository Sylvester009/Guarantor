import { deals } from "@/data/deals";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  FileText,
  Download,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Building2,
  User,
  Shield,
  Sparkles,
  Users,
  Edit,
  Eye,
  Printer,
  Share2,
} from "lucide-react";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function ContractPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const contract = deals.find((deal) => deal.id === id);

  if (!contract) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <AlertCircle className="h-12 w-12 text-muted-foreground" />
        <h2 className="text-2xl font-semibold">Contract not found</h2>
        <p className="text-muted-foreground">
          The contract you're looking for doesn't exist or has been removed.
        </p>
        <Button variant="outline">
          <Link href="/dashboard">Return to Dashboard</Link>
        </Button>
      </div>
    );
  }

  // Format dates
  const createdAt = contract.createdAt
    ? format(new Date(contract.createdAt), "MMM d, yyyy")
    : "N/A";
  const deadline = contract.deadline
    ? format(new Date(contract.deadline), "MMM d, yyyy")
    : "No deadline";
  const isOverdue = contract.deadline
    ? new Date(contract.deadline) < new Date()
    : false;

  // Status badge configuration
  const statusConfig = {
    active: {
      label: "Active",
      color: "bg-secondary/10 text-secondary border-secondary/20",
    },
    pending: {
      label: "Pending",
      color: "bg-accent/10 text-accent border-accent/20",
    },
    completed: {
      label: "Completed",
      color: "bg-primary/10 text-primary border-primary/20",
    },
    draft: {
      label: "Draft",
      color: "bg-muted text-muted-foreground border-muted-foreground/20",
    },
    expired: {
      label: "Expired",
      color: "bg-error/10 text-error border-error/20",
    },
  };

  const status = contract.status?.toLowerCase() as keyof typeof statusConfig;
  const statusInfo = statusConfig[status] || statusConfig.draft;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between w-full bg-background/70 backdrop-blur-md px-8 py-3 border-b border-primary/20 shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-linear-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-primary font-bold text-2xl tracking-tight">
            Guarantor
          </h1>
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
      </header>

      <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
        {/* Contract Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl font-bold tracking-tight">
                  {contract.title}
                </h1>
                <Badge
                  className={cn(
                    "px-3 py-1 text-sm font-medium",
                    statusInfo.color,
                  )}
                >
                  {statusInfo.label}
                </Badge>
              </div>
              <p className="text-text leading-relaxed max-w-2xl py-2">
                {contract.description || "No description provided."}
              </p>
            </div>
            <Button className="flex gap-2 py-4 bg-linear-to-r from-primary/60 to-secondary/60 shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/30 shrink-0">
              <Link
                href={`/deal-room`}
                className="flex items-center gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                Open Deal Room
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>

          {/* Contract Metadata */}
          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Building2 className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-text">Creator</p>
                <p className="text-sm font-medium">
                  {contract.creator || "Unknown"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-text">Counterparty</p>
                <p className="text-sm font-medium">
                  {contract.counterparty || "Not assigned"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-text">Participants</p>
                <p className="text-sm font-medium">
                  {contract.participants || 0}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Calendar className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-text">Created</p>
                <p className="text-sm font-medium">{createdAt}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Clock className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-text">Deadline</p>
                <div className="flex items-center gap-2">
                  <p
                    className={cn(
                      "text-sm font-medium",
                      isOverdue && "text-error",
                    )}
                  >
                    {deadline}
                  </p>
                  {isOverdue && (
                    <Badge variant="destructive" className="text-[10px] bg-error/40">
                      Overdue
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Button className="gap-2">
              <Download className="h-4 w-4 text-primary" />
              Download Contract
            </Button>

            <Button className="gap-2 text-text">
              <Edit className="h-4 w-4 text-secondary" />
              Edit Contract
            </Button>
          </div>
          <div className="flex items-center gap-2 text-sm text-text">
            <span>Last updated: {format(new Date(), "MMM d, yyyy")}</span>
           
          </div>
        </div>

        {/* Main Content - Full Contract Details */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="lg:col-span-4">
            <Card className="border-2 border-primary/10 pt-0">
              <CardHeader className="border-b border-primary/10 bg-linear-to-r from-primary/5 to-secondary/5 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{contract.title}</CardTitle>
                    <CardDescription className="text-sm mt-1">
                      Contract ID: #{contract.id} • Version{" "}
                      {contract.version || "1.0"}
                    </CardDescription>
                  </div>
                  <Badge
                    variant="outline"
                    className="border-primary/30 bg-primary/10 text-primary"
                  >
                    {contract.pages || 12} pages
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0 w-full!">
                <div className=" p-6 space-y-6">
                  {/* Contract Sections */}
                  <div className="w-full">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      Overview
                    </h3>
                    <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-muted/30">
                      <div>
                        <p className="text-xs text-muted-foreground">Status</p>
                        <p className="text-sm font-medium capitalize">
                          {contract.status}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Created</p>
                        <p className="text-sm font-medium">{createdAt}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Deadline
                        </p>
                        <p
                          className={cn(
                            "text-sm font-medium",
                            isOverdue && "text-destructive",
                          )}
                        >
                          {deadline}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Participants
                        </p>
                        <p className="text-sm font-medium">
                          {contract.participants || 0}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Parties Section */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      Parties Involved
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg border border-primary/10">
                        <p className="text-xs text-muted-foreground">Creator</p>
                        <p className="text-base font-medium">
                          {contract.creator}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Primary Party
                        </p>
                      </div>
                      <div className="p-4 rounded-lg border border-primary/10">
                        <p className="text-xs text-muted-foreground">
                          Counterparty
                        </p>
                        <p className="text-base font-medium">
                          {contract.counterparty || "Not assigned"}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Secondary Party
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Contract Body */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      Contract Details
                    </h3>
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      <p className="text-muted-foreground leading-relaxed">
                        {contract?.fullContract ||
                          contract.description ||
                          "No detailed contract content available."}
                      </p>
                    </div>
                  </div>

                  {/* Signature Section */}
                  <div className="border-t border-primary/10 pt-6">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                      Signatures
                    </h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="p-4 rounded-lg border-2 border-dashed border-primary/20">
                        <p className="text-sm font-medium">Creator Signature</p>
                        <div className="mt-2 h-12 flex items-center">
                          <p className="text-xs text-muted-foreground">
                            Pending signature
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          {contract.creator}
                        </p>
                      </div>
                      <div className="p-4 rounded-lg border-2 border-dashed border-primary/20">
                        <p className="text-sm font-medium">
                          Counterparty Signature
                        </p>
                        <div className="mt-2 h-12 flex items-center">
                          <p className="text-xs text-muted-foreground">
                            Pending signature
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          {contract.counterparty || "Not assigned"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Generated Contract Preview */}
                  <div className="border-t border-primary/10 pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        Generated Document
                      </h3>
                      <Badge
                        variant="outline"
                        className="border-primary/30 bg-primary/10 text-primary"
                      >
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                    <div className="p-4 rounded-lg bg-linear-to-br from-primary/5 to-secondary/5 border border-primary/10">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium">
                            {contract.title} - Final Draft
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {contract.pages || 12} pages •{" "}
                            {contract.wordCount || "4,200"} words • PDF
                          </p>
                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <Badge variant="secondary" className="text-[10px]">
                              Signed
                            </Badge>
                            <Badge variant="secondary" className="text-[10px]">
                              Notarized
                            </Badge>
                            <Badge variant="secondary" className="text-[10px]">
                              🔗 Blockchain
                            </Badge>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1 text-primary"
                        >
                          <Download className="h-3.5 w-3.5" />
                          PDF
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
