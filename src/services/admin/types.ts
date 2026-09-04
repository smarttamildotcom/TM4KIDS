/** Shared types for the admin dashboard data model. */

export type AdminMemberStatus = "Active" | "Pending" | "Rejected" | "Free";

export type PaymentMethod = "PayNow" | "Bank Transfer" | "Card";

export type PaymentStatus = "Paid" | "Pending" | "Rejected";

export type RequestStatus = "Pending" | "Approved" | "Rejected" | "More Info";

export type AdminMember = {
  id: string;
  name: string;
  email: string;
  country: string;
  dateJoined: string;
  status: AdminMemberStatus;
  worldsCompleted: number;
  totalWorlds: number;
  certificateIssued: boolean;
  certificateNumber?: string;
  lastLogin?: string;
};

export type MembershipRequest = {
  id: string;
  memberId?: string;
  name: string;
  email: string;
  country: string;
  paymentMethod: PaymentMethod;
  transactionReference: string;
  contributionAmount: number;
  dateSubmitted: string;
  status: RequestStatus;
};

export type Payment = {
  id: string;
  name: string;
  method: PaymentMethod;
  amount: number;
  status: PaymentStatus;
  date: string;
  reference: string;
};

export type Certificate = {
  id: string;
  name: string;
  email?: string;
  certificateNumber: string;
  completionDate: string;
};

export type CsrDonation = {
  id: string;
  organisation: string;
  amount: number;
  date: string;
  notes?: string;
  receiptName?: string;
};

export type AdminSettings = {
  membershipPrice: number;
  notificationEmail: string;
  payNowQrImage?: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  csrDescription: string;
  founderMessage: string;
};

export type AdminData = {
  members: AdminMember[];
  requests: MembershipRequest[];
  payments: Payment[];
  certificates: Certificate[];
  donations: CsrDonation[];
  settings: AdminSettings;
};
