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
import { Deal, deals } from "@/data/deals";
import { AlertCircle, CheckCircle, Clock, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";

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

export default function Tables() {
  const router = useRouter();
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
                Name
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
            {deals.map((deal: Deal) => {
              const statusConfig = getStatusConfig(deal.status);
              const StatusIcon = statusConfig.icon;
              return (
                <TableRow
                  key={deal.id}
                  className="hover:bg-primary/5 transition-colors border-primary/5 cursor-auto"
                  onClick={() => router.push(`/contracts/${deal.id}`)}
                >
                  <TableCell className="font-medium text-text">
                    {deal.name}
                  </TableCell>

                  <TableCell className="text-text/70 max-w-xs truncate">
                    {deal.description}
                  </TableCell>
                  <TableCell className="text-text/70 max-w-xs truncate">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-text/30" />
                      {deal.createdAt}
                    </div>
                  </TableCell>
                  <TableCell className="text-text/70">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-text/30" />
                      {deal.deadline}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant="outline"
                      className={`${statusConfig.color} border font-medium gap-1.5 px-3 py-1`}
                    >
                      <StatusIcon className="w-3 h-3" />
                      {statusConfig.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="w-4 h-4 text-text/40" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
