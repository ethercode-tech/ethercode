import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Container from "../../components/container";
import Footer from "../../components/footer";
import { blogPosts } from "../../data/blogPosts";

export default function BlogPostPage({ post }) {
  if (!post) return null;

  return (
    <>
      <Head>
        <title>{post.title} | ÉtherCode</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={`https://ethercode.com.ar/news/${post.slug}`} />
      </Head>

      <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        <Container>
          <article className="pt-12 pb-14 max-w-3xl mx-auto">
            <div className="mb-6">
              <Link href="/blog" className="text-sm text-cyan-400 hover:underline">
                ← Volver al blog
              </Link>
            </div>

            <header className="mb-8">
              <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400">
                {new Date(post.date).toLocaleDateString("es-AR", { year: "numeric", month: "long", day: "numeric" })}
              </p>

              <h1 className="mt-3 text-3xl md:text-4xl font-extrabold leading-tight">
                {post.title}
              </h1>

              <p className="mt-4 text-base md:text-lg text-gray-600 dark:text-gray-300">
                {post.description}
              </p>
            </header>

            {post.imageUrl && (
              <div className="mb-10 overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 bg-black/5">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  width={1200}
                  height={630}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            )}

            {/* ACÁ ESTÁ LA MAGIA */}
            <div
              className="
                prose prose-lg max-w-none
                prose-headings:font-extrabold
                prose-headings:tracking-tight
                prose-p:leading-relaxed
                prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white
                prose-ul:list-disc prose-ol:list-decimal
                prose-li:my-1
                prose-hr:border-white/10
                dark:prose-invert
              "
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </Container>

        <Footer />
      </div>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: blogPosts.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = blogPosts.find((p) => p.slug === params.slug) || null;
  return { props: { post } };
}