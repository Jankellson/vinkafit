import { createClient } from '@sanity/client';
import { createImageUrlBuilder as imageUrlBuilder } from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'placeholder',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/** Droša versija — atgriež null ja bildei nav asset._ref */
export function urlForSafe(source: unknown): ReturnType<typeof builder.image> | null {
  if (!source) return null;
  const src = source as Record<string, unknown>;
  if (!src.asset || !(src.asset as Record<string, unknown>)._ref) return null;
  return builder.image(source as SanityImageSource);
}

// ─── Blog rakstu tīpi ──────────────────────────────────────────────────────

export interface SanityBlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  pubDate: string;
  category: string;
  tags: string[];
  image?: SanityImageSource;
  imageAlt?: string;
  author: string;
  body: unknown[]; // Portable Text blocks
  draft?: boolean;
}

export interface SanityTestimonial {
  _id: string;
  name: string;
  age?: number;
  quote: string;
  result?: string;
  image?: SanityImageSource;
  order?: number;
}

// ─── GROQ vaicājumi ────────────────────────────────────────────────────────

/** Visi publicētie blog raksti, jaunākie pirmie */
export const ALL_POSTS_QUERY = `
  *[_type == "blogPost" && draft != true] | order(pubDate desc) {
    _id,
    title,
    slug,
    description,
    pubDate,
    category,
    tags,
    image,
    imageAlt,
    author
  }
`;

/** Viens blog raksts pēc slug */
export const POST_BY_SLUG_QUERY = `
  *[_type == "blogPost" && slug.current == $slug && draft != true][0] {
    _id,
    title,
    slug,
    description,
    pubDate,
    category,
    tags,
    image,
    imageAlt,
    author,
    body
  }
`;

/** Visi slug-i statiskajai ģenerācijai */
export const ALL_SLUGS_QUERY = `
  *[_type == "blogPost" && draft != true] {
    "slug": slug.current
  }
`;

/** Visas atsauksmes, kārtots pēc order lauka */
export const ALL_TESTIMONIALS_QUERY = `
  *[_type == "testimonial"] | order(order asc) {
    _id,
    name,
    age,
    quote,
    result,
    image
  }
`;
