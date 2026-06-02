export type UserRole =
  | "admin"
  | "omra_hajj_manager"
  | "ticketing_manager"
  | "destinations_manager"
  | "readonly";

export type ClientCategory =
  | "omra"
  | "hajj"
  | "visa"
  | "flight_tickets"
  | "touristic_stays"
  | "organized_trips"
  | "other";

export type ClientLanguage = "fr" | "ar" | "darija" | "mixed_fr_ar";

export type CampaignStatus =
  | "draft"
  | "ai_generation"
  | "pending_validation"
  | "scheduled"
  | "sending"
  | "paused"
  | "completed";

export type MessageStatus =
  | "draft"
  | "pending_validation"
  | "approved"
  | "rejected"
  | "scheduled"
  | "sent"
  | "stopped";

export type ReviewStatus = "new" | "reply_generated" | "reply_approved" | "reply_published";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  serviceScope: ClientCategory[];
  isActive: boolean;
  createdAt: string;
}

export interface WhatsAppNumber {
  id: string;
  label: string;
  phone: string;
  serviceScope: ClientCategory[];
  isAdminNumber: boolean;
  isActive: boolean;
}

export interface Client {
  id: string;
  firstName: string;
  lastName?: string;
  whatsappPhone: string;
  category: ClientCategory;
  language: ClientLanguage;
  serviceType?: string;
  travelPeriod?: string;
  internalNote?: string;
  assignedUserId?: string;
  whatsappOptOut: boolean;
  importedAt: string;
}

export interface Campaign {
  id: string;
  name: string;
  category: ClientCategory;
  language: ClientLanguage;
  status: CampaignStatus;
  dailyLimit: number;
  startDate: string;
  endDate?: string;
  googleReviewUrl: string;
  whatsappNumberId: string;
  ownerUserId: string;
  createdAt: string;
}

export interface AiGeneratedMessage {
  id: string;
  campaignId: string;
  clientId: string;
  invitationText: string;
  suggestedReviewText: string;
  mandatoryFreedomNotice: string;
  similarityScore?: number;
  status: MessageStatus;
  generatedAt: string;
  approvedByUserId?: string;
  approvedAt?: string;
  sentAt?: string;
}

export interface AntiRushRecommendation {
  id: string;
  campaignId: string;
  recommendedDailyLimit: number;
  recommendedTimeWindows: string[];
  riskLevel: "low" | "moderate" | "high";
  advice: string;
  createdAt: string;
}

export interface GoogleReview {
  id: string;
  authorName: string;
  rating: number;
  text: string;
  language?: ClientLanguage;
  receivedAt: string;
  category?: ClientCategory;
  status: ReviewStatus;
}

export interface ReviewReplyDraft {
  id: string;
  reviewId: string;
  replyText: string;
  status: "pending_validation" | "approved" | "published" | "rejected";
  generatedAt: string;
  approvedByUserId?: string;
  publishedAt?: string;
}

export interface AuditLogEntry {
  id: string;
  actorUserId: string;
  action:
    | "client_imported"
    | "campaign_created"
    | "message_generated"
    | "message_approved"
    | "message_sent"
    | "review_received"
    | "reply_generated"
    | "reply_approved"
    | "reply_published"
    | "settings_changed";
  entityType: "client" | "campaign" | "message" | "review" | "reply" | "settings";
  entityId: string;
  details?: string;
  createdAt: string;
}
