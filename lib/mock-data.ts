import type {
  AiGeneratedMessage,
  AntiRushRecommendation,
  AppUser,
  AuditLogEntry,
  Campaign,
  Client,
  GoogleReview,
  WhatsAppNumber
} from "./types";

export const appUsers: AppUser[] = [
  {
    id: "user-admin",
    name: "Admin Voyages 21",
    email: "admin@voyages21.example",
    phone: "+212600000000",
    role: "admin",
    serviceScope: ["omra", "hajj", "visa", "flight_tickets", "touristic_stays", "organized_trips", "other"],
    isActive: true,
    createdAt: "2026-06-03T09:00:00.000Z"
  },
  {
    id: "user-omra",
    name: "Responsable Omra/Hajj",
    email: "omra@voyages21.example",
    role: "omra_hajj_manager",
    serviceScope: ["omra", "hajj"],
    isActive: true,
    createdAt: "2026-06-03T09:10:00.000Z"
  },
  {
    id: "user-ticketing",
    name: "Responsable billetterie",
    email: "billetterie@voyages21.example",
    role: "ticketing_manager",
    serviceScope: ["flight_tickets"],
    isActive: true,
    createdAt: "2026-06-03T09:20:00.000Z"
  }
];

export const whatsappNumbers: WhatsAppNumber[] = [
  {
    id: "wa-admin",
    label: "Admin general",
    phone: "+212600000000",
    serviceScope: ["omra", "hajj", "visa", "flight_tickets", "touristic_stays", "organized_trips", "other"],
    isAdminNumber: true,
    isActive: true
  },
  {
    id: "wa-omra",
    label: "Omra et Hajj",
    phone: "+212600000001",
    serviceScope: ["omra", "hajj"],
    isAdminNumber: false,
    isActive: true
  },
  {
    id: "wa-ticketing",
    label: "Billetterie",
    phone: "+212600000002",
    serviceScope: ["flight_tickets"],
    isAdminNumber: false,
    isActive: true
  }
];

export const clients: Client[] = [
  {
    id: "client-001",
    firstName: "Kawtar",
    lastName: "A.",
    whatsappPhone: "+212600111111",
    category: "omra",
    language: "ar",
    serviceType: "Omra accompagnee",
    travelPeriod: "Ramadan 2023",
    assignedUserId: "user-omra",
    whatsappOptOut: false,
    importedAt: "2026-06-03T10:00:00.000Z"
  },
  {
    id: "client-002",
    firstName: "Youssef",
    lastName: "B.",
    whatsappPhone: "+212600222222",
    category: "flight_tickets",
    language: "fr",
    serviceType: "Billet d'avion",
    travelPeriod: "2024",
    assignedUserId: "user-ticketing",
    whatsappOptOut: false,
    importedAt: "2026-06-03T10:05:00.000Z"
  },
  {
    id: "client-003",
    firstName: "Samira",
    lastName: "E.",
    whatsappPhone: "+212600333333",
    category: "touristic_stays",
    language: "darija",
    serviceType: "Sejour touristique",
    travelPeriod: "Ete 2022",
    assignedUserId: "user-admin",
    whatsappOptOut: false,
    importedAt: "2026-06-03T10:10:00.000Z"
  }
];

export const campaigns: Campaign[] = [
  {
    id: "campaign-omra-001",
    name: "Anciens clients Omra",
    category: "omra",
    language: "ar",
    status: "pending_validation",
    dailyLimit: 12,
    startDate: "2026-06-04",
    googleReviewUrl: "https://g.page/r/example-review-link",
    whatsappNumberId: "wa-omra",
    ownerUserId: "user-omra",
    createdAt: "2026-06-03T11:00:00.000Z"
  },
  {
    id: "campaign-ticketing-001",
    name: "Billetterie 2024-2025",
    category: "flight_tickets",
    language: "fr",
    status: "scheduled",
    dailyLimit: 8,
    startDate: "2026-06-05",
    googleReviewUrl: "https://g.page/r/example-review-link",
    whatsappNumberId: "wa-ticketing",
    ownerUserId: "user-ticketing",
    createdAt: "2026-06-03T11:15:00.000Z"
  }
];

