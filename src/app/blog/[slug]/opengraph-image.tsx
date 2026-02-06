import { ImageResponse } from 'next/og';
import { getPostBySlug, getAllSlugs } from '@/lib/blog';

export const runtime = 'nodejs';
export const alt = 'Compli Blog';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const title = post?.title ?? 'Blog Post';
  const author = post?.author ?? 'Compli Team';
  const date = post
    ? new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px',
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '48px',
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M16 2L4 8v8c0 7.732 5.12 14.936 12 17 6.88-2.064 12-9.268 12-17V8L16 2z"
                fill="rgba(255,255,255,0.1)"
                stroke="white"
                strokeWidth="2"
              />
              <path
                d="M12 16l3 3 6-6"
                stroke="#0EA5E9"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{
                fontSize: '24px',
                fontWeight: 600,
                color: '#94A3B8',
              }}
            >
              Compli Blog
            </span>
          </div>
          <div
            style={{
              fontSize: '48px',
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.2,
              maxWidth: '900px',
            }}
          >
            {title}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '16px',
              fontSize: '18px',
              color: '#64748B',
            }}
          >
            <span>{author}</span>
            <span>·</span>
            <span>{date}</span>
          </div>
          <span style={{ fontSize: '16px', color: '#64748B' }}>compli.in</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
