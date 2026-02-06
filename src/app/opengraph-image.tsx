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
