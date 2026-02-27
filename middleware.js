/**
 * [SEO-01] Redirección 301: www.ethercode.com.ar → ethercode.com.ar
 * Dominio canónico: https://ethercode.com.ar (sin www)
 */
export function middleware(request) {
  const url = request.nextUrl;
  const host = request.headers.get("host") || "";

  if (host.startsWith("www.")) {
    const newUrl = new URL(url);
    newUrl.host = host.replace(/^www\./, "");
    newUrl.protocol = request.nextUrl.protocol;
    return Response.redirect(newUrl.toString(), 301);
  }

  return;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon|img-logo|api).*)"],
};
