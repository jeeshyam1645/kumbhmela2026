import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/use-auth";
import { insertUserSchema } from "@app/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

export function AuthModal({ trigger }: { trigger?: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  
const BACKEND_URL = "https://magh-mela-backend.onrender.com";

  // If logged in, don't show login forms
  if (user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">Login</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-serif text-primary">
            Welcome to Magh Mela
          </DialogTitle>
        </DialogHeader>

        {/* SOCIAL LOGIN BUTTONS */}
        <div className="grid gap-3 py-4">

<Button onClick={() => window.location.href = `${BACKEND_URL}/api/auth/google`}>
  Login with Google
</Button>
            <svg className="h-5 w-5 absolute left-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </Button>

          <Button 
            variant="outline" 
            className="w-full flex gap-2 relative h-11" 
            onClick={() => window.location.href = "/api/auth/facebook"}
          >
             <svg className="h-5 w-5 absolute left-4 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.148 0-2.797 1.66-2.797 3.592v1.472h4.908l-.499 3.667h-4.409v7.98h-4.991Z" />
             </svg>
            Continue with Facebook
          </Button>
        </div>

        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
          </div>
        </div>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          {/* LOGIN TAB */}
          <TabsContent value="login">
            <LoginForm onClose={() => setIsOpen(false)} />
          </TabsContent>

          {/* REGISTER TAB */}
          <TabsContent value="register">
            <RegisterForm onClose={() => setIsOpen(false)} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

// Sub-component: Login Form
function LoginForm({ onClose }: { onClose: () => void }) {
  const { loginMutation } = useAuth();
  const form = useForm({
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = (data: any) => {
    loginMutation.mutate(data, { onSuccess: onClose });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label>Username</Label>
        <Input {...form.register("username")} required />
      </div>
      <div className="space-y-2">
        <Label>Password</Label>
        <Input type="password" {...form.register("password")} required />
      </div>
      <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
        {loginMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Login
      </Button>
    </form>
  );
}

// Sub-component: Register Form
function RegisterForm({ onClose }: { onClose: () => void }) {
  const { registerMutation } = useAuth();
  const form = useForm({
    resolver: zodResolver(insertUserSchema),
    defaultValues: { username: "", password: "", name: "", mobile: "" },
  });

  const onSubmit = (data: any) => {
    registerMutation.mutate(data, { onSuccess: onClose });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label>Full Name</Label>
        <Input {...form.register("name")} />
        {form.formState.errors.name && <p className="text-xs text-red-500">{form.formState.errors.name.message}</p>}
      </div>
      <div className="space-y-2">
        <Label>Username</Label>
        <Input {...form.register("username")} />
      </div>
      <div className="space-y-2">
        <Label>Mobile</Label>
        <Input {...form.register("mobile")} />
      </div>
      <div className="space-y-2">
        <Label>Password</Label>
        <Input type="password" {...form.register("password")} />
      </div>
      <Button type="submit" className="w-full" disabled={registerMutation.isPending}>
        {registerMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Create Account
      </Button>
    </form>
  );
}