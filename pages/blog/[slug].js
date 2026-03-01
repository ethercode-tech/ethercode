import { useRouter } from "next/router";
import Head from "next/head";
import Container from "../../components/container";
import Footer from "../../components/footer";
import { blogPosts } from "../../data/blogPosts";

export default function BlogPostPage() {
  const router = useRouter();
  const { slug } = router.query;

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <div>Artículo no encontrado</div>;
  }

  return (
    <>
      <Head>
        <title>{post.title} | ÉtherCode</title>
        <meta name="description" content={post.description} />
        <link
          rel="canonical"
          href={`https://ethercode.com.ar/blog/${post.slug}`}
        />

        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={`https://ethercode.com.ar${post.imageUrl}`} />
        <meta property="og:type" content="article" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: post.title,
              description: post.description,
              image: `https://ethercode.com.ar${post.imageUrl}`,
              author: {
                "@type": "Organization",
                name: "ÉtherCode"
              },
              publisher: {
                "@type": "Organization",
                name: "ÉtherCode",
                logo: {
                  "@type": "ImageObject",
                  url: "https://ethercode.com.ar/img-logo/logonombre.png"
                }
              },
              datePublished: post.date
            })
          }}
        />
      </Head>

      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
        <Container>
          <article className="max-w-3xl mx-auto py-16">
            <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full rounded-xl mb-8"
            />

            <div
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </Container>
        <Footer />
      </div>
    </>
  );
}