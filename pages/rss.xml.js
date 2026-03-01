import { blogPosts } from "../data/blogPosts";

export async function getServerSideProps({ res }) {
  const baseUrl = "https://ethercode.com.ar";

  const rssItems = blogPosts
    .map((post) => {
      return `
        <item>
          <title><![CDATA[${post.title}]]></title>
          <link>${baseUrl}/blog/${post.slug}</link>
          <description><![CDATA[${post.description}]]></description>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
          <guid>${baseUrl}/blog/${post.slug}</guid>
        </item>
      `;
    })
    .join("");

  const rss = `<?xml version="1.0"?>
    <rss version="2.0">
      <channel>
        <title>Blog ÉtherCode</title>
        <link>${baseUrl}/blog</link>
        <description>Automatización con IA, ventas y empleados digitales</description>
        ${rssItems}
      </channel>
    </rss>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(rss);
  res.end();

  return { props: {} };
}

export default function RSS() {
  return null;
}