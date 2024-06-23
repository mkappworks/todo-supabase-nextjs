import { redirect } from "next/navigation";

export default function DashboardPage({
  params,
}: {
  params: {
    orgId: string;
  };
}) {
  redirect(`/org/${params.orgId}/dashboard/todos`);
}
