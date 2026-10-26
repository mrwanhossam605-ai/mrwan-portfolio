/**
 * Full Case Studies Data for Mrwan H. UI/UX Portfolio
 */

export const CASE_STUDIES = {
  wakandarides: {
    slug: 'wakandarides',
    id: '01',
    title: 'WakandaRides',
    figmaFile: 'wakandarides.fig',
    badge: 'Carpooling Platform',
    heroTag: 'Ride-Hailing & Carpooling • Canada • Freelance',
    color: '#FF4800', // Vibrant Orange Neubrutalist Hero
    accentColor: '#3B82F6',
    secondaryColor: '#FFD200',
    summary:
      'A seamless end-to-end carpooling platform connecting verified drivers with everyday commuters across Canada, with instant seat booking, live GPS tracking, and trust-first verification.',
    metrics: [
      { label: 'Platform Screens', value: '70+', detail: 'iOS, Android & Web' },
      { label: 'Booking Flow', value: '1 Flow', detail: 'Shared 3-step checkout' },
      { label: 'Hand-off Speed', value: '2x', detail: 'Tokens & Component library' },
    ],
    mockupImage: '/wakanda.webp',
    mockupSrcSet: '/wakanda-640.webp 640w, /wakanda.webp 1024w',
    sidebar: {
      role: 'Lead UI/UX & Design Systems Designer',
      client: 'Wakanda Mobility (Canada)',
      timeline: '3 Months (End-to-end delivery)',
      platform: 'Mobile App (iOS & Android) + Responsive Web',
      tools: ['Figma', 'FigJam', 'Photoshop', 'Illustrator'],
    },
    overview:
      'Commuters in Canada face rising gas prices, congested highway corridors, and fragmented public transit options. WakandaRides was engineered from the ground up to make shared mobility feel as effortless and secure as calling a private cab. From identity verification to ride matching, live route sharing, and automated split fares, every touchpoint was optimized to reduce user anxiety and build peer-to-peer trust.',
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
          'Cash handling caused post-ride awkwardness. We integrated seamless digital wallet escrow: funds are held securely at booking and released automatically upon arrival scan or geolocation completion.',
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
    color: '#FF4800',
    accentColor: '#3B82F6',
    secondaryColor: '#FFD200',
    summary:
      'An African super app unifying ride-hailing, food delivery, and parcel shipping into a single lightweight interface with zero app-switching friction and smart offline caching.',
    metrics: [
      { label: 'Total UI Screens', value: '80+', detail: '3 service verticals' },
      { label: 'Cognitive Load', value: '-35%', detail: 'Color-coded navigation' },
      { label: 'Design System', value: '1 Unified', detail: 'Scalable across services' },
    ],
    mockupImage: '/flaride.webp',
    mockupSrcSet: '/flaride-640.webp 640w, /flaride.webp 1024w',
    sidebar: {
      role: 'Product Designer & UX Strategist',
      client: 'FlaRide Technologies',
      timeline: '4 Months',
      platform: 'Cross-platform Mobile App (Flutter handoff)',
      tools: ['Figma', 'Notion', 'Photoshop', 'Claude AI (UX Synthesis)'],
    },
    overview:
      'In emerging African markets, smartphones frequently operate on constrained storage and patchy network connections. Instead of requiring users to download separate heavy apps for transportation, restaurant deliveries, and courier logistics, FlaRide consolidates all three into an ultra-fast, intuitive Super App. The core challenge was preventing visual clutter while enabling immediate cross-service discovery.',
    problems: [
      {
        number: '01',
        title: 'App-Switching & Cognitive Fatigue',
        description:
          'Users were overwhelmed by multiple unrelated actions on home screens. I invented a proprietary Color-Coded Navigation System (Green for mobility & parcel logistics, Warm Orange for food and mart delivery) that gives users an instant mental model of what mode they are operating in.',
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
    color: '#FF4800',
    accentColor: '#3B82F6',
    secondaryColor: '#FFD200',
    summary:
      'A prestigious corporate digital platform for Kuwait’s leading elevator and architectural mobility company, engineered from the ground up in native Right-to-Left (RTL) Arabic typography and layout hierarchy.',
    metrics: [
      { label: 'Responsive Pages', value: '4 Key Pages', detail: 'Desktop + Tablet + Mobile' },
      { label: 'Client Feedback', value: '0 Revisions', detail: 'Approved on first delivery' },
      { label: 'RTL Alignment', value: '100%', detail: 'Natural Arabic reading flow' },
    ],
    mockupImage: '/almasilah.webp',
    mockupSrcSet: '/almasilah-640.webp 640w, /almasilah.webp 1024w',
    sidebar: {
      role: 'Lead Web Designer & Visual Architect',
      client: 'Al-Maseela Elevators Co. (Kuwait)',
      timeline: '1 Month',
      platform: 'Responsive Web (Desktop & Mobile)',
      tools: ['Figma', 'Illustrator', 'Space Grotesk & Arabic Typography'],
    },
    overview:
      'Al-Maseela Company represents luxury elevator installations and heavy engineering in Kuwait and the Gulf region. The existing web presence lacked modern credibility, visual hierarchy, and failed to represent their prestigious architectural portfolio. The client needed an authoritative, high-converting digital storefront completed with zero friction and perfect Arabic RTL nuance.',
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
      'Final Production Figma Library with Zero Scope Creep',
    ],
    nextProject: {
      slug: 'vienna-games',
      title: 'Vienna Games',
      category: 'Esports Platform',
    },
  },

  'vienna-games': {
    slug: 'vienna-games',
    id: '04',
    title: 'Vienna Games',
    figmaFile: 'vienna-games.fig',
    badge: 'Gaming Platform',
    heroTag: 'Interactive Entertainment • Global • Case Study',
    color: '#FF4800',
    accentColor: '#3B82F6',
    secondaryColor: '#FFD200',
    summary:
      'An immersive e-sports and competitive gaming community hub combining live tournament brackets, player profile achievements, and instant match lobbies in a high-voltage Neubrutalist aesthetic.',
    metrics: [
      { label: 'Lobby Match Speed', value: '< 15s', detail: 'Instant queue flows' },
      { label: 'Gamification Badges', value: '32 Items', detail: 'Custom reward system' },
      { label: 'Platform Readiness', value: '100%', detail: 'Desktop + Steam Deck' },
    ],
    mockupImage: '/wakanda.webp',
    mockupSrcSet: '/wakanda-640.webp 640w, /wakanda.webp 1024w',
    sidebar: {
      role: 'UI/UX & Gamification Architect',
      client: 'Vienna Games Lab',
      timeline: '2 Months',
      platform: 'Web App & Gaming Client',
      tools: ['Figma', 'After Effects', 'Photoshop'],
    },
    overview:
      'Competitive gamers demand instant information: match status, bracket progression, and ping latency without distracting visual fluff. Vienna Games was designed as an electrifying digital playground that pairs arcade-level energy with clean, brutalist information hierarchy.',
    problems: [
      {
        number: '01',
        title: 'Overcrowded Tournament Brackets',
        description:
          'Complex 64-team double-elimination brackets were illegible on standard monitors. I designed a pan-and-zoom interactive bracket viewer with clear win/loss contrast and live score updates.',
      },
      {
        number: '02',
        title: 'Lack of Retention Incentives',
        description:
          'Players churned after individual match losses. I introduced a dynamic XP & collectible badge system that rewards sportsmanship, team play, and daily challenges.',
      },
      {
        number: '03',
        title: 'Lag & Visual Heavy Weight',
        description:
          'Previous game sites suffered from heavy 3D assets that slowed load times. I leveraged vector SVG sprites and high-contrast Neubrutalist typography to achieve 60fps responsiveness.',
      },
    ],
    deliverables: [
      'Interactive Tournament Bracket UI',
      'Gamification Reward Engine & Badges',
      'Player Stats Dashboard & Match History',
      'Dark/Light High-Voltage Neubrutalist UI Kit',
    ],
    nextProject: {
      slug: 'wakandarides',
      title: 'WakandaRides',
      category: 'Carpooling Platform',
    },
  },
};
