import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { Seo } from "@/components/Seo";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Seo
        title="Page not found | Magh Mela Stays"
        description="This page does not exist. Browse camps and puja services for Magh Mela Prayagraj 2026."
        path="/404"
        noindex
      />
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">Page not found</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            That address is not on this site. You can go back to the{" "}
            <Link href="/" className="text-primary underline">
              Magh Mela camp homepage
            </Link>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
