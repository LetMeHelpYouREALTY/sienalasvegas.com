import { headers } from "next/headers";
import SchemaScript from "@/components/SchemaScript";
import { buildBreadcrumbItemsFromPath } from "@/lib/breadcrumbs";
import { generateBreadcrumbSchema } from "@/lib/schema";

/**
 * Emits BreadcrumbList JSON-LD for inner pages based on the request pathname.
 * Homepage renders nothing.
 */
export default async function PathBreadcrumbSchema() {
  const headerList = await headers();
  const pathname =
    headerList.get("x-pathname") ?? headerList.get("x-invoke-path") ?? "";

  const items = buildBreadcrumbItemsFromPath(pathname);
  if (!items || items.length < 2) {
    return null;
  }

  return (
    <SchemaScript
      schema={generateBreadcrumbSchema(items)}
      id="path-breadcrumb-schema"
    />
  );
}
