import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Noise from "@/components/Noise";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  metadataBase: new URL("https://rajann.me"),
  title: {
    default: "Rajan Nishad | Data Scientist & Generative AI Engineer",
    template: "%s | Rajan Nishad",
  },
  description: "Portfolio of Rajan Nishad, a Data Scientist specializing in NLP, Computer Vision, and Generative AI. Explore projects in deep learning, LLMs, and AI solutions.",
  keywords: [
    "Data Scientist",
    "Machine Learning Engineer",
    "Generative AI Engineer",
    "NLP Specialist",
    "Computer Vision",
    "Deep Learning",
    "Rajan Nishad",
    "Portfolio",
    "AI Developer",
    "Next.js Developer",
    "React Developer",
    "Freelance Data Scientist",
    "India",
    "LLM Engineer",
    "RAG Specialist",
    "PyTorch",
    "TensorFlow",
    "AI Consultant"
  ],
  authors: [{ name: "Rajan Nishad" }],
  creator: "Rajan Nishad",
  openGraph: {
    title: "Rajan Nishad | Data Scientist & Generative AI Engineer",
    description: "Explore the portfolio of Rajan Nishad, featuring advanced projects in Generative AI, NLP, and Computer Vision.",
    url: "https://rajann.me",
    siteName: "Rajan Nishad Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rajan Nishad Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rajan Nishad | Data Scientist & Generative AI Engineer",
    description: "Data Scientist specializing in Generative AI, NLP, and Computer Vision.",
    creator: "@rajannishad",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-DD4F7WYPP2"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-DD4F7WYPP2');
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
        <CustomCursor />
        <SmoothScroll />
        <Noise />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Rajan Nishad",
              url: "https://rajann.me",
              image: "https://rajann.me/og-image.png",
              sameAs: [
                "https://github.com/Rajannishad1015",
                "https://linkedin.com/in/rajanishad",
              ],
              jobTitle: "Data Scientist & Generative AI Engineer",
              description:
                "Data Scientist specializing in NLP, Computer Vision, and Generative AI.",
            }),
          }}
        />
      </body>
    </html>
  );
}
