// Site Configuration - sienalasvegas.com
// Siena Las Vegas real estate — Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties

import { cloudflareImageUrl } from "./cloudflare-images";

export const siteConfig = {
  name: "Siena Las Vegas",
  fullName: "Berkshire Hathaway HomeServices Nevada Properties",
  tagline: "Real Estate at Siena — Premier 55+ Community",
  brandLine:
    "Siena Las Vegas Real Estate | Dr. Jan Duffy | Berkshire Hathaway HomeServices Nevada Properties",
  brandName: "Berkshire Hathaway HomeServices",
  shortName: "BHHS",
  url: "https://www.sienalasvegas.com",
  description:
    "Homes for sale in Siena, Las Vegas's premier 55+ community. Golf course living, guard-gated security, Community Center & clubs. Dr. Jan Duffy, BHHS Nevada Properties. 10525 Siena Monte Avenue. Call (702) 500-1942.",
};

export const agentInfo = {
  name: "Dr. Jan Duffy",
  title: "REALTOR®",
  license: "S.0197614.LLC",
  phone: "(702) 500-1942",
  phoneFormatted: "(702) 500-1942",
  phoneTel: "tel:+17025001942",
  email: "homes@sienalasvegas.com",
  brokerage: "Berkshire Hathaway HomeServices Nevada Properties",
  // Served via Cloudflare Images — see lib/cloudflare-images.ts
  photo: cloudflareImageUrl("a26f3a93-fb9c-4f24-3881-dba74660c300", "w=800"),
  photoAlt:
    "Dr. Jan Duffy, REALTOR® with Berkshire Hathaway HomeServices Nevada Properties, smiling on a phone call",
};

export const officeInfo = {
  name: "Berkshire Hathaway HomeServices Nevada Properties",
  address: {
    street: "10525 Siena Monte Avenue",
    city: "Las Vegas",
    state: "NV",
    zip: "89135",
    full: "10525 Siena Monte Avenue, Las Vegas, NV 89135",
  },
  coordinates: {
    lat: 36.1893,
    lng: -115.2821,
  },
  phone: "(702) 500-1942",
  phoneTel: "tel:+17025001942",
};

// Market Statistics (Updated January 2026)
export const marketStats = {
  lastUpdated: "January 2026",
  lasVegas: {
    medianPrice: 450000,
    medianPriceFormatted: "$450,000",
    yearOverYearChange: "+4.2%",
    daysOnMarket: 28,
    activeListings: 4850,
    closedSales: 2340,
    inventoryMonths: 2.1,
  },
  henderson: {
    medianPrice: 485000,
    medianPriceFormatted: "$485,000",
    yearOverYearChange: "+5.1%",
    daysOnMarket: 24,
    activeListings: 1280,
  },
  summerlin: {
    medianPrice: 625000,
    medianPriceFormatted: "$625,000",
    yearOverYearChange: "+6.8%",
    daysOnMarket: 22,
    luxuryMedian: 1200000,
    luxuryMedianFormatted: "$1.2M",
  },
  luxury: {
    medianPrice: 1200000,
    medianPriceFormatted: "$1.2M",
    activeListings: 890,
    daysOnMarket: 45,
    pricePerSqFt: 385,
  },
};

// Agent Stats
export const agentStats = {
  servingSince: 2008,
  transactionsClosed: 500,
  volumeClosed: "$127M+",
  averageRating: 4.9,
  reviewCount: 200,
};

// Value Propositions
export const valuePropositions = {
  main: "When you work with a Berkshire Hathaway HomeServices agent, you're backed by a name synonymous with trust, ethical standards, and financial strength—the same principles that built Warren Buffett's empire.",
  trust:
    "Berkshire Hathaway HomeServices is the only real estate brand backed by Warren Buffett's Berkshire Hathaway Inc. This means unmatched financial stability, ethical standards, and a global referral network of 50,000+ agents.",
  expertise:
    "Serving Las Vegas since 2008 with $127M+ in closed transactions, Dr. Jan Duffy combines deep local market knowledge with the resources of a global brand.",
};

// Siena Community (from sienalv.org) — premier 55+ community
export const sienaCommunity = {
  name: "Siena",
  tagline:
    "A premier 55+ community where the Spring Mountain range provides the backdrop and stately palms line a pathway to our door. As a desert oasis offering a lifestyle for active adults in Las Vegas, Siena is a place to proudly call home.",
  description:
    "In 1998, the vision for Siena was born. Siena surrounds a public, 18-hole championship golf course and is one of the most beautiful, active, and friendly age-privileged communities in the country. Residents enjoy an abundance of amenities and activities. Our residents consider Siena a paradise.",
  address: {
    street: "10525 Siena Monte Avenue",
    city: "Las Vegas",
    state: "NV",
    zip: "89135",
    full: "10525 Siena Monte Avenue, Las Vegas, NV 89135",
  },
  streetDisplay: "10525 Siena Monte Avenue",
  hoaPhone: "(702) 258-2500",
  hoaPhoneTel: "tel:+17022582500",
  fax: "(702) 258-2505",
  gates: {
    main: "10539 Siena Monte Ave (homes north of Tropicana)",
    tropicana: "4925 Fiore Bella Blvd (homes south of Tropicana)",
  },
  golf:
    "Schmidt-Curley designed 18-hole championship Siena Golf Course; lakes; doglegs and straightaway holes; Bistro at Siena Golf Club with views and dining.",
  amenities: [
    "Community Center (heart of Siena, spectacular view)",
    "Rotunda (coffee and conversation)",
    "Library",
    "Art, Ceramics, Sewing, Music rooms",
    "Billiards, Card & Games",
    "Computer Classroom",
    "Fitness Center",
    "Salon & Spa",
    "Siena Golf & Bistro",
  ],
  amenitiesIntro:
    "The Community Center, with a spectacular view, is the heart of Siena. Residents gather for coffee and conversation in the Rotunda or read a book in the lovely Library. The Community Center has rooms dedicated to Art, Ceramics, Sewing, Music, Billiards, Card & Games, in addition to a Computer Classroom.",
  security:
    "Siena is a guard-gated community. Armed security personnel are onsite 24 hours a day, 365 days a year. The security team is CPR/AED/First Aid certified and can provide basic assistance while emergency responders are on their way. In the event of a medical, fire, or safety emergency, always call 911 first. Mobile Patrol Officers conduct routine patrols throughout the community, monitor access points, and document or report incidents of concern to management or law enforcement when appropriate. Their primary role is to promote a safe and secure environment for all Siena residents and guests.",
  clubs:
    "A significant part of the active Siena lifestyle includes many clubs and groups. Siena's clubs and groups are resident-run, and provide a wide range of group and individual activities, catering to various interests, in categories such as active, card & game, creative, discussion, informative, and social.",
  events:
    "Siena's Lifestyle Department strives to provide the very best activities and events for residents. Monthly happy hours, trips to the Smith Center, BBQs and trivia nights are all coordinated by Lifestyle. The Social Committee holds Signature Events, including Sienafest and the annual New Year's Eve Gala. The wide variety offers something for everyone.",
  localAttractions:
    "Those new to Las Vegas may not realize how much our exciting city has to offer. Famous for glitz and glamour, Las Vegas and surrounding areas are also home to professional sports teams, parks, restaurants, shopping, cultural events, museums and other attractions. You will never be bored in Vegas!",
};

// Neighborhoods served
export const neighborhoods = [
  {
    name: "Siena",
    slug: "siena",
    description: "Premier 55+ guard-gated community with championship golf, Community Center, and Spring Mountain views",
    medianPrice: "Varies",
    highlights: ["Siena Golf Course", "Guard-gated", "Community Center", "Clubs & events", "10525 Siena Monte Avenue"],
  },
  {
    name: "Summerlin",
    slug: "summerlin",
    description: "Master-planned community with parks, trails, and top-rated schools",
    medianPrice: "$625,000",
    highlights: ["Red Rock views", "150+ parks", "Top schools", "Golf courses"],
  },
  {
    name: "Henderson",
    slug: "henderson",
    description: "Nevada's second-largest city with family-friendly neighborhoods",
    medianPrice: "$485,000",
    highlights: ["Low crime rate", "Excellent schools", "Lake Las Vegas", "Green Valley"],
  },
  {
    name: "Green Valley",
    slug: "green-valley",
    description: "Established Henderson community with mature landscaping",
    medianPrice: "$520,000",
    highlights: ["Golf courses", "Walking trails", "Shopping", "Parks"],
  },
  {
    name: "The Ridges",
    slug: "the-ridges",
    description: "Ultra-luxury guard-gated community in Summerlin",
    medianPrice: "$2.5M",
    highlights: ["Celebrity homes", "Custom estates", "Bear's Best Golf", "Strip views"],
  },
  {
    name: "Southern Highlands",
    slug: "southern-highlands",
    description: "Master-planned luxury community with championship golf",
    medianPrice: "$750,000",
    highlights: ["Golf community", "Guard-gated", "Mountain views", "Luxury amenities"],
  },
  {
    name: "North Las Vegas",
    slug: "north-las-vegas",
    description: "Rapidly growing area with affordable new construction",
    medianPrice: "$385,000",
    highlights: ["New construction", "Affordable", "Growing area", "Family-friendly"],
  },
  {
    name: "Skye Canyon",
    slug: "skye-canyon",
    description: "Newer master-planned community in northwest Las Vegas",
    medianPrice: "$550,000",
    highlights: ["New homes", "Mountain views", "Modern amenities", "Great schools"],
  },
  {
    name: "Centennial Hills",
    slug: "centennial-hills",
    description: "Northwest Las Vegas community with mountain proximity",
    medianPrice: "$495,000",
    highlights: ["Mountain access", "Parks", "Shopping", "Family-friendly"],
  },
  {
    name: "Inspirada",
    slug: "inspirada",
    description: "Henderson master-planned community with resort-style living",
    medianPrice: "$525,000",
    highlights: ["Resort pools", "Walking trails", "New construction", "Great schools"],
  },
  {
    name: "Mountains Edge",
    slug: "mountains-edge",
    description: "Southwest Las Vegas master-planned community",
    medianPrice: "$475,000",
    highlights: ["Mountain views", "Parks", "Growing area", "Affordable luxury"],
  },
];

// Services offered
export const services = [
  {
    name: "Home Buying",
    slug: "buyers",
    description: "Expert guidance through every step of the home buying process",
    icon: "Home",
  },
  {
    name: "Home Selling",
    slug: "sellers",
    description: "Maximize your home's value with professional marketing and negotiation",
    icon: "TrendingUp",
  },
  {
    name: "Luxury Homes",
    slug: "luxury-homes",
    description: "Specialized expertise in Las Vegas luxury real estate",
    icon: "Star",
  },
  {
    name: "New Construction",
    slug: "new-construction",
    description: "Free buyer representation for new home purchases",
    icon: "Building",
  },
  {
    name: "Investment Properties",
    slug: "investment-properties",
    description: "Strategic consulting for rental and investment opportunities",
    icon: "DollarSign",
  },
  {
    name: "Relocation",
    slug: "relocation",
    description: "Comprehensive relocation assistance for moves to Las Vegas",
    icon: "Truck",
  },
  {
    name: "Home Valuation",
    slug: "home-valuation",
    description: "Free property valuations using current market data",
    icon: "Calculator",
  },
  {
    name: "Market Analysis",
    slug: "market-report",
    description: "In-depth Las Vegas real estate market insights",
    icon: "BarChart",
  },
];

// Expert quotes from Dr. Jan Duffy
export const expertQuotes = {
  market: `"The Las Vegas market remains strong heading into 2026. We're seeing continued demand from California relocators and remote workers, but the days of 20 offers on every listing are behind us. Buyers finally have some negotiating power."`,
  buyers: `"My job isn't just to show you houses—it's to make sure you don't overpay, that you understand what you're buying, and that you're protected through every step of the transaction."`,
  sellers: `"Pricing your home correctly from day one is the single most important factor in getting top dollar. Overpriced homes sit, and every day on market costs you money."`,
  luxury: `"Luxury buyers expect discretion, market expertise, and flawless execution. In this price range, one wrong move can cost hundreds of thousands of dollars."`,
  investment: `"Las Vegas rental yields are among the best in the country right now. But you need to know which neighborhoods are appreciating and which have peaked."`,
  relocation: `"Moving to a new city is stressful enough. I handle everything from neighborhood tours to school research to contractor referrals so you can focus on your new beginning."`,
  newConstruction: `"Builders have sales agents who work for them, not you. Having your own representation costs you nothing but can save you tens of thousands in upgrades and negotiations."`,
  valueProposition: `"When clients ask why they should choose a Berkshire Hathaway HomeServices agent, I tell them: you're not just getting me—you're getting a global network of 50,000 agents, world-class marketing, and a brand that's synonymous with trust."`,
};

// Common FAQs
export const commonFAQs = {
  general: [
    {
      question: "Why should I choose a Berkshire Hathaway HomeServices agent?",
      answer:
        "Berkshire Hathaway HomeServices is the only real estate brand backed by Warren Buffett's Berkshire Hathaway Inc. This means unmatched financial stability, ethical standards, and a global referral network of 50,000+ agents. When you're making the biggest purchase of your life, that trust matters.",
    },
    {
      question: "What areas does Berkshire Hathaway HomeServices Nevada Properties cover?",
      answer:
        "BHHS Nevada Properties serves all of Las Vegas, Henderson, North Las Vegas, and surrounding areas, with specialized expertise in Summerlin, The Ridges, Skye Canyon, Southern Highlands, Green Valley, and Henderson's master-planned communities.",
    },
    {
      question: "How do Berkshire Hathaway HomeServices agents get paid?",
      answer:
        "Commission structures are negotiable. Dr. Jan Duffy offers transparent pricing and will walk you through all costs before you sign anything. For buyers, our services are typically free as commissions are paid by the seller.",
    },
    {
      question: "What is Dr. Jan Duffy's experience in Las Vegas real estate?",
      answer:
        "Dr. Jan Duffy has been serving Las Vegas since 2008, with $127M+ in closed transactions and 500+ satisfied clients. Her expertise spans residential, luxury, investment, and new construction properties throughout Southern Nevada.",
    },
  ],
  buying: [
    {
      question: "How long does the home buying process take in Las Vegas?",
      answer:
        "Typically 30-45 days from offer acceptance to closing. Cash purchases can close in as little as 7-14 days. The timeline depends on financing, inspections, and other contingencies.",
    },
    {
      question: "Do I need a pre-approval before looking at homes?",
      answer:
        "Yes, a pre-approval letter is essential. It shows sellers you're serious and gives you a clear budget. Dr. Jan can connect you with trusted local lenders who offer competitive rates.",
    },
    {
      question: "How much do I need for a down payment?",
      answer:
        "Down payment requirements vary: FHA loans require 3.5%, conventional loans typically 3-20%, and VA/USDA loans may require 0% down. Dr. Jan can connect you with lenders who specialize in various loan programs.",
    },
  ],
  selling: [
    {
      question: "What is my home worth in today's Las Vegas market?",
      answer:
        "Home values depend on location, condition, size, and recent comparable sales. Dr. Jan provides free, comprehensive home valuations using current MLS data and her expertise serving Las Vegas since 2008.",
    },
    {
      question: "How long will it take to sell my home?",
      answer:
        "Currently, well-priced homes in Las Vegas are selling in an average of 28 days. Luxury homes may take longer (45+ days). Pricing strategy is crucial—overpriced homes can sit for months.",
    },
    {
      question: "What do I need to do to prepare my home for sale?",
      answer:
        "Dr. Jan provides a personalized preparation checklist for every listing. Generally, decluttering, minor repairs, fresh paint, and professional photography are the highest-ROI improvements.",
    },
  ],
};
