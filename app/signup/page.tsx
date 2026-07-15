"use client";

import { SignupForm } from "@/components/signup-form";
import { Sparkles, Users, ShieldCheck } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Left column – Brand / Illustration */}
      <div className="relative hidden flex-col justify-between bg-linear-to-br from-primary/5 via-primary/10 to-secondary/10 p-12 text-foreground lg:flex">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary to-secondary shadow-lg shadow-primary/20">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight">Guarantor</span>
        </div>

        <div className="max-w-md space-y-6">
          <div className="space-y-3">
            <h2 className="text-4xl font-semibold tracking-tight">
              Join the community of <br />
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                trusted partners
              </span>
            </h2>
            <p className="text-muted-foreground">
              Create your account and start building financial relationships
              with confidence. Thousands already trust Guarantor.
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground">10k+ users</span>
            </div>
            <span className="text-muted-foreground/30">•</span>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground">Secure & private</span>
            </div>
            <span className="text-muted-foreground/30">•</span>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">⭐ 4.9/5</span>
            </div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground/60">
          © 2026 Guarantor Inc. All rights reserved.
        </div>
      </div>

      {/* Right column – Signup Form */}
      <div className="flex flex-col items-center justify-center bg-background px-6 py-12 md:px-10 lg:px-16">
        <div className="w-full max-w-sm">
          {/* Mobile brand (visible only on small screens) */}
          <div className="mb-8 flex items-center justify-center gap-2 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-primary to-secondary shadow-md shadow-primary/20">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-primary">
              Guarantor
            </span>
          </div>

          <SignupForm />

          <div className="mt-6 text-center text-xs text-muted-foreground/70">
            By continuing, you agree to our{" "}
            <a href="#" className="underline-offset-2 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline-offset-2 hover:underline">
              Privacy Policy
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
}