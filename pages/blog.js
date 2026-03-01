"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Container from "../components/container";
import Footer from "../components/footer";
import NewsCardÉtherCode from "../components/NewsCardEtherCode";
import NewsCardExternal from "../components/newCardExternal";
import { blogPosts } from "../data/blogPosts";
import axios from "axios";

const BLOG_URL = "https://ethercode.com.ar/blog";

const CATEGORIES = [
  "Todos",
  "WhatsApp",
  "Ventas",
  "Automatización",
  "IA",
  "Restaurantes",
  "Herramientas",
];

const POSTS_PER_PAGE = 6;

function inferCategoryFromSlug(slug = "") {
  const s = String(slug).toLowerCase();
  if (s.includes("whatsapp")) return "WhatsApp";
  if (s.includes("ventas")) return "Ventas";
  if (s.includes("restaurantes")) return "Restaurantes";
  if (s.includes("n8n") || s.includes("make")) return "Herramientas";
  if (s.includes("ia")) return "IA";
  return "Automatización";
}

export default function BlogIndexPage() {
  const router = useRouter();

  const [externalNews, setExternalNews] = useState([]);
  const [topic, setTopic] = useState("automatización con IA");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");

  // Estados UX para refresh de noticias externas
  const [isFetchingNews, setIsFetchingNews] = useState(false);
  const [newsError, setNewsError] = useState("");
  const [lastUpdatedAt, setLastUpdatedAt] = useState(null);

  // Para cancelar requests anteriores si el usuario spamea actualizar
  const newsAbortRef = useRef(null);

  // Page desde query param (default 1)
  const page = useMemo(() => {
    const raw = router?.query?.page;
    const parsed = parseInt(Array.isArray(raw) ? raw[0] : raw || "1", 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
  }, [router?.query?.page]);

  // Post enriquecidos: categoría + featured
  const enrichedPosts = useMemo(() => {
    return blogPosts
      .map((p) => ({
        ...p,
        category: p.category || inferCategoryFromSlug(p.slug),
        featured: Boolean(p.featured),
      }))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, []);

  const featuredPosts = useMemo(() => {
    const explicit = enrichedPosts.filter((p) => p.featured);
    if (explicit.length >= 3) return explicit.slice(0, 3);
    return enrichedPosts.slice(0, 3);
  }, [enrichedPosts]);

  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return enrichedPosts.filter((p) => {
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);

      const matchesCategory = category === "Todos" || p.category === category;

      return matchesQuery && matchesCategory;
    });
  }, [enrichedPosts, query, category]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  }, [filteredPosts.length]);

  const safePage = useMemo(() => {
    return Math.min(Math.max(page, 1), totalPages);
  }, [page, totalPages]);

  const paginatedPosts = useMemo(() => {
    const start = (safePage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, safePage]);

  const fetchInternationalNews = async (topicValue = "automatización con IA") => {
    try {
      setNewsError("");
      setIsFetchingNews(true);

      // abortar request anterior si existe
      if (newsAbortRef.current) {
        newsAbortRef.current.abort();
      }

      const controller = new AbortController();
      newsAbortRef.current = controller;

      // opcional: vaciar para que el usuario vea que refresca
      setExternalNews([]);

      const response = await axios.get("/api/news", {
        params: { topic: topicValue, pageSize: 8 },
        signal: controller.signal,
      });

      const articles = (response.data.articles || [])
        .filter((a) => a?.title && a?.url)
        .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
        .map((article) => ({
          ...article,
          imageUrl: article.urlToImage, // normalizamos
          source: article.source,
          url: article.url,
        }));

      setExternalNews(articles);
      setLastUpdatedAt(new Date());
    } catch (error) {
      // abort = no es error real
      if (error?.name === "CanceledError" || error?.code === "ERR_CANCELED") {
        return;
      }
      console.error("Error al cargar noticias externas:", error);
      setNewsError(
        "No pudimos cargar noticias externas ahora. Probá de nuevo en unos segundos."
      );
    } finally {
      setIsFetchingNews(false);
    }
  };

  // Carga inicial (una vez)
  useEffect(() => {
    fetchInternationalNews(topic);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Limpieza: abort request si el componente se desmonta
  useEffect(() => {
    return () => {
      if (newsAbortRef.current) newsAbortRef.current.abort();
    };
  }, []);

  const jsonLd = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Blog de ÉtherCode",
      description:
        "Guías y casos reales sobre automatización con IA, ventas por WhatsApp y empleados digitales para negocios en Argentina y Latinoamérica.",
      url: BLOG_URL,
      publisher: {
        "@type": "Organization",
        name: "ÉtherCode",
        url: "https://ethercode.com.ar",
        logo: {
          "@type": "ImageObject",
          url: "https://ethercode.com.ar/img-logo/logonombre.png",
        },
      },
    };
  }, []);

  return (
    <>
      <Head>
        <title>Blog de Automatización con IA y Ventas | ÉtherCode</title>
        <meta
          name="description"
          content="Aprendé cómo automatizar tu negocio con IA: WhatsApp 24/7, empleados digitales, ventas, reservas y procesos. Guías simples y casos reales."
        />
        <link rel="canonical" href={BLOG_URL} />

        <meta
          property="og:title"
          content="Blog de Automatización con IA | ÉtherCode"
        />
        <meta
          property="og:description"
          content="Guías simples para automatizar ventas y atención al cliente con IA. Ideas accionables para negocios de Argentina y Latinoamérica."
        />
        <meta
          property="og:image"
          content="https://ethercode.com.ar/img-logo/logonombre.png"
        />
        <meta property="og:url" content={BLOG_URL} />
        <meta property="og:type" content="website" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        <Container>
          {/* HERO */}
          <section className="pt-14 pb-10">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-xs tracking-widest uppercase text-gray-500 dark:text-gray-400">
                Blog • Automatización • Ventas • IA
              </p>

              <h1 className="text-4xl md:text-5xl font-extrabold mt-3 leading-tight">
                Ideas simples para vender más{" "}
                <span className="text-cyan-400">sin estar pegado al celular</span>
              </h1>

              <p className="mt-4 text-base md:text-lg text-gray-600 dark:text-gray-300">
                Guías prácticas y casos reales para automatizar WhatsApp, atención
                24/7 y procesos de negocio con IA.
              </p>

              {/* CTA */}
              <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/asistentes"
                  className="inline-flex items-center justify-center rounded-2xl px-6 py-3 font-bold bg-cyan-500 text-black hover:opacity-95 transition"
                >
                  Ver Empleado Digital
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-2xl px-6 py-3 font-semibold bg-white/10 border border-white/15 text-white hover:bg-white/15 transition"
                >
                  Pedir asesoramiento
                </Link>
              </div>

              {/* Search + filter */}
              <div className="mt-8 grid gap-3 md:grid-cols-3">
                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    if (safePage !== 1) router.push("/blog?page=1");
                  }}
                  placeholder="Buscar artículos (ej: WhatsApp, n8n, reservas...)"
                  className="md:col-span-2 w-full rounded-xl px-4 py-3 bg-white dark:bg-gray-800 border border-black/10 dark:border-white/10"
                />

                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    if (safePage !== 1) router.push("/blog?page=1");
                  }}
                  className="w-full rounded-xl px-4 py-3 bg-white dark:bg-gray-800 border border-black/10 dark:border-white/10"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Topic external news control */}
              <div className="mt-3 flex flex-col sm:flex-row gap-3 justify-center items-center">
                <input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      fetchInternationalNews(topic);
                    }
                  }}
                  placeholder="Tema para noticias externas (ej: IA, automatización, WhatsApp)"
                  className="w-full sm:w-[420px] rounded-xl px-4 py-3 bg-white dark:bg-gray-800 border border-black/10 dark:border-white/10"
                />

                <button
                  onClick={() => fetchInternationalNews(topic)}
                  disabled={isFetchingNews}
                  className={`rounded-xl px-5 py-3 font-bold transition ${
                    isFetchingNews
                      ? "bg-indigo-400 text-white cursor-not-allowed opacity-80"
                      : "bg-indigo-500 text-white hover:opacity-95"
                  }`}
                >
                  {isFetchingNews ? "Actualizando..." : "Actualizar noticias"}
                </button>
              </div>
            </div>
          </section>

          {/* DESTACADOS */}
          <section className="pb-10">
            <div className="flex items-end justify-between gap-4 mb-5">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold">Destacados</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Los artículos con más intención de compra.
                </p>
              </div>

              <Link
                href="/asistentes"
                className="text-sm font-semibold text-cyan-400 hover:underline"
              >
                Ver solución →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <NewsCardÉtherCode key={post.slug} news={post} />
              ))}
            </div>
          </section>

          {/* TODOS LOS ARTÍCULOS */}
          <section className="pb-6">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-2">Artículos</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              Elegí un tema y aplicalo en tu negocio.
            </p>

            {filteredPosts.length === 0 ? (
              <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-gray-800 p-6">
                <p className="text-gray-700 dark:text-gray-200 font-semibold">
                  No encontramos artículos con ese filtro.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {paginatedPosts.map((post) => (
                  <NewsCardÉtherCode key={post.slug} news={post} />
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-10 gap-3">
              {safePage > 1 && (
                <Link
                  href={`/blog?page=${safePage - 1}`}
                  className="px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border"
                >
                  ← Anterior
                </Link>
              )}

              <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-600 dark:text-gray-300">
                Página <b>{safePage}</b> de <b>{totalPages}</b>
              </div>

              {safePage < totalPages && (
                <Link
                  href={`/blog?page=${safePage + 1}`}
                  className="px-4 py-2 rounded-xl bg-cyan-500 text-black font-bold"
                >
                  Siguiente →
                </Link>
              )}
            </div>
          </section>

          {/* NOTICIAS EXTERNAS */}
          <section className="pb-16 pt-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-3">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold">
                  Noticias del mundo sobre Automatización con IA
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Selección automática. Útil para inspirarte, no reemplaza asesoramiento.
                </p>
              </div>
            </div>

            {/* Estado / error / timestamp */}
            {newsError && (
              <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {newsError}
              </div>
            )}

            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500 dark:text-gray-400">
              <span>
                Tema actual: <strong>{topic}</strong>
              </span>

              <span>
                {isFetchingNews
                  ? "Cargando noticias..."
                  : lastUpdatedAt
                  ? `Actualizado: ${lastUpdatedAt.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}`
                  : "Sin actualizar aún"}
              </span>
            </div>

            {isFetchingNews && externalNews.length === 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-gray-800 overflow-hidden"
                  >
                    <div className="h-52 w-full bg-black/10 dark:bg-white/10 animate-pulse" />
                    <div className="p-6 space-y-3">
                      <div className="h-4 w-3/4 bg-black/10 dark:bg-white/10 animate-pulse rounded" />
                      <div className="h-3 w-full bg-black/10 dark:bg-white/10 animate-pulse rounded" />
                      <div className="h-3 w-5/6 bg-black/10 dark:bg-white/10 animate-pulse rounded" />
                      <div className="h-3 w-2/5 bg-black/10 dark:bg-white/10 animate-pulse rounded mt-4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {externalNews.map((news, index) => (
                  <NewsCardExternal key={index} news={news} />
                ))}
              </div>
            )}
          </section>
        </Container>

        <Footer />
      </div>
    </>
  );
}