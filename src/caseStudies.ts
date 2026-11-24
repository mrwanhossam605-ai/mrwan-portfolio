/**
 * Case Studies Data for Mrwan H. UI/UX Portfolio
 *
 * Source of truth for WakandaRides, FlaRide, and Al-Masilah.
 * Empty fields (empty string, empty array, undefined) do NOT render on the page.
 */

export interface CaseStudyMeta {
  client?: string;
  role?: string;
  timeline?: string;
  platform?: string;
  scope?: string;
}

export interface SectionItem {
  number: string;
  icon?: string;
  title: string;
  text?: string;
  images?: string[];
  caption?: string;
}

export interface ProblemItem {
  number: string;
  title: string;
  description: string;
}

export interface CaseStudy {
  slug: string;
  id: string;
  title: string;
  titleLines?: string[];
  figmaFile?: string;
  heroTag?: string;
  color: string;
  heroTextColor?: string;
  accentColor?: string;
  summary: string;
  meta: CaseStudyMeta;
  playStoreUrl?: string;
  websiteUrl?: string;
  behanceUrl?: string;
  liveUrl?: string;
  mockupImage: string;
  mockupSrcSet?: string;
  problems?: ProblemItem[];
  deliverables?: string[];
  sections: SectionItem[];
  nextProject?: {
    slug: string;
    title: string;
    category: string;
  };
}

