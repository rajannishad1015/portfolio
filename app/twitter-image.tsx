import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Rajan Nishad - Data Scientist & Generative AI Engineer';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundImage: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            right: '100px',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                width: `${100 + i * 40}px`,
                height: `${100 + i * 40}px`,
                border: '3px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '50%',
                display: 'flex',
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', zIndex: 10 }}>
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: '#ffffff',
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Rajan Nishad
          </h1>
          <p
            style={{
              fontSize: '36px',
              color: '#60a5fa',
              margin: 0,
              fontWeight: 600,
            }}
          >
            Data Scientist & AI Engineer
          </p>
          <div
            style={{
              display: 'flex',
              gap: '20px',
              fontSize: '24px',
              color: '#94a3b8',
              marginTop: '20px',
            }}
          >
            <span>• Machine Learning</span>
            <span>• NLP</span>
            <span>• Computer Vision</span>
            <span>• GenAI</span>
          </div>
          <p
            style={{
              fontSize: '28px',
              color: '#64748b',
              margin: 0,
              marginTop: '40px',
            }}
          >
            rajann.me
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
