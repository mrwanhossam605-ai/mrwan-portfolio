/**
 * Full Case Studies Data for Mrwan H. UI/UX Portfolio
 *
 * Empty fields are hidden on the page – fill them in when ready.
 * gallery: array of { image, caption } – drives the "Process & Screens" grid.
 * designSystem: array of { image, caption } – drives the "Design System" subsection.
 * rtlShowcase: { heading, body } – Al-Masilah Arabic RTL sample (hidden when empty).
 */

export const CASE_STUDIES = {
  wakandarides: {
    slug: 'wakandarides',
    id: '01',
    title: 'WakandaRides',
    figmaFile: 'wakandarides.fig',
    badge: 'Carpooling Platform',
    heroTag: 'Ride-Hailing & Carpooling • Canada • Freelance',
    // Hero card color from homepage (yellow)
    color: '#FFD200',
    heroTextColor: 'text-black',
    accentColor: '#3B82F6',
    secondaryColor: '#FFD200',
    summary:
      'A seamless end-to-end carpooling platform connecting verified drivers with everyday commuters across Canada, with instant seat booking, live GPS tracking, and trust-first verification.',
    metrics: [
      { label: 'Platform Screens', value: '70+', detail: 'iOS, Android & Web' },
      { label: 'Design System', value: 'Full', detail: 'Tokens, Grids & Variants' },
    ],
    mockupImage: '/wakanda.webp',
    mockupSrcSet: '/wakanda-640.webp 640w, /wakanda.webp 1024w',
    sidebar: {
      role: 'UI/UX Designer',
      scope: 'Lead UI/UX & Design Systems Designer',
      client: '',
      timeline: '',
      platform: 'Mobile App (iOS & Android) + Responsive Web',
      tools: ['Figma', 'FigJam', 'Photoshop', 'Illustrator'],
    },
    overview:
      'Commuters in Canada face rising gas prices, congested highway corridors, and fragmented public transit options. I engineered WakandaRides from the ground up to make shared mobility feel as effortless and secure as calling a private cab. From identity verification to ride matching, live route sharing, and automated split fares, I optimized every touchpoint to reduce user anxiety and build peer-to-peer trust.',
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
    // Process & Screens gallery – add { image: '/path.webp', caption: 'Description' }
    gallery: [],
    // Design System gallery – add { image: '/path.webp', caption: 'Description' }
    designSystem: [],
    // Arabic RTL showcase (not applicable for this project)
    rtlShowcase: null,
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
    figmaFile: 'flaride.fig',
    badge: 'Super App Platform',
    heroTag: 'Mobility & On-Demand Delivery • Africa • Freelance',
    // Hero card color from homepage (blue)
    color: '#2F5BFF',
    heroTextColor: 'text-white',
    accentColor: '#3B82F6',
    secondaryColor: '#FFD200',
    summary:
      'An African super app unifying ride-hailing, food delivery, and parcel shipping into a single lightweight interface with zero app-switching friction and smart offline caching.',
    metrics: [
      { label: 'Total UI Screens', value: '80+', detail: 'Across 3 service verticals' },
      { label: 'Theme Modes', value: 'Light & Dark', detail: 'Full coverage' },
      { label: 'Service Verticals', value: '3', detail: 'Rides, Food & Parcels' },
    ],
    mockupImage: '/flaride.webp',
    mockupSrcSet: '/flaride-640.webp 640w, /flaride.webp 1024w',
    sidebar: {
      role: 'UI/UX Designer',
      scope: 'Product Designer & UX Strategist',
      client: '',
      timeline: '',
      platform: 'Cross-platform Mobile App (Flutter handoff)',
      tools: ['Figma', 'Notion', 'Photoshop'],
    },
    overview:
      'In emerging African markets, smartphones frequently operate on constrained storage and patchy network connections. Instead of requiring users to download separate heavy apps for transportation, restaurant deliveries, and courier logistics, I consolidated all three into an ultra-fast, intuitive Super App. The core challenge was preventing visual clutter while enabling immediate cross-service discovery.',
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
    gallery: [],
    designSystem: [],
    rtlShowcase: null,
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
    figmaFile: 'almasilah.fig',
    badge: 'Arabic RTL Corporate Web',
    heroTag: 'Corporate Web Experience • Kuwait • Remote Delivery',
    // Hero card color from homepage (lavender)
    color: '#E9E4FF',
    heroTextColor: 'text-black',
    accentColor: '#3B82F6',
    secondaryColor: '#FFD200',
    summary:
      'A prestigious corporate digital platform for Kuwait\u2019s leading elevator and architectural mobility company, engineered from the ground up in native Right-to-Left (RTL) Arabic typography and layout hierarchy.',
    metrics: [
      { label: 'Layout Direction', value: 'Arabic RTL', detail: 'Natural Arabic reading flow' },
      { label: 'Responsive Range', value: '1920 \u2013 360px', detail: 'Desktop, Tablet & Mobile' },
    ],
    mockupImage: '/almasilah.webp',
    mockupSrcSet: '/almasilah-640.webp 640w, /almasilah.webp 1024w',
    sidebar: {
      role: 'UI/UX Designer',
      scope: 'Lead Web Designer & Visual Architect',
      client: '',
      timeline: '',
      platform: 'Responsive Web (Desktop & Mobile)',
      tools: ['Figma', 'Illustrator', 'Space Grotesk & Arabic Typography'],
    },
    overview:
      'Al-Masilah represents luxury elevator installations and heavy engineering in Kuwait and the Gulf region. The existing web presence lacked modern credibility, visual hierarchy, and failed to represent their prestigious architectural portfolio. I needed to deliver an authoritative, high-converting digital storefront with perfect Arabic RTL nuance.',
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
    gallery: [],
    designSystem: [],
    // Arabic RTL Showcase – set heading and body to show the section
    rtlShowcase: {
      heading: '\u0634\u0631\u0643\u0629 \u0627\u0644\u0645\u0633\u064A\u0644\u0629 \u0644\u0644\u0645\u0635\u0627\u0639\u062F',
      body: '\u0646\u0635\u0645\u0651\u0645 \u0648\u0646\u064F\u0646\u0641\u0651\u0630 \u0623\u0641\u062E\u0645 \u0627\u0644\u0645\u0635\u0627\u0639\u062F \u0627\u0644\u0645\u0639\u0645\u0627\u0631\u064A\u0629 \u0641\u064A \u0627\u0644\u0643\u0648\u064A\u062A \u0648\u0627\u0644\u062E\u0644\u064A\u062C \u2014 \u0628\u062F\u0642\u0651\u0629 \u0647\u0646\u062F\u0633\u064A\u0629 \u0648\u0644\u0645\u0633\u0629 \u0641\u0627\u062E\u0631\u0629.',
    },
    nextProject: {
      slug: 'wakandarides',
      title: 'WakandaRides',
      category: 'Carpooling Platform',
    },
  },
};
