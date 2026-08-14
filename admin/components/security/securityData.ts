// admin/components/security/securityData.ts

export interface SecurityLog {
  id: number;
  type: "Login" | "Admin Action";
  userName: string;
  userEmail: string;
  action: string;
  ipAddress: string;
  device: string;
  location: string;
  status: "Success" | "Failed" | "Suspicious";
  timestamp: string;
}

export const securityLogs: SecurityLog[] = [
  {
    id: 1,
    type: "Login",
    userName: "Alex Turner",
    userEmail: "alex@motohave.com",
    action: "Logged in to Super Admin Panel",
    ipAddress: "103.94.22.11",
    device: "Chrome on Windows",
    location: "Dhaka, Bangladesh",
    status: "Success",
    timestamp: "2026-07-08T09:12:00",
  },
  {
    id: 2,
    type: "Admin Action",
    userName: "Alex Turner",
    userEmail: "alex@motohave.com",
    action: "Updated Professional plan price ($119 → $129)",
    ipAddress: "103.94.22.11",
    device: "Chrome on Windows",
    location: "Dhaka, Bangladesh",
    status: "Success",
    timestamp: "2026-07-08T09:25:00",
  },
  {
    id: 3,
    type: "Login",
    userName: "Michael Anderson",
    userEmail: "michael@andersonauto.com",
    action: "Logged in to Dealer Dashboard",
    ipAddress: "72.14.201.88",
    device: "Safari on macOS",
    location: "Austin, TX",
    status: "Success",
    timestamp: "2026-07-08T08:40:00",
  },
  {
    id: 4,
    type: "Login",
    userName: "Unknown",
    userEmail: "kevin@metrocars.com",
    action: "Failed login attempt (wrong password x3)",
    ipAddress: "191.101.45.203",
    device: "Chrome on Android",
    location: "Unknown Location",
    status: "Failed",
    timestamp: "2026-07-08T03:15:00",
  },
  {
    id: 5,
    type: "Admin Action",
    userName: "Jordan Blake",
    userEmail: "jordan@motohave.com",
    action: "Suspended dealer account: Westside Motors",
    ipAddress: "103.94.22.45",
    device: "Chrome on Windows",
    location: "Dhaka, Bangladesh",
    status: "Success",
    timestamp: "2026-07-07T18:30:00",
  },
  {
    id: 6,
    type: "Login",
    userName: "Unknown",
    userEmail: "admin@motohave.com",
    action: "Multiple failed login attempts detected",
    ipAddress: "45.153.160.2",
    device: "Unknown Device",
    location: "Moscow, Russia",
    status: "Suspicious",
    timestamp: "2026-07-07T22:05:00",
  },
  {
    id: 7,
    type: "Admin Action",
    userName: "Alex Turner",
    userEmail: "alex@motohave.com",
    action: "Deleted dealer account: Test Dealership Inc",
    ipAddress: "103.94.22.11",
    device: "Chrome on Windows",
    location: "Dhaka, Bangladesh",
    status: "Success",
    timestamp: "2026-07-07T15:50:00",
  },
  {
    id: 8,
    type: "Login",
    userName: "Sarah Williams",
    userEmail: "sarah@primemotors.com",
    action: "Logged in to Dealer Dashboard",
    ipAddress: "68.45.190.120",
    device: "Firefox on Windows",
    location: "Dallas, TX",
    status: "Success",
    timestamp: "2026-07-07T14:10:00",
  },
  {
    id: 9,
    type: "Admin Action",
    userName: "Jordan Blake",
    userEmail: "jordan@motohave.com",
    action: "Published new testimonial from Michael Anderson",
    ipAddress: "103.94.22.45",
    device: "Chrome on Windows",
    location: "Dhaka, Bangladesh",
    status: "Success",
    timestamp: "2026-07-06T11:20:00",
  },
  {
    id: 10,
    type: "Login",
    userName: "Unknown",
    userEmail: "unknown@example.com",
    action: "Login attempt with invalid credentials",
    ipAddress: "185.220.101.47",
    device: "Unknown Device",
    location: "Unknown Location",
    status: "Suspicious",
    timestamp: "2026-07-06T02:45:00",
  },
];

export const securityStats = {
  loginsToday: 24,
  failedAttempts: 3,
  activeSessions: 468,
  suspiciousAlerts: 2,
};