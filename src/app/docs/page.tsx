import { redirect } from "next/navigation";
import { docHref, flatNav } from "@/config/nav";

// /docs has no page of its own: send people to the first page in the navigation.
export default function DocsIndex() {
  const first = flatNav[0];
  redirect(first ? docHref(first.slug) : "/");
}
