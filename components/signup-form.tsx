import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: string;
}

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  //Use Zod Later on
  const validateForm = (): boolean => {
    // Check if all fields are filled
    if (!formData.firstName.trim()) {
      toast.warning("First name is required", { position: "top-center" });
      return false;
    }

    if (!formData.lastName.trim()) {
      toast.warning("Last name is required", { position: "top-center" });
      return false;
    }

    if (!formData.email.trim()) {
      toast.warning("Email is required", { position: "top-center" });
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.warning("Please enter a valid email address", { position: "top-center" });
      return false;
    }

    if (!formData.password) {
      toast.warning("Password is required", { position: "top-center" });
      return false;
    }

    // Validate password length
    if (formData.password.length < 8) {
      toast.warning("Password must be at least 8 characters long", { position: "top-center" });
      return false;
    }

    return true;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSuccess(false);

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate async operation
    setTimeout(() => {
      try {
        // Check if user already exists
        const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

        // Check if email is already registered
        const userExists = existingUsers.some(
          (user: UserData) => user.email === formData.email,
        );

        if (userExists) {
          toast.error("An account with this email already exists", { position: "top-center" });
          setIsLoading(false);
          return;
        }

        // Create new user
        const newUser: UserData = {
          id: Date.now().toString(),
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password, // In production, this should be hashed!
          createdAt: new Date().toISOString(),
        };

        // Save to localStorage
        existingUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(existingUsers));

        // Also store current user session
        const { password, ...userWithoutPassword } = newUser;
        localStorage.setItem(
          "currentUser",
          JSON.stringify(userWithoutPassword),
        );

        setSuccess(true);
        toast.success("Account created successfully! Redirecting...", { position: "top-center" });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });

        // Redirect after successful signup
        setTimeout(() => {
          router.push("/");
        }, 1500);
      } catch (err) {
        toast.error("An error occurred during signup. Please try again."), { position: "top-center" };
        console.error("Signup error:", err);
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div
      className={cn("flex flex-col gap-6 max-w-md w-full mx-auto", className)}
      {...props}
    >
      <Card className="border-0 shadow-none lg:border lg:shadow-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Create an account
          </CardTitle>
          <CardDescription className="text-sm">
            Start your journey with Guarantor today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup className="gap-5">
              {/* Full Name */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="name" className="text-sm font-medium">
                  First Name
                </FieldLabel>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    disabled={isLoading || success}
                    className="h-11 pl-9 text-base"
                  />
                </div>
              </Field>
              <Field>
                <FieldLabel htmlFor="name" className="text-sm font-medium">
                  Last Name
                </FieldLabel>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    disabled={isLoading || success}
                    className="h-11 pl-9 text-base"
                  />
                </div>
              </Field>
              </div>

              {/* Email */}
              <Field>
                <FieldLabel htmlFor="email" className="text-sm font-medium">
                  Email
                </FieldLabel>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading || success}
                    className="h-11 pl-9 text-base"
                  />
                </div>
              </Field>

              {/* Password & Confirm Password */}
              <div className="grid grid-cols-1 gap-4">
                <Field>
                  <FieldLabel
                    htmlFor="password"
                    className="text-sm font-medium"
                  >
                    Password
                  </FieldLabel>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      disabled={isLoading || success}
                      className="h-11 pl-9 pr-9 text-base"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-muted-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </Field>

                
              </div>

              <FieldDescription className="text-xs text-muted-foreground/70">
                Must be at least 8 characters long.
              </FieldDescription>

              {/* Submit */}
              <Field>
                <Button
                  type="submit"
                  disabled={isLoading || success}
                  className="group h-11 w-full gap-2 bg-linear-to-r from-primary to-primary/90 text-base font-medium shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/30"
                >
                  {isLoading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </Button>
                <FieldDescription className="pt-2 text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <a
                    href="#"
                    className="font-medium text-primary hover:underline"
                  >
                    Sign in
                  </a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
