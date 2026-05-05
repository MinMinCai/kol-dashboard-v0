import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { viewAsCookie } from "~/lib/demo-identity.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const memberId = String(formData.get("memberId") ?? "").trim();
  const redirectTo = String(formData.get("redirectTo") ?? "/favorites");

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await viewAsCookie.serialize({ memberId: memberId || null }),
    },
  });
}
