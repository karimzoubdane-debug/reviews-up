import Link from "next/link";
import {
  BarChart3,
  Bot,
  CalendarClock,
  FileSpreadsheet,
  Gauge,
  MessageCircle,
  Plus,
  ShieldCheck,
  Smartphone,
  UsersRound
} from "lucide-react";
import { appUsers, campaigns, clients, generatedMessages, whatsappNumbers } from "../../lib/mock-data";
import type { CampaignStatus, ClientCategory, ClientLanguage } from "../../lib/types";

const categoryLabels: Record<ClientCategory, string> = {
  omra: "Omra",
  hajj: "Hajj",
  visa: "Visa",
  flight_tickets: "Billets d'avion",
  touristic_stays: "Sejours touristiques",
  organized_trips: "Voyages organises",
  other: "Autres"
};

const languageLabels: Record<ClientLanguage, string> = {
  fr: "Francais",
  ar: "Arabe classique",
  darija: "Darija",
  mixed_fr_ar: "Mix FR-AR"
};

const campaignStatusLabels: Record<CampaignStatus, string> = {
  draft: "Brouillon",
  ai_generation: "Generation IA",
  pending_validation: "Validation messages",
  scheduled: "Planifiee",
  sending: "Envoi en cours",
  paused: "En pause",
  completed: "Terminee"
};

const navigation = [
  { label: "Dashboard", icon: BarChart3, href: "/" },
  { label: "Import Excel", icon: FileSpreadsheet, href: "/import-excel" },
  { label: "Clients", icon: UsersRound, href: "/clients" },
  { label: "Campagnes", icon: MessageCircle, href: "/campagnes", active: true },
  { label: "Validation IA", icon: Bot, href: "/validation-ia" },
  { label: "Anti-rush", icon: Gauge, href: "#" },
  { label: "Historique", icon: CalendarClock, href: "#" },
  { label: "Conformite", icon: ShieldCheck, href: "#" }
];

function getUserName(userId: string) {
  return appUsers.find((user) => user.id === userId)?.name ?? "Responsable non affecte";
}

function getWhatsAppLabel(numberId: string) {
  const number = whatsappNumbers.find((item) => item.id === numberId);
  if (!number) return "Numero non configure";
  return `${number.label} - ${number.phone}`;
}

function getCampaignClientCount(category: ClientCategory) {
  return clients.filter((client) => client.category === category && !client.whatsappOptOut).length;
}

function getCampaignMessageCount(campaignId: string) {
  return generatedMessages.filter((message) => message.campaignId === campaignId).length;
}

export default function CampagnesPage() {
  const scheduledCampaigns = campaigns.filter((campaign) => campaign.status === "scheduled").length;
  const pendingCampaigns = campaigns.filter((campaign) => campaign.status === "pending_validation").length;
  const totalDailyLimit = campaigns.reduce((sum, campaign) => sum + campaign.dailyLimit, 0);

  return (
    <main className="app-shell">
      <aside className="sidebar" aria-label="Navigation principale">
        <div className="brand-block">
          <div className="brand-mark">RU</div>
          <div>
            <p className="brand-kicker">Voyages 21</p>
            <h1>Reviews UP</h1>
          </div>
        </div>

        <nav className="nav-list">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link className={item.active ? "nav-item active" : "nav-item"} href={item.href} key={item.label}>
                <Icon size={18} aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">Campagnes WhatsApp</p>
            <h2>Pilotage des campagnes</h2>
          </div>
          <button className="primary-button link-button">
            <Plus size={17} />
            Nouvelle campagne
          </button>
        </header>

        <section className="metrics-grid" aria-label="Indicateurs campagnes">
          <article className="metric-card">
            <p>Campagnes</p>
            <strong>{campaigns.length}</strong>
            <span>actives ou en preparation</span>
          </article>
          <article className="metric-card">
            <p>Planifiees</p>
            <strong>{scheduledCampaigns}</strong>
            <span>pretes au lancement</span>
          </article>
          <article className="metric-card">
            <p>A valider</p>
            <strong>{pendingCampaigns}</strong>
            <span>messages IA en controle</span>
          </article>
          <article className="metric-card">
            <p>Limite cumulee</p>
            <strong>{totalDailyLimit}/jour</strong>
            <span>rythme prudent V1</span>
          </article>
        </section>

        <section className="panel filters-panel">
          <select aria-label="Filtrer par categorie">
            <option>Toutes les categories</option>
            <option>Omra</option>
            <option>Hajj</option>
            <option>Visa</option>
            <option>Billets d'avion</option>
            <option>Sejours touristiques</option>
          </select>
          <select aria-label="Filtrer par statut">
            <option>Tous les statuts</option>
            <option>Validation messages</option>
            <option>Planifiee</option>
            <option>En pause</option>
            <option>Terminee</option>
          </select>
          <select aria-label="Filtrer par responsable">
            <option>Tous les responsables</option>
            {appUsers.map((user) => (
              <option key={user.id}>{user.name}</option>
            ))}
          </select>
          <select aria-label="Filtrer par numero WhatsApp">
            <option>Tous les numeros WhatsApp</option>
            {whatsappNumbers.map((number) => (
              <option key={number.id}>{number.label}</option>
            ))}
          </select>
        </section>

        <section className="campaign-cards">
          {campaigns.map((campaign) => (
            <article className="panel campaign-card" key={campaign.id}>
              <div className="panel-header">
                <div>
                  <p className="eyebrow">{categoryLabels[campaign.category]} / {languageLabels[campaign.language]}</p>
                  <h3>{campaign.name}</h3>
                </div>
                <span className="status-pill success">{campaignStatusLabels[campaign.status]}</span>
              </div>

              <div className="campaign-detail-grid">
                <div>
                  <span>Responsable</span>
                  <strong>{getUserName(campaign.ownerUserId)}</strong>
                </div>
                <div>
                  <span>Limite quotidienne</span>
                  <strong>{campaign.dailyLimit} invitations</strong>
                </div>
                <div>
                  <span>Clients contactables</span>
                  <strong>{getCampaignClientCount(campaign.category)}</strong>
                </div>
                <div>
                  <span>Messages generes</span>
                  <strong>{getCampaignMessageCount(campaign.id)}</strong>
                </div>
              </div>

              <div className="whatsapp-line">
                <Smartphone size={18} />
                <span>{getWhatsAppLabel(campaign.whatsappNumberId)}</span>
              </div>

              <div className="campaign-actions">
                <Link className="secondary-button link-button" href="/validation-ia">Voir messages</Link>
                <button className="approve-button">Preparer envoi</button>
              </div>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
