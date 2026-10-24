import { redirect } from "next/navigation";

/**
 * Legacy brokerage marketing URL. Brokerage disclosure lives in the footer only.
 */
export default function WhyBerkshireHathawayRedirectPage() {
  redirect("/about");
}
