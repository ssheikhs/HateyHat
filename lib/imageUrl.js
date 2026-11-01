// Photos uploaded through HateyHat are saved as full links, e.g.
// http://localhost:3000/api/server/images/<id> when uploaded while testing locally.
// Serve them from whichever site the visitor is on, so a photo uploaded on one
// address still shows on the other (and the browser never tries to reach localhost).
const UPLOADED = /^https?:\/\/[^/]+(\/api\/server\/images\/[a-f0-9]{24})$/i;

export function imageUrl(url) {
  if (!url) return url;
  const match = String(url).match(UPLOADED);
  return match ? match[1] : url;
}
