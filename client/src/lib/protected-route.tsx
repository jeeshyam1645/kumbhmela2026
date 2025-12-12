import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Redirect, Route } from "wouter";
import React from "react";

type ProtectedRouteProps = {
  path: string;
  component: React.ComponentType<any>;
  adminOnly?: boolean;
};

export function ProtectedRoute({ path, component: Component, adminOnly }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  return (
    <Route path={path}>
      {(params) => {
        if (isLoading) {
          return (
            <div className="flex items-center justify-center min-h-screen">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          );
        }

        // 1. If not logged in -> Redirect to Home
        if (!user) {
          return <Redirect to="/" />;
        }

        // 2. If Admin Only required, but user is not admin -> Redirect to Home
        if (adminOnly && user.role !== "admin") {
          return <Redirect to="/" />;
        }

        // 3. Authorized -> Render Page
        return <Component {...params} />;
      }}
    </Route>
  );
}