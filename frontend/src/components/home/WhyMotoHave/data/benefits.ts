import { FeatureItem, TrustItem } from '../types';

export const featuresData: FeatureItem[] = [
  {
    id: 'inventory',
    title: 'Inventory Management',
    subtitle: 'Manage unlimited vehicles, pricing, media and publishing.',
    description: 'Keep your digital showroom updated across all channels instantly with smart VIN decoding and automated media management.',
    icon: 'Car',
    details: [
      'Unlimited Vehicle Listings',
      'Instant VIN Decoding & Specs',
      'High-Res Media Gallery & Watermarking',
      'Dynamic Pricing & Cost Tracking',
      'Real-time Availability & Status Sync'
    ],
    metrics: { label: 'Inventory Sync Speed', value: '< 0.2s' }
  },
  {
    id: 'crm',
    title: 'Lead CRM',
    subtitle: 'Track buyers from first click to keys handed over.',
    description: 'Never lose a hot lead again. Centralize inquiries from Facebook, WhatsApp, and walk-ins into a unified smart pipeline.',
    icon: 'Users',
    details: [
      'Visual Drag-and-Drop Lead Pipeline',
      'Instant WhatsApp & SMS Integration',
      'Automated Task Reminders & Follow-ups',
      'Comprehensive Customer Notes & History',
      'Sales Agent Performance Tracking'
    ],
    metrics: { label: 'Lead Conversion Boost', value: '+45%' }
  },
  {
    id: 'website',
    title: 'Website Builder',
    subtitle: 'Launch a lightning-fast showroom website in minutes.',
    description: 'Showcase your inventory with a stunning, mobile-optimized dealership website featuring your own custom domain.',
    icon: 'Layout',
    details: [
      'Zero-Code Drag & Drop Editor',
      'Built-in Advanced Auto SEO',
      'Lightning-Fast Cloud Hosting',
      'Fully Mobile Responsive Layouts',
      'Custom Domain Integration'
    ],
    metrics: { label: 'Page Load Speed', value: '99/100' }
  },
  {
    id: 'ai',
    title: 'AI Automation',
    subtitle: 'Let AI handle inquiries and book appointments 24/7.',
    description: 'Engage midnight buyers instantly. Our intelligent AI replies to inquiries, qualifies leads, and schedules test drives automatically.',
    icon: 'Bot',
    details: [
      'Instant 24/7 AI Chatbot Replies',
      'Automated Lead Qualification',
      'Smart Test Drive Appointment Booking',
      'Context-Aware WhatsApp Assistant',
      'AI-Powered Email Responses'
    ],
    metrics: { label: 'Response Time', value: 'Instant' }
  },
  {
    id: 'payments',
    title: 'Online Payments',
    subtitle: 'Secure digital invoicing and deposit collection.',
    description: 'Accept booking fees, down payments, and recurring subscription fees securely with integrated global and local gateways.',
    icon: 'CreditCard',
    details: [
      'Stripe & SSLCommerz Integration',
      'Instant Digital Invoicing',
      'Secure Deposit & Booking Collection',
      'Automated Payment Receipts',
      'Transaction & Revenue History'
    ],
    metrics: { label: 'Checkout Success', value: '99.9%' }
  },
  {
    id: 'analytics',
    title: 'Analytics & Insights',
    subtitle: 'Make data-driven decisions for your dealership business.',
    description: 'Monitor daily visitor traffic, active leads, gross revenue, conversion rates, and your top-performing vehicle models in real-time.',
    icon: 'BarChart3',
    details: [
      'Real-time Visitor & Traffic Tracking',
      'Lead Conversion Rate Breakdown',
      'Gross Revenue & Profit Analytics',
      'Top-Performing Vehicle Insights',
      'Exportable Financial Reports'
    ],
    metrics: { label: 'Data Accuracy', value: '100%' }
  },
  {
    id: 'marketing',
    title: 'Marketing Tools',
    subtitle: 'Run targeted ad campaigns and push specials instantly.',
    description: 'Push your inventory directly to Facebook Marketplace, Google Vehicle Ads, and broadcast promotional SMS or email blasts.',
    icon: 'Megaphone',
    details: [
      'Facebook & Instagram Sync',
      'Google Vehicle Ads Integration',
      'Automated Email & SMS Campaigns',
      'Promotional Banner Generator',
      'ROI Tracker for Marketing Spend'
    ],
    metrics: { label: 'Campaign Reach', value: '3x' }
  },
  {
    id: 'team',
    title: 'Team Management',
    subtitle: 'Empower your sales force with role-based access.',
    description: 'Manage staff permissions, assign specific leads to sales reps, track individual closes, and streamline internal communication.',
    icon: 'ShieldCheck',
    details: [
      'Role-Based Access Control',
      'Lead Assignment Rules & Routing',
      'Sales Rep Commission Tracking',
      'Internal Team Notes & Mentions',
      'Activity Logs & Audit Trails'
    ],
    metrics: { label: 'Team Efficiency', value: '+60%' }
  }
];

export const trustBadges: TrustItem[] = [
  { title: 'No Coding Required', description: 'Launch instantly without developers', icon: 'Code' },
  { title: '5 Minute Setup', description: 'Import your stock and go live', icon: 'Zap' },
  { title: 'Cloud Hosted', description: '99.99% uptime guaranteed', icon: 'Cloud' },
  { title: 'Mobile Friendly', description: 'Manage on iOS and Android', icon: 'Smartphone' },
  { title: 'SEO Ready', description: 'Rank higher on Google searches', icon: 'Search' },
  { title: 'Bank-Grade Secure', description: 'Encrypted database security', icon: 'Lock' },
  { title: 'Daily Backup', description: 'Your business data is always safe', icon: 'Database' },
  { title: '24/7 Expert Support', description: 'We are here whenever you need', icon: 'Headphones' }
];