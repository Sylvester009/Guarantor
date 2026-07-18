"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Deal } from "@/data/deals";
import { UserProps } from "@/data/user";
import { getUserDeals } from "@/services/deal";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  MoreVertical,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const getStatusConfig = (status: string) => {
  switch (status) {
    case "Active":
      return {
        color: "bg-primary/10 text-primary border-primary/20",
        icon: CheckCircle,
        label: "Active",
      };
    case "Pending":
      return {
        color: "bg-accent/10 text-accent border-accent/20",
        icon: Clock,
        label: "Pending",
      };
    case "Completed":
      return {
        color: "bg-secondary/10 text-secondary border-secondary/20",
        icon: CheckCircle,
        label: "Completed",
      };
    default:
      return {
        color: "bg-gray-100 text-gray-600 border-gray-200",
        icon: AlertCircle,
        label: status,
      };
  }
};

export default function Tables({ user }: UserProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [deals, setDeals] = useState<Deal[]>([]);

  useEffect(() => {

    const userDeals = user ? getUserDeals(user?.id) : [];
    setDeals(userDeals);
    setIsLoading(false);
  }, []);

  return (
    <section className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-text">Recent Deals</h2>
          <p className="text-sm text-text/60">
            Manage and track all your contracts
          </p>
        </div>
      </div>
      <div className="rounded-round overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-background/50">
            <TableRow className="hover:bg-transparent border-primary/5">
              <TableHead className="font-semibold hover:text-primary transition-colors">
                Title
              </TableHead>
              <TableHead className="font-semibold hover:text-primary transition-colors">
                Description
              </TableHead>
              <TableHead className="font-semibold hover:text-primary transition-colors">
                Created At
              </TableHead>
              <TableHead className="font-semibold hover:text-primary transition-colors">
                Deadline
              </TableHead>
              <TableHead className="text-right font-semibold">Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-40 text-center text-text/60"
                >
                  Loading deals...
                </TableCell>
              </TableRow>
            ) : deals.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-40 text-center text-text/60"
                >
                  <div className="flex flex-col items-center gap-3">
                    <FileText className="h-10 w-10 text-text/20" />
                    <div>
                      <p className="font-medium text-text">No deals yet</p>
                      <p className="text-sm text-text/50">
                        Create your first deal to get started.
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              deals.map((deal: Deal) => {
                const statusConfig = getStatusConfig(deal.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <TableRow
                    key={deal.id}
                    className="hover:bg-primary/5 transition-colors cursor-pointer"
                    onClick={() => router.push(`/contracts/${deal.id}`)}
                  >
                    <TableCell className="font-medium text-text">
                      {deal.title}
                    </TableCell>

                    <TableCell className="max-w-xs truncate text-text/70">
                      {deal.description}
                    </TableCell>

                    <TableCell className="text-text/70">
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3 text-text/30" />
                        {new Date(deal.createdAt).toLocaleDateString("en-CA")}
                      </div>
                    </TableCell>

                    <TableCell className="text-text/70">
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3 text-text/30" />
                        {deal.deadline}
                      </div>
                    </TableCell>

                    <TableCell className="text-right">
                      <Badge
                        variant="outline"
                        className={`${statusConfig.color} border px-3 py-1 font-medium gap-1.5`}
                      >
                        <StatusIcon className="h-3 w-3" />
                        {statusConfig.label}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4 text-text/40" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
