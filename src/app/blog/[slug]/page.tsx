import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getAllSlugs } from '@/lib/blog';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found - Compli' };
  }

  return {
    title: `${post.title} - Compli Blog`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-32 pb-20 px-6">
        <article className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-slate-500 hover:text-slate-700 mb-8 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blog
          </Link>

          <header className="mb-12">
            <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span>·</span>
              <span>{post.readingTime}</span>
              <span>·</span>
              <span>{post.author}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 leading-tight mb-6">
              {post.title}
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              {post.description}
            </p>
          </header>

          <div className="prose prose-slate prose-lg max-w-none prose-headings:font-semibold prose-a:text-sky-600 prose-a:no-underline hover:prose-a:underline">
            <MDXRemote source={post.content} />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
