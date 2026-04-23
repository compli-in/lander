import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { TopNav } from '@/components/TopNav';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Blog - Compli',
  description: 'Insights on compliance, data protection, and security best practices.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-[color:var(--bg)] text-[color:var(--text)]">
      <TopNav />
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-semibold tracking-tight text-[color:var(--text)] mb-4">Blog</h1>
          <p className="text-lg text-[color:var(--text-dim)] mb-12">
            Insights on compliance, data protection, and security best practices.
          </p>

          {posts.length === 0 ? (
            <div className="text-center py-16 bg-[color:var(--bg-card)] rounded-2xl border border-[color:var(--border)]">
              <p className="text-[color:var(--text-muted)]">No posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="group border border-[color:var(--border)] bg-[color:var(--bg-card)] rounded-2xl p-8 hover:border-[color:var(--accent)]/50 transition-all"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="flex items-center gap-4 text-sm text-[color:var(--text-muted)] mb-3">
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                      <span>·</span>
                      <span>{post.readingTime}</span>
                    </div>
                    <h2 className="text-2xl font-semibold text-[color:var(--text)] mb-3 group-hover:text-[color:var(--accent)] transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-[color:var(--text-dim)] leading-relaxed mb-4">
                      {post.description}
                    </p>
                    <span className="text-[color:var(--accent)] font-medium text-sm group-hover:underline">
                      Read more →
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
