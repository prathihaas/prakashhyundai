import { defineCollection, z } from 'astro:content';

const carsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    price: z.string(),
    category: z.enum(['SUV', 'Sedan', 'Hatchback', 'Premium']),
    image: z.string(),
    features: z.array(z.string()),
    order: z.number().default(10)
  })
});

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.string(),
    readTime: z.string(),
    excerpt: z.string(),
    date: z.date()
  })
});

export const collections = {
  'cars': carsCollection,
  'blog': blogCollection,
};