import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'Compli - AI-Powered Compliance & Data Protection';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          <svg
            width="64"
            height="64"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M11 14V10a5 5 0 0 1 10 0v4"
              stroke="#0EA5E9"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <rect
              x="7"
              y="14"
              width="18"
              height="14"
              rx="3"
              fill="rgba(14,165,233,0.15)"
              stroke="#0EA5E9"
              strokeWidth="2"
            />
            <path
              d="M18.5 18.5A3.5 3.5 0 1 0 18.5 23.5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span
            style={{
              fontSize: '48px',
              fontWeight: 700,
              color: 'white',
            }}
          >
            Compli
          </span>
        </div>
        <div
          style={{
            fontSize: '32px',
            fontWeight: 600,
            color: 'white',
            textAlign: 'center',
            maxWidth: '800px',
            lineHeight: 1.3,
          }}
        >
          AI-Powered Compliance &
        </div>
        <div
          style={{
            fontSize: '32px',
            fontWeight: 600,
            color: '#0EA5E9',
            textAlign: 'center',
            maxWidth: '800px',
            lineHeight: 1.3,
          }}
        >
          Data Protection
        </div>
        <div
          style={{
            fontSize: '18px',
            color: '#94A3B8',
            textAlign: 'center',
            maxWidth: '600px',
            marginTop: '24px',
            lineHeight: 1.5,
          }}
        >
          Manage policies, automate questionnaire responses, and stay ahead of regulations.
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            fontSize: '16px',
            color: '#64748B',
          }}
        >
          compli.in
        </div>
      </div>
    ),
    { ...size }
  );
}
