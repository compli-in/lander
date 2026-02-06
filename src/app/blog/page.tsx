import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Blog - Compli',
  description: 'Insights on compliance, data protection, and security best practices.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-[#0B0F1A]">
      <Header />
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-semibold text-white mb-4">Blog</h1>
          <p className="text-lg text-slate-400 mb-12">
            Insights on compliance, data protection, and security best practices.
          </p>

          {posts.length === 0 ? (
            <div className="text-center py-16 bg-slate-800/50 rounded-2xl">
              <p className="text-slate-500">No posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="group border border-slate-700/50 rounded-2xl p-8 hover:border-slate-600 hover:bg-slate-800/30 transition-all"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
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
                    <h2 className="text-2xl font-semibold text-white mb-3 group-hover:text-sky-400 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-slate-400 leading-relaxed mb-4">
                      {post.description}
                    </p>
                    <span className="text-sky-400 font-medium text-sm group-hover:underline">
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
