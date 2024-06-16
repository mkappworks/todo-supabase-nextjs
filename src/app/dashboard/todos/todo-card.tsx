import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye } from "lucide-react";

export function TodoCard({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description?: string | null;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <div>{description}</div>
      </CardContent>
      <CardFooter>
        <Button
          asChild
          className="flex items-center gap-2"
          variant={"secondary"}
        >
          <Link href={`/dashboard/todos/${id}`}>
            <Eye className="h-4 w-4" /> View
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
