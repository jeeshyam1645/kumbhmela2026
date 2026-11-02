import { Suspense } from "react";
import { LoginForm } from "@/components/LoginForm";
import { pageMeta } from "@/lib/site";

export const metadata = {
  ...pageMeta("Login | Magh Mela Stays", "Sign in to request a callback or manage your Magh Mela booking.", "/login"),
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="px-4 pt-28 pb-16">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
