import Link from "next/link";
import {
  BarChart3,
  Bot,
  CalendarClock,
  CheckCircle2,
  FileSpreadsheet,
  Gauge,
  History,
  MessageCircle,
  Search,
  ShieldCheck,
  UsersRound
} from "lucide-react";
import { appUsers, auditLogEntries } from "../../lib/mock-data";
import type { AuditLogEntry } from "../../lib/types";

const navigation = [
  { label: "Dashboard", icon: BarChart3, href: "/" },
  { label: "Import Excel", icon: FileSpreadsheet, href: "/import-excel" },
  { label: "Clients", icon: UsersRound, href: "/clients" },
  { label: "Campagnes", icon: MessageCircle, href: "/campagnes" },
  { label: "Validation IA", icon: Bot, href: "/validation-ia" },
  { label: "Anti-rush", icon: Gauge, href: "/anti-rush" },
  { label: "Historique", icon: CalendarClock, href: "/historique", active: true },
  { label: "Conformite", icon: ShieldCheck, href: "#" }
];

const actionLabels: Record<AuditLogEntry["action"], string> = {
  client_imported: "Import client",
  campaign_created: "Campagne creee",
  message_generated: "Message IA genere",
  message_approved: "Message valide",
  message_sent: "Message envoye",
  review_received: "Avis recu",
  reply_generated: "Reponse generee",
  reply_approved: "Reponse validee",
  reply_published: "Reponse publiee",
  settings_changed: "Parametre modifie"
};

const entityLabels: Record<AuditLogEntry["entityType"], string> = {
  client: "Client",
  campaign: "Campagne",
  message: "Message",
  review: "Avis",
  reply: "Reponse",
  settings: "Parametres"
};

function getUserName(userId: string) {
  return appUsers.find((user) => user.id === userId)?.name ?? "Utilisateur inconnu";
}

export default function HistoriquePage() {
  const sortedEntries = [...auditLogEntries].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const generatedActions = auditLogEntries.filter((entry) => entry.action === "message_generated").length;
  const validationActions = auditLogEntries.filter((entry) => entry.action === "message_approved" || entry.action === "reply_approved").length;

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
            <p className="eyebrow">Journal</p>
            <h2>Historique des actions</h2>
          </div>
          <button className="secondary-button link-button">
            <History size={17} />
            Exporter journal
          </button>
        </header>

        <section className="metrics-grid" aria-label="Indicateurs historique">
          <article className="metric-card">
            <p>Actions tracees</p>
            <strong>{auditLogEntries.length}</strong>
            <span>journal de demonstration</span>
          </article>
          <article className="metric-card">
            <p>Generations IA</p>
            <strong>{generatedActions}</strong>
            <span>messages ou reponses</span>
          </article>
          <article className="metric-card">
            <p>Validations</p>
            <strong>{validationActions}</strong>
            <span>controle humain</span>
          </article>
          <article className="metric-card">
            <p>Derniere action</p>
            <strong>{new Date(sortedEntries[0]?.createdAt).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</strong>
            <span>{new Date(sortedEntries[0]?.createdAt).toLocaleDateString("fr-FR")}</span>
          </article>
        </section>

        <section className="panel filters-panel">
          <div className="search-box">
            <Search size={18} />
            <input placeholder="Rechercher dans le journal" />
          </div>
          <select aria-label="Filtrer par type d'action">
            <option>Toutes les actions</option>
            <option>Import client</option>
            <option>Campagne creee</option>
            <option>Message IA genere</option>
            <option>Message valide</option>
            <option>Avis recu</option>
          </select>
          <select aria-label="Filtrer par utilisateur">
            <option>Tous les utilisateurs</option>
            {appUsers.map((user) => (
              <option key={user.id}>{user.name}</option>
            ))}
          </select>
          <select aria-label="Filtrer par periode">
            <option>Aujourd'hui</option>
            <option>7 derniers jours</option>
            <option>30 derniers jours</option>
            <option>Toute la periode</option>
          </select>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Timeline</p>
              <h3>Actions recentes</h3>
            </div>
            <span className="status-pill success">Traçabilite active</span>
          </div>

          <div className="timeline-list">
            {sortedEntries.map((entry) => (
              <article className="timeline-item" key={entry.id}>
                <div className="timeline-icon"><CheckCircle2 size={18} /></div>
                <div>
                  <div className="timeline-heading">
                    <h4>{actionLabels[entry.action]}</h4>
                    <span>{new Date(entry.createdAt).toLocaleString("fr-FR")}</span>
                  </div>
                  <p>{entry.details}</p>
                  <div className="timeline-meta">
                    <span>{getUserName(entry.actorUserId)}</span>
                    <span>{entityLabels[entry.entityType]} : {entry.entityId}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