export const generatedMessages: AiGeneratedMessage[] = [
  {
    id: "msg-001",
    campaignId: "campaign-omra-001",
    clientId: "client-001",
    invitationText: "Bonjour Kawtar, ici Voyages 21. Si vous gardez un souvenir de votre experience Omra avec nous, meme ancienne, votre avis honnete sur Google nous aiderait beaucoup.",
    suggestedReviewText: "J'ai garde un tres bon souvenir de mon experience Omra avec Voyages 21. L'accompagnement etait serieux, l'organisation claire et l'equipe disponible avant et pendant le voyage.",
    mandatoryFreedomNotice: "Voici une suggestion que vous pouvez adapter librement. Vous pouvez aussi l'ignorer ou ecrire votre propre avis selon votre experience reelle avec Voyages 21.",
    similarityScore: 0.18,
    status: "pending_validation",
    generatedAt: "2026-06-03T12:00:00.000Z"
  },
  {
    id: "msg-002",
    campaignId: "campaign-ticketing-001",
    clientId: "client-002",
    invitationText: "Bonjour Youssef, merci d'avoir fait confiance a Voyages 21 pour votre billet d'avion. Votre retour honnete sur Google nous aiderait beaucoup.",
    suggestedReviewText: "Voyages 21 m'a aide pour ma reservation de billet avec un suivi clair et une bonne disponibilite. L'equipe a ete professionnelle et rassurante.",
    mandatoryFreedomNotice: "Voici une suggestion que vous pouvez adapter librement. Vous pouvez aussi l'ignorer ou ecrire votre propre avis selon votre experience reelle avec Voyages 21.",
    similarityScore: 0.12,
    status: "approved",
    generatedAt: "2026-06-03T12:05:00.000Z",
    approvedByUserId: "user-admin",
    approvedAt: "2026-06-03T12:30:00.000Z"
  }
];

export const antiRushRecommendations: AntiRushRecommendation[] = [
  {
    id: "rush-001",
    campaignId: "campaign-omra-001",
    recommendedDailyLimit: 12,
    recommendedTimeWindows: ["10:30-12:00", "15:30-17:30", "19:00-20:30"],
    riskLevel: "low",
    advice: "Rythme tres prudent recommande pendant le premier mois. Eviter les envois groupes et observer le volume d'avis recus chaque semaine.",
    createdAt: "2026-06-03T13:00:00.000Z"
  }
];

export const googleReviews: GoogleReview[] = [
  {
    id: "review-001",
    authorName: "Client Google",
    rating: 5,
    text: "Tres bonne experience avec Voyages 21.",
    language: "fr",
    receivedAt: "2026-06-03T14:00:00.000Z",
    category: "other",
    status: "new"
  }
];

export const auditLogEntries: AuditLogEntry[] = [
  {
    id: "audit-001",
    actorUserId: "user-admin",
    action: "client_imported",
    entityType: "client",
    entityId: "client-001",
    details: "Import Excel initial : 3 clients ajoutes avec categories et langues.",
    createdAt: "2026-06-03T10:12:00.000Z"
  },
  {
    id: "audit-002",
    actorUserId: "user-admin",
    action: "campaign_created",
    entityType: "campaign",
    entityId: "campaign-omra-001",
    details: "Creation campagne Anciens clients Omra avec limite de 12 invitations par jour.",
    createdAt: "2026-06-03T11:00:00.000Z"
  },
  {
    id: "audit-003",
    actorUserId: "user-omra",
    action: "message_generated",
    entityType: "message",
    entityId: "msg-001",
    details: "Message IA genere avec suggestion d'avis modifiable et score de similarite 18%.",
    createdAt: "2026-06-03T12:00:00.000Z"
  },
  {
    id: "audit-004",
    actorUserId: "user-admin",
    action: "message_approved",
    entityType: "message",
    entityId: "msg-002",
    details: "Message billetterie valide par l'admin avant envoi.",
    createdAt: "2026-06-03T12:30:00.000Z"
  },
  {
    id: "audit-005",
    actorUserId: "user-admin",
    action: "settings_changed",
    entityType: "settings",
    entityId: "rush-001",
    details: "Anti-rush configure en rythme tres prudent pour le premier mois.",
    createdAt: "2026-06-03T13:00:00.000Z"
  },
  {
    id: "audit-006",
    actorUserId: "user-admin",
    action: "review_received",
    entityType: "review",
    entityId: "review-001",
    details: "Nouvel avis Google detecte, reponse a generer en V2 apres verification API.",
    createdAt: "2026-06-03T14:00:00.000Z"
  }
];
