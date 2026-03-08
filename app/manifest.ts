import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Rajan Nishad - Data Scientist & AI Engineer Portfolio',
    short_name: 'Rajan Nishad',
    description: 'Portfolio of Rajan Nishad, a Data Scientist specializing in NLP, Computer Vision, and Generative AI',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#3b82f6',
  };
}
