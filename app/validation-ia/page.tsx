import Link from "next/link";
import {
  BarChart3,
  Bot,
  CalendarClock,
  CheckCircle2,
  FileSpreadsheet,
  Gauge,
  MessageCircle,
  Pencil,
  ShieldCheck,
  ThumbsDown,
  UsersRound
} from "lucide-react";
import { campaigns, clients, generatedMessages } from "../../lib/mock-data";
import type { ClientCategory, ClientLanguage, MessageStatus } from "../../lib/types";

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

const messageStatusLabels: Record<MessageStatus, string> = {
  draft: "Brouillon",
  pending_validation: "A valider",
  approved: "Valide",
  rejected: "Rejete",
  scheduled: "Planifie",
  sent: "Envoye",
  stopped: "STOP"
};

const navigation = [
  { label: "Dashboard", icon: BarChart3, href: "/" },
  { label: "Import Excel", icon: FileSpreadsheet, href: "/import-excel" },
  { label: "Clients", icon: UsersRound, href: "/clients" },
  { label: "Campagnes", icon: MessageCircle, href: "/campagnes" },
  { label: "Validation IA", icon: Bot, href: "/validation-ia", active: true },
  { label: "Anti-rush", icon: Gauge, href: "#" },
  { label: "Historique", icon: CalendarClock, href: "#" },
  { label: "Conformite", icon: ShieldCheck, href: "#" }
];

function getClient(clientId: string) {
  return clients.find((client) => client.id === clientId);
}

function getCampaign(campaignId: string) {
  return campaigns.find((campaign) => campaign.id === campaignId);
}

export default function ValidationIaPage() {
  const pendingMessages = generatedMessages.filter((message) => message.status === "pending_validation");
  const approvedMessages = generatedMessages.filter((message) => message.status === "approved");
  const averageSimilarity = generatedMessages.length
    ? Math.round(
        (generatedMessages.reduce((sum, message) => sum + (message.similarityScore ?? 0), 0) /
          generatedMessages.length) *
          100
      )
    : 0;

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
            <p className="eyebrow">Validation IA</p>
            <h2>Messages et avis proposes</h2>
          </div>
          <button className="primary-button link-button">
            <Bot size={17} />
            Generer messages
          </button>
        </header>

        <section className="metrics-grid" aria-label="Indicateurs validation IA">
          <article className="metric-card">
            <p>Messages generes</p>
            <strong>{generatedMessages.length}</strong>
            <span>donnees de demonstration</span>
          </article>
          <article className="metric-card">
            <p>A valider</p>
            <strong>{pendingMessages.length}</strong>
            <span>controle humain requis</span>
          </article>
          <article className="metric-card">
            <p>Deja valides</p>
            <strong>{approvedMessages.length}</strong>
            <span>prets pour envoi</span>
          </article>
          <article className="metric-card">
            <p>Similarite moyenne</p>
            <strong>{averageSimilarity}%</strong>
            <span>anti-repetition IA</span>
          </article>
        </section>

        <section className="panel filters-panel">
          <select aria-label="Filtrer par campagne">
            <option>Toutes les campagnes</option>
            {campaigns.map((campaign) => (
              <option key={campaign.id}>{campaign.name}</option>
            ))}
          </select>
          <select aria-label="Filtrer par statut">
            <option>Tous les statuts</option>
            <option>A valider</option>
            <option>Valide</option>
            <option>Rejete</option>
            <option>Planifie</option>
          </select>
          <select aria-label="Filtrer par langue">
            <option>Toutes les langues</option>
            <option>Francais</option>
            <option>Arabe classique</option>
            <option>Darija</option>
            <option>Mix FR-AR</option>
          </select>
          <select aria-label="Filtrer par categorie">
            <option>Toutes les categories</option>
            <option>Omra</option>
            <option>Hajj</option>
            <option>Billets d'avion</option>
            <option>Sejours touristiques</option>
          </select>
        </section>

        <section className="campaign-cards">
          {generatedMessages.map((message) => {
            const client = getClient(message.clientId);
            const campaign = getCampaign(message.campaignId);
            const clientName = client ? [client.firstName, client.lastName].filter(Boolean).join(" ") : "Client inconnu";
            const clientDetails = client
              ? `${categoryLabels[client.category]} / ${languageLabels[client.language]}`
              : "Categorie inconnue";

            return (
              <article className="panel campaign-card" key={message.id}>
                <div className="panel-header">
                  <div>
                    <p className="eyebrow">{campaign?.name ?? "Campagne inconnue"}</p>
                    <h3>{clientName}</h3>
                  </div>
                  <span className={message.status === "approved" ? "status-pill success" : "status-pill muted"}>
                    {messageStatusLabels[message.status]}
                  </span>
                </div>

                <div className="campaign-detail-grid">
                  <div>
                    <span>Segment</span>
                    <strong>{clientDetails}</strong>
                  </div>
                  <div>
                    <span>Similarite</span>
                    <strong>{Math.round((message.similarityScore ?? 0) * 100)}%</strong>
                  </div>
                  <div>
                    <span>Generation</span>
                    <strong>{new Date(message.generatedAt).toLocaleDateString("fr-FR")}</strong>
                  </div>
                  <div>
                    <span>Statut</span>
                    <strong>{messageStatusLabels[message.status]}</strong>
                  </div>
                </div>

                <div className="message-preview">
                  <p className="eyebrow">Message WhatsApp</p>
                  <p>{message.invitationText}</p>
                </div>

                <div className="message-preview review-preview">
                  <p className="eyebrow">Suggestion d'avis modifiable</p>
                  <p>{message.suggestedReviewText}</p>
                </div>

                <div className="whatsapp-line">
                  <CheckCircle2 size={18} />
                  <span>{message.mandatoryFreedomNotice}</span>
                </div>

                <div className="campaign-actions">
                  <button className="secondary-button link-button">
                    <Pencil size={16} />
                    Modifier
                  </button>
                  <button className="secondary-button link-button">
                    <ThumbsDown size={16} />
                    Rejeter
                  </button>
                  <button className="approve-button">Valider</button>
                </div>
              </article>
            );
          })}
        </section>
      </section>
    </main>
  );
}
