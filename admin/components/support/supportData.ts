// admin/components/support/supportData.ts

export interface TicketMessage {
  id: number;
  sender: "dealer" | "admin";
  senderName: string;
  message: string;
  timestamp: string;
}

export interface SupportTicket {
  id: number;
  subject: string;
  dealerName: string;
  dealerEmail: string;
  avatarInitials: string;
  gradient: string;
  status: "Open" | "In Progress" | "Resolved";
  priority: "Low" | "Medium" | "High";
  category: string;
  createdAt: string;
  messages: TicketMessage[];
}

export const supportTickets: SupportTicket[] = [
  {
    id: 1,
    subject: "Unable to upload vehicle images",
    dealerName: "Anderson Auto Group",
    dealerEmail: "michael@andersonauto.com",
    avatarInitials: "AA",
    gradient: "from-blue-500 to-cyan-500",
    status: "Open",
    priority: "High",
    category: "Technical",
    createdAt: "2026-07-08T09:15:00",
    messages: [
      {
        id: 1,
        sender: "dealer",
        senderName: "Michael Anderson",
        message: "I keep getting an error when trying to upload photos for our new BMW listing. It says 'upload failed' every time, even with small file sizes.",
        timestamp: "2026-07-08T09:15:00",
      },
    ],
  },
  {
    id: 2,
    subject: "Billing question about annual plan",
    dealerName: "Prime Motors",
    dealerEmail: "sarah@primemotors.com",
    avatarInitials: "PM",
    gradient: "from-violet-500 to-fuchsia-500",
    status: "In Progress",
    priority: "Medium",
    category: "Billing",
    createdAt: "2026-07-07T14:30:00",
    messages: [
      {
        id: 1,
        sender: "dealer",
        senderName: "Sarah Williams",
        message: "We're on the Enterprise yearly plan. Can you confirm our next billing date and whether we can add 2 more team members mid-cycle?",
        timestamp: "2026-07-07T14:30:00",
      },
      {
        id: 2,
        sender: "admin",
        senderName: "Support Team",
        message: "Hi Sarah, your next billing date is Nov 2, 2026. Yes, you can add team members anytime — it won't affect your current billing cycle since Enterprise includes unlimited team members.",
        timestamp: "2026-07-07T16:45:00",
      },
    ],
  },
  {
    id: 3,
    subject: "CRM lead notifications not working",
    dealerName: "Carter Automotive",
    dealerEmail: "daniel@carterauto.com",
    avatarInitials: "DC",
    gradient: "from-green-500 to-emerald-500",
    status: "Open",
    priority: "High",
    category: "Technical",
    createdAt: "2026-07-08T07:50:00",
    messages: [
      {
        id: 1,
        sender: "dealer",
        senderName: "Daniel Carter",
        message: "We stopped receiving email notifications for new leads since yesterday. Our sales team is missing potential customers.",
        timestamp: "2026-07-08T07:50:00",
      },
    ],
  },
  {
    id: 4,
    subject: "How to connect custom domain?",
    dealerName: "Elite Auto Sales",
    dealerEmail: "jessica@eliteauto.com",
    avatarInitials: "EA",
    gradient: "from-orange-500 to-red-500",
    status: "Resolved",
    priority: "Low",
    category: "General",
    createdAt: "2026-07-05T11:20:00",
    messages: [
      {
        id: 1,
        sender: "dealer",
        senderName: "Jessica Brown",
        message: "We bought a domain from GoDaddy and want to use it for our MotoHave website. What DNS records do we need to add?",
        timestamp: "2026-07-05T11:20:00",
      },
      {
        id: 2,
        sender: "admin",
        senderName: "Support Team",
        message: "Great question! You'll need to add a CNAME record pointing to sites.motohave.com. I've sent detailed step-by-step instructions to your email.",
        timestamp: "2026-07-05T13:10:00",
      },
      {
        id: 3,
        sender: "dealer",
        senderName: "Jessica Brown",
        message: "Got it working, thank you so much!",
        timestamp: "2026-07-05T15:40:00",
      },
    ],
  },
  {
    id: 5,
    subject: "Payment failed for subscription renewal",
    dealerName: "Metro Cars",
    dealerEmail: "kevin@metrocars.com",
    avatarInitials: "MC",
    gradient: "from-sky-500 to-blue-600",
    status: "In Progress",
    priority: "High",
    category: "Billing",
    createdAt: "2026-07-04T16:00:00",
    messages: [
      {
        id: 1,
        sender: "dealer",
        senderName: "Kevin Martinez",
        message: "We got an email saying our payment failed but our card should be valid. Can someone check what's going on?",
        timestamp: "2026-07-04T16:00:00",
      },
      {
        id: 2,
        sender: "admin",
        senderName: "Support Team",
        message: "Looking into this now, I can see the charge was declined by your bank. Could you confirm if the card has sufficient funds or try an alternate payment method?",
        timestamp: "2026-07-04T17:15:00",
      },
    ],
  },
  {
    id: 6,
    subject: "Feature request: bulk vehicle import",
    dealerName: "Sunrise Auto",
    dealerEmail: "laura@sunriseauto.com",
    avatarInitials: "SA",
    gradient: "from-amber-500 to-orange-600",
    status: "Open",
    priority: "Low",
    category: "Feature Request",
    createdAt: "2026-07-06T10:05:00",
    messages: [
      {
        id: 1,
        sender: "dealer",
        senderName: "Laura Diaz",
        message: "Would love a CSV import option to bulk add vehicles instead of adding them one by one. We have 180+ vehicles to migrate from our old system.",
        timestamp: "2026-07-06T10:05:00",
      },
    ],
  },
];

export const supportStats = {
  openTickets: 3,
  inProgress: 2,
  resolvedToday: 4,
  avgResponseHours: 2.4,
};