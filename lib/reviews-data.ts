/**
 * Client testimonial data shared between ReviewsSection (client component)
 * and Server Components that need to emit matching Review schema (e.g. the
 * homepage). Kept in a plain module (no "use client") so Server Components
 * can safely import the data and helper functions without crossing the
 * client/server module boundary.
 */

export interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  image?: string;
  imageAlt?: string;
  date?: string;
}

export const defaultReviews: Review[] = [
  {
    id: 1,
    name: "Tom Sanders",
    location: "Las Vegas, NV",
    rating: 5,
    text: "Dr. Duffy made our home buying experience seamless. Her knowledge of the Las Vegas market is unmatched, and she guided us through every step with professionalism and care.",
    image: "/Image/tom-sanders-las-vegas-home-buyer-testimonial.jpg",
    imageAlt: "Tom Sanders, happy Las Vegas home buyer client of Dr. Jan Duffy, Berkshire Hathaway HomeServices",
    date: "2025-11-15",
  },
  {
    id: 2,
    name: "Vitor Palmer",
    location: "Henderson, NV",
    rating: 5,
    text: "We couldn't be happier with our new home! The entire process was smooth, and Dr. Duffy's attention to detail and negotiation skills saved us thousands. Highly recommend!",
    image: "/Image/vitor-palmer-henderson-home-buyer-testimonial.jpg",
    imageAlt: "Vitor Palmer, happy Henderson NV home buyer client of Dr. Jan Duffy, Berkshire Hathaway HomeServices",
    date: "2025-10-22",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    location: "Summerlin, NV",
    rating: 5,
    text: "As first-time homebuyers, we were nervous about the process. Dr. Duffy patiently explained everything and helped us find the perfect home in our budget. Thank you!",
    image: "/Image/emily-rodriguez-summerlin-home-buyer-testimonial.jpg",
    imageAlt: "Emily Rodriguez, happy Summerlin NV first-time home buyer client of Dr. Jan Duffy, Berkshire Hathaway HomeServices",
    date: "2025-09-08",
  },
];

// Aggregate rating stats
export const aggregateRating = {
  ratingValue: 4.9,
  reviewCount: 500,
  bestRating: 5,
  worstRating: 1,
};

/**
 * Helper to convert reviews to schema format for the ReviewSchema component
 * Use with: <ReviewSchema reviews={getReviewSchemaData(reviews)} aggregateRating={aggregateRating} />
 */
export function getReviewSchemaData(reviews: Review[]) {
  return reviews.map((review) => ({
    author: review.name,
    rating: review.rating,
    text: review.text,
    date: review.date,
    image: review.image,
  }));
}
