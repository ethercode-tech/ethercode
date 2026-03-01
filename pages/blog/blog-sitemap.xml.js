import { blogPosts } from "../data/blogPosts";

export async function getServerSideProps({ res }) {
  const baseUrl = "https://ethercode.com.ar";

  const staticUrls = `
    <url>
      <loc>${baseUrl}/blog</loc>
      <priority>0.9</priority>
    </url>
  `;

  const blogUrls = blogPosts
    .map((post) => {
      return `
        <url>
          <loc>${baseUrl}/blog/${post.slug}</loc>
          <lastmod>${post.date}</lastmod>
          <priority>0.8</priority>
        </url>
      `;
    })
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticUrls}
      ${blogUrls}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function Sitemap() {
  return null;
}