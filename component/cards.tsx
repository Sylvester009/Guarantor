"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { deals } from "@/data/deals";
import { getUser } from "@/services/user";
import { Award, CheckCircle, Clock, Target, TrendingUp } from "lucide-react";

function getGreeting() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return "Good Morning";
  }

  if (hour >= 12 && hour < 17) {
    return "Good Afternoon";
  }

  if (hour >= 17 && hour < 21) {
    return "Good Evening";
  }

  return "Good Night";
}

export default function Cards() {
  const user = getUser();
  const greetings = getGreeting();

  const pendingDeals = deals.filter((deal) => deal.status === "Pending");

  const activeDeals = deals.filter((deal) => deal.status === "Active");

  const completedDeals = deals.filter((deal) => deal.status === "Completed");

  return (
    <>
      <div className="relative px-8 py-8">
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-primary/10 via-secondary/5 to-accent/10 p-8 border border-primary/10">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-text">
                  {greetings}, {user?.firstName || "User"}
                </h1>
                <span className="bg-secondary/20 text-secondary text-xs px-3 py-1 rounded-full font-medium">
                  Verified
                </span>
              </div>
              <p className="text-text/60 flex items-center gap-2">
                <span>Welcome to Guarantor</span>
                <span className="w-1 h-1 bg-text/20 rounded-full"></span>
                <span className="flex items-center gap-1">
                  <Award className="w-3 h-3 text-accent" />
                  <span className="text-sm">Trust Score: 100%</span>
                </span>
              </p>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-1/3 w-24 h-24 bg-secondary/5 rounded-full translate-y-1/2"></div>
        </div>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8">
        <Card className="bg-linear-to-br from-accent/5 to-white border-accent/20 shadow-lg hover:shadow-xl transition-all">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-text/60 uppercase tracking-wider">
                Pending Deals
              </CardTitle>
              <div className="relative">
                <div className="p-2 bg-accent/20 rounded-xl">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-4xl font-bold text-text">
                  {pendingDeals.length ?? 0}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-text/40">Needs attention</span>
                  <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full">
                    +0 new
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-linear-to-br from-primary/5 to-white border-primary/20 shadow-lg hover:shadow-xl transition-all">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-text/60 uppercase tracking-wider">
                Active Deals
              </CardTitle>
              <div className="p-2 bg-primary/20 rounded-xl">
                <Target className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-4xl font-bold text-text">
                  {activeDeals.length ?? 0}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <TrendingUp className="w-3 h-3 text-secondary" />
                  <span className="text-xs text-text/40">0% growth</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-linear-to-br from-secondary/5 to-white border-secondary/20 shadow-lg hover:shadow-xl transition-all">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-text/60 uppercase tracking-wider">
                Completed Deals
              </CardTitle>
              <div className="p-2 bg-secondary/20 rounded-xl">
                <CheckCircle className="w-5 h-5 text-secondary" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-4xl font-bold text-text">
                  {completedDeals.length ?? 0}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-text/40">Success rate</span>
                  <span className="text-xs font-bold text-secondary">0%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