export const CASE_STUDIES: Record<string, CaseStudy> = {
  wakandarides: {
    slug: 'wakandarides',
    id: '01',
    title: 'WakandaRides',
    titleLines: ['Wakanda', 'Rides'],
    figmaFile: 'wakandarides.fig',
    heroTag: 'Ride-Hailing & Carpooling • Canada • Freelance',
    color: '#FFD200', // Yellow from homepage
    heroTextColor: 'text-black',
    accentColor: '#2F5BFF',
    summary:
      'A seamless end-to-end carpooling platform connecting verified drivers with everyday commuters across Canada, with instant seat booking, live GPS tracking, and trust-first verification.',
    meta: {
      client: 'Wakanda Technology Inc.',
      role: 'UI/UX Designer',
      timeline: '',
      platform: 'Mobile App',
      scope: '70+ screens · Design system',
    },
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.wakandarides.mobile',
    websiteUrl: 'https://www.wakandarides.com/',
    behanceUrl: 'https://www.behance.net/gallery/247378851/Wakanda-Rides-UX-Case-Study',
    liveUrl: '',
    mockupImage: '/wakanda.webp',
    mockupSrcSet: '/wakanda-640.webp 640w, /wakanda.webp 1024w',
    problems: [
      {
        number: '01',
        title: 'Trust & Safety Hesitations',
        description:
          'Users were reluctant to share rides with strangers without transparent verification. I designed a tiered badge system featuring verified Government ID, university/corporate email verification, and driver safety ratings directly on the ride card.',
      },
      {
        number: '02',
        title: 'Complex Route & Seat Matching',
        description:
          'Drivers often took detours that annoyed passengers. I created an interactive route preview with pickup tolerance radius and instant seat selection, making stops transparent before booking confirmation.',
      },
      {
        number: '03',
        title: 'Friction in Payment Settlement',
        description:
          'Cash handling caused post-ride awkwardness. I integrated seamless digital wallet escrow: funds are held securely at booking and released automatically upon arrival scan or geolocation completion.',
      },
    ],
    deliverables: [
      'UX Research & Competitor Benchmarking',
      'User Personas & Journey Mapping',
      'Information Architecture & Wireframes',
      '70+ High-Fidelity UI Screens',
      'Design System (Tokens, Grids & Variants)',
      'Interactive Figma Micro-interaction Prototype',
    ],
    sections: [
      {
        number: '01',
        icon: 'Target',
        title: 'The Goal',
        text: '', // To be filled by user
        images: [],
        caption: '',
      },
      {
        number: '02',
        icon: 'AlertTriangle',
        title: 'The Challenge',
        text:
          'Commuters in Canada face rising gas prices, congested highway corridors, and fragmented public transit options. I engineered WakandaRides from the ground up to make shared mobility feel as effortless and secure as calling a private cab. From identity verification to ride matching, live route sharing, and automated split fares, I optimized every touchpoint to reduce user anxiety and build peer-to-peer trust.',
        images: [],
        caption: '',
      },
      {
        number: '03',
        icon: 'Lightbulb',
        title: 'My Solution',
        text: '', // To be filled by user
        images: [],
        caption: '',
      },
      {
        number: '04',
        icon: 'CheckCircle2',
        title: 'The Result',
        text: '', // To be filled by user
        images: [],
        caption: '',
      },
    ],
    nextProject: {
      slug: 'flaride',
      title: 'FlaRide',
      category: 'African Super App',
    },
  },

  flaride: {
    slug: 'flaride',
    id: '02',
    title: 'FlaRide',
    titleLines: ['FlaRide'],
    figmaFile: 'flaride.fig',
    heroTag: 'Mobility & On-Demand Delivery • Africa • Freelance',
    color: '#2F5BFF', // Electric Blue from homepage
    heroTextColor: 'text-white',
    accentColor: '#FFD200',
    summary:
      'An African super app unifying ride-hailing, food delivery, and parcel shipping into a single lightweight interface with zero app-switching friction and smart offline caching.',
    meta: {
      client: 'Wakanda Technology Inc.',
      role: 'UI/UX Designer',
      timeline: '',
      platform: 'Cross-platform Mobile App (Flutter handoff)',
      scope: 'Product Designer & UX Strategist (80+ screens)',
    },
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.flaride.customer',
    websiteUrl: 'https://www.flaride.com/',
    behanceUrl: 'https://www.behance.net/gallery/252000539/Flaride-UX-Case-Study',
    liveUrl: '',
    mockupImage: '/flaride.webp',
    mockupSrcSet: '/flaride-640.webp 640w, /flaride.webp 1024w',
    problems: [
      {
        number: '01',
        title: 'App-Switching & Cognitive Fatigue',
        description:
          'Users were overwhelmed by multiple unrelated actions on home screens. I designed a Color-Coded Navigation System (Green for mobility & parcel logistics, Warm Orange for food and mart delivery) that gives users an instant mental model of what mode they are operating in.',
      },
      {
        number: '02',
        title: 'Unstable Mobile Connectivity',
        description:
          'Drivers and couriers frequently lose cell connectivity in transit. I designed robust offline-first fallback states, persistent cached map paths, and SMS OTP verification when data packets drop.',
      },
      {
        number: '03',
        title: 'Diverse Local Merchant Onboarding',
        description:
          'Small restaurant owners needed an easy way to manage menus on low-end tablets. I built a simplified merchant view with oversized tap targets and quick inventory toggles.',
      },
    ],
    deliverables: [
      'Multi-Vertical Information Architecture',
      'Color-Coded Service System',
      '80+ Mobile App Screens (Light & Dark)',
      'Driver, Courier & Customer User Flows',
      'Reusable Atomic Figma Component Library',
      'Handoff Specifications for Engineering Team',
    ],
    sections: [
      {
        number: '01',
        icon: 'Target',
        title: 'The Goal',
        text: '', // To be filled by user
        images: [],
        caption: '',
      },
      {
        number: '02',
        icon: 'AlertTriangle',
        title: 'The Challenge',
        text:
          'In emerging African markets, smartphones frequently operate on constrained storage and patchy network connections. Instead of requiring users to download separate heavy apps for transportation, restaurant deliveries, and courier logistics, I consolidated all three into an ultra-fast, intuitive Super App. The core challenge was preventing visual clutter while enabling immediate cross-service discovery.',
        images: [],
        caption: '',
      },
      {
        number: '03',
        icon: 'Lightbulb',
        title: 'My Solution',
        text: '', // To be filled by user
        images: [],
        caption: '',
      },
      {
        number: '04',
        icon: 'CheckCircle2',
        title: 'The Result',
        text: '', // To be filled by user
        images: [],
        caption: '',
      },
    ],
    nextProject: {
      slug: 'almasilah',
      title: 'Al-Masilah',
      category: 'Corporate Arabic RTL Website',
    },
  },

  almasilah: {
    slug: 'almasilah',
    id: '03',
    title: 'Al-Masilah',
    titleLines: ['Al-Masilah'],
    figmaFile: 'almasilah.fig',
    heroTag: 'Corporate Web Experience • Kuwait • Remote Delivery',
    color: '#E9E4FF', // Lavender from homepage
    heroTextColor: 'text-black',
    accentColor: '#2F5BFF',
    summary:
      'A prestigious corporate digital platform for Kuwait’s leading elevator and architectural mobility company, engineered from the ground up in native Right-to-Left (RTL) Arabic typography and layout hierarchy.',
    meta: {
      client: '',
      role: 'UI/UX Designer',
      timeline: '',
      platform: 'Responsive Web (Desktop & Mobile)',
      scope: 'Corporate website, Arabic RTL',
    },
    playStoreUrl: '',
    websiteUrl: '',
    behanceUrl: 'https://www.behance.net/gallery/252041721/Al-Masilah-Elevator-Company-Website-UX-Case-Study',
    liveUrl: '',
    mockupImage: '/almasilah.webp',
    mockupSrcSet: '/almasilah-640.webp 640w, /almasilah.webp 1024w',
    problems: [
      {
        number: '01',
        title: 'Awkward Arabic Mirroring',
        description:
          'Many corporate sites simply flip English layouts horizontally without considering Arabic eye-tracking patterns. I crafted dedicated RTL grid geometry, balancing elegant Arabic headlines with high-impact architectural photography.',
      },
      {
        number: '02',
        title: 'B2B Technical Specifications vs Aesthetic Appeal',
        description:
          'Architects and contractors need technical specs (load capacities, shaft dimensions) while luxury homeowners care about cabin finishes. I designed interactive tabbed carousels that let users switch between technical data sheets and high-res aesthetic interior galleries with 1 tap.',
      },
      {
        number: '03',
        title: 'Direct Quote Inquiries Dropoff',
        description:
          'The old contact form was long and abandoned. I replaced it with a conversational, step-by-step elevator specification builder that pre-qualifies project size before connecting to sales engineering.',
      },
    ],
    deliverables: [
      'Comprehensive Arabic RTL Typography System',
      'High-Conversion B2B Quotation Funnel',
      'Responsive Breakpoints (1920px to 360px)',
      'Design Token Specifications',
      'Final Production Figma Library',
    ],
    sections: [
      {
        number: '01',
        icon: 'Target',
        title: 'The Goal',
        text: '', // To be filled by user
        images: [],
        caption: '',
      },
      {
        number: '02',
        icon: 'AlertTriangle',
        title: 'The Challenge',
        text:
          'Al-Masilah represents luxury elevator installations and heavy engineering in Kuwait and the Gulf region. The existing web presence lacked modern credibility, visual hierarchy, and failed to represent their prestigious architectural portfolio. I needed to deliver an authoritative, high-converting digital storefront with perfect Arabic RTL nuance.',
        images: [],
        caption: '',
      },
      {
        number: '03',
        icon: 'Lightbulb',
        title: 'My Solution',
        text: '', // To be filled by user
        images: [],
        caption: '',
      },
      {
        number: '04',
        icon: 'CheckCircle2',
        title: 'The Result',
        text: '', // To be filled by user
        images: [],
        caption: '',
      },
    ],
    nextProject: {
      slug: 'wakandarides',
      title: 'WakandaRides',
      category: 'Carpooling Platform',
    },
  },
};
