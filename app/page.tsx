import Link from "next/link";
import {
  BarChart3,
  Bell,
  Bot,
  CalendarClock,
  CheckCircle2,
  FileSpreadsheet,
  Gauge,
  MessageCircle,
  ShieldCheck,
  Star,
  UsersRound
} from "lucide-react";
import {
  antiRushRecommendations,
  appUsers,
  campaigns,
  clients,
  generatedMessages,
  googleReviews
} from "../lib/mock-data";
import type { CampaignStatus, ClientCategory, ClientLanguage } from "../lib/types";

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
  { label: "Dashboard", icon: BarChart3, href: "/", active: true },
  { label: "Import Excel", icon: FileSpreadsheet, href: "/import-excel" },
  { label: "Clients", icon: UsersRound, href: "/clients" },
  { label: "Campagnes", icon: MessageCircle, href: "#" },
  { label: "Validation IA", icon: Bot, href: "#" },
  { label: "Anti-rush", icon: Gauge, href: "#" },
  { label: "Historique", icon: CalendarClock, href: "#" },
  { label: "Conformite", icon: ShieldCheck, href: "#" }
];

function getUserName(userId: string) {
  return appUsers.find((user) => user.id === userId)?.name ?? "Responsable non affecte";
}

function getClientName(clientId: string) {
  const client = clients.find((item) => item.id === clientId);
  if (!client) return "Client inconnu";
  return [client.firstName, client.lastName].filter(Boolean).join(" ");
}

function getClientDetails(clientId: string) {
  const client = clients.find((item) => item.id === clientId);
  if (!client) return "Categorie inconnue";
  return `${categoryLabels[client.category]} - ${languageLabels[client.language]}`;
}

export default function Home() {
  const pendingMessages = generatedMessages.filter((message) => message.status === "pending_validation");
  const approvedMessages = generatedMessages.filter((message) => message.status === "approved");
  const latestRecommendation = antiRushRecommendations[0];
  const recommendedLimit = latestRecommendation?.recommendedDailyLimit ?? 20;
  const metrics = [
    { label: "Clients importes", value: clients.length.toString(), change: "donnees de demonstration" },
    { label: "Invitations prevues", value: `${recommendedLimit}/jour`, change: "rythme tres prudent" },
    { label: "Messages a valider", value: pendingMessages.length.toString(), change: `${approvedMessages.length} deja valide(s)` },
    { label: "Avis suivis", value: googleReviews.length.toString(), change: "Google en verification V2" }
  ];

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
            <p className="eyebrow">MVP cloud</p>
            <h2>Pilotage des campagnes d'avis</h2>
          </div>
          <div className="topbar-actions">
            <button className="icon-button" aria-label="Notifications">
              <Bell size={18} />
            </button>
            <button className="primary-button">Nouvelle campagne</button>
          </div>
        </header>

        <section className="status-band">
          <div>
            <p className="eyebrow">Recommandation IA</p>
            <h3>Rythme conseille : 10 a {recommendedLimit} invitations par jour pendant le premier mois.</h3>
            <p>
              {latestRecommendation?.advice ??
                "Envois espaces entre fin de matinee, milieu d'apres-midi et debut de soiree. Acceleration uniquement apres analyse hebdomadaire."}
            </p>
          </div>
          <div className="status-badge">
            <Gauge size={18} />
            Tres prudent
          </div>
        </section>

        <section className="metrics-grid" aria-label="Indicateurs principaux">
          {metrics.map((metric) => (
            <article className="metric-card" key={metric.label}>
              <p>{metric.label}</p>
              <strong>{metric.value}</strong>
              <span>{metric.change}</span>
            </article>
          ))}
        </section>

        <section className="content-grid">
          <div className="panel wide-panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Campagnes</p>
                <h3>File de travail</h3>
              </div>
              <Link className="secondary-button link-button" href="/import-excel">Importer Excel</Link>
            </div>
            <div className="campaign-list">
              {campaigns.map((campaign) => (
                <article className="campaign-row" key={campaign.id}>
                  <div>
                    <h4>{campaign.name}</h4>
                    <p>{categoryLabels[campaign.category]} / {languageLabels[campaign.language]}</p>
                  </div>
                  <span>{getUserName(campaign.ownerUserId)}</span>
                  <span>{campaign.dailyLimit} invitations</span>
                  <strong>{campaignStatusLabels[campaign.status]}</strong>
                </article>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="panel-header compact">
              <div>
                <p className="eyebrow">Conformite</p>
                <h3>Garde-fous actifs</h3>
              </div>
              <ShieldCheck size={22} />
            </div>
            <ul className="check-list">
              <li><CheckCircle2 size={17} />Pas de demande de 5 etoiles</li>
              <li><CheckCircle2 size={17} />Mention de liberte client</li>
              <li><CheckCircle2 size={17} />Historique anti-repetition</li>
              <li><CheckCircle2 size={17} />Validation humaine des reponses</li>
            </ul>
          </div>
        </section>

        <section className="content-grid bottom-grid">
          <div className="panel wide-panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Validation IA</p>
                <h3>Messages prets a controler</h3>
              </div>
              <button className="secondary-button">Voir tout</button>
            </div>
            <div className="validation-list">
              {generatedMessages.map((item) => (
                <article className="validation-row" key={item.id}>
                  <div className="avatar">{getClientName(item.clientId).slice(0, 1)}</div>
                  <div>
                    <h4>{getClientName(item.clientId)}</h4>
                    <p>{getClientDetails(item.clientId)}</p>
                  </div>
                  <span>{item.mandatoryFreedomNotice}</span>
                  <button className="approve-button">
                    {item.status === "approved" ? "Valide" : "Valider"}
                  </button>
                </article>
              ))}
            </div>
          </div>

          <div className="panel accent-panel">
            <Star size={24} />
            <h3>Google Business en V2</h3>
            <p>
              La connexion sera verifiee sans modification avant de recuperer les nouveaux avis et generer les reponses a valider.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}
