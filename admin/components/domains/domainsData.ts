// admin/components/domains/DomainsData.ts

export interface DomainRecord {
  id: number;
  domain: string;
  dealerName: string;
  avatarInitials: string;
  gradient: string;
  sslStatus: "Active" | "Pending" | "Failed";
  dnsStatus: "Verified" | "Pending" | "Misconfigured";
  connectedDate: string;
}

export const domainRecords: DomainRecord[] = [
  {
    id: 1,
    domain: "andersonautogroup.com",
    dealerName: "Anderson Auto Group",
    avatarInitials: "AA",
    gradient: "from-blue-500 to-cyan-500",
    sslStatus: "Active",
    dnsStatus: "Verified",
    connectedDate: "2026-01-20",
  },
  {
    id: 2,
    domain: "primemotors.com",
    dealerName: "Prime Motors",
    avatarInitials: "PM",
    gradient: "from-violet-500 to-fuchsia-500",
    sslStatus: "Active",
    dnsStatus: "Verified",
    connectedDate: "2025-11-10",
  },
  {
    id: 3,
    domain: "carterautomotive.net",
    dealerName: "Carter Automotive",
    avatarInitials: "CA",
    gradient: "from-green-500 to-emerald-500",
    sslStatus: "Pending",
    dnsStatus: "Pending",
    connectedDate: "2026-07-06",
  },
  {
    id: 4,
    domain: "eliteautosales.com",
    dealerName: "Elite Auto Sales",
    avatarInitials: "EA",
    gradient: "from-orange-500 to-red-500",
    sslStatus: "Active",
    dnsStatus: "Verified",
    connectedDate: "2025-09-25",
  },
  {
    id: 5,
    domain: "metrocarsaz.com",
    dealerName: "Metro Cars",
    avatarInitials: "MC",
    gradient: "from-sky-500 to-blue-600",
    sslStatus: "Failed",
    dnsStatus: "Misconfigured",
    connectedDate: "2026-07-02",
  },
  {
    id: 6,
    domain: "luxurydrivemiami.com",
    dealerName: "Luxury Drive",
    avatarInitials: "LD",
    gradient: "from-pink-500 to-rose-500",
    sslStatus: "Active",
    dnsStatus: "Verified",
    connectedDate: "2025-12-15",
  },
  {
    id: 7,
    domain: "sunriseautofl.com",
    dealerName: "Sunrise Auto",
    avatarInitials: "SA",
    gradient: "from-amber-500 to-orange-600",
    sslStatus: "Active",
    dnsStatus: "Verified",
    connectedDate: "2026-02-14",
  },
];

export const domainsStats = {
  totalDomains: 187,
  sslActive: 172,
  pending: 11,
  failed: 4,
};