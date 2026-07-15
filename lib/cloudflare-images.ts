/**
 * Cloudflare Images delivery URL helper.
 *
 * Account hash is public by design (it only identifies which Cloudflare
 * account to deliver images from — it does not grant upload/list access),
 * so it's safe to keep as a plain constant rather than a secret.
 *
 * @see https://developers.cloudflare.com/images/cloudflare-images/serve-images/
 */
export const CLOUDFLARE_IMAGES_ACCOUNT_HASH = "byE6BTe9lNqo21V57n4aPQ";

/**
 * Build a Cloudflare Images delivery URL for a given image ID and variant.
 * Defaults to the "public" variant.
 */
export function cloudflareImageUrl(imageId: string, variant = "public"): string {
  return `https://imagedelivery.net/${CLOUDFLARE_IMAGES_ACCOUNT_HASH}/${imageId}/${variant}`;
}
