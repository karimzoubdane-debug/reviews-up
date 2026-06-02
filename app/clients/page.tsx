import Link from "next/link";
import {
  BarChart3,
  Bot,
  CalendarClock,
  FileSpreadsheet,
  Gauge,
  MessageCircle,
  Search,
  ShieldCheck,
  UserRoundPlus,
  UsersRound
} from "lucide-react";
import { appUsers, clients } from "../../lib/mock-data";
import type { ClientCategory, ClientLanguage } from "../../lib/types";

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

const navigation = [
  { label: "Dashboard", icon: BarChart3, href: "/" },
  { label: "Import Excel", icon: FileSpreadsheet, href: "/import-excel" },
  { label: "Clients", icon: UsersRound, href: "/clients", active: true },
  { label: "Campagnes", icon: MessageCircle, href: "/campagnes" },
  { label: "Validation IA", icon: Bot, href: "#" },
  { label: "Anti-rush", icon: Gauge, href: "#" },
  { label: "Historique", icon: CalendarClock, href: "#" },
  { label: "Conformite", icon: ShieldCheck, href: "#" }
];

function getUserName(userId?: string) {
  if (!userId) return "Non affecte";
  return appUsers.find((user) => user.id === userId)?.name ?? "Non affecte";
}

export default function ClientsPage() {
  const activeClients = clients.filter((client) => !client.whatsappOptOut);
  const optedOutClients = clients.length - activeClients.length;

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
            <p className="eyebrow">Base clients</p>
            <h2>Clients importes</h2>
          </div>
          <Link className="primary-button link-button" href="/import-excel">
            <UserRoundPlus size={17} />
            Importer clients
          </Link>
        </header>

        <section className="metrics-grid" aria-label="Indicateurs clients">
          <article className="metric-card">
            <p>Total clients</p>
            <strong>{clients.length}</strong>
            <span>donnees de demonstration</span>
          </article>
          <article className="metric-card">
            <p>Contactables WhatsApp</p>
            <strong>{activeClients.length}</strong>
            <span>hors STOP/desinscrits</span>
          </article>
          <article className="metric-card">
            <p>Desinscrits</p>
            <strong>{optedOutClients}</strong>
            <span>exclus des campagnes</span>
          </article>
          <article className="metric-card">
            <p>Categories actives</p>
            <strong>{new Set(clients.map((client) => client.category)).size}</strong>
            <span>segmentation disponible</span>
          </article>
        </section>

        <section className="panel filters-panel">
          <div className="search-box">
            <Search size={18} />
            <input placeholder="Rechercher par nom ou telephone" />
          </div>
          <select aria-label="Filtrer par categorie">
            <option>Toutes les categories</option>
            <option>Omra</option>
            <option>Hajj</option>
            <option>Visa</option>
            <option>Billets d'avion</option>
            <option>Sejours touristiques</option>
            <option>Voyages organises</option>
          </select>
          <select aria-label="Filtrer par langue">
            <option>Toutes les langues</option>
            <option>Francais</option>
            <option>Arabe classique</option>
            <option>Darija</option>
            <option>Mix FR-AR</option>
          </select>
          <select aria-label="Filtrer par responsable">
            <option>Tous les responsables</option>
            {appUsers.map((user) => (
              <option key={user.id}>{user.name}</option>
            ))}
          </select>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Liste</p>
              <h3>Clients disponibles</h3>
            </div>
            <button className="secondary-button">Exporter</button>
          </div>

          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>WhatsApp</th>
                  <th>Categorie</th>
                  <th>Langue</th>
                  <th>Prestation</th>
                  <th>Periode</th>
                  <th>Responsable</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.id}>
                    <td>{[client.firstName, client.lastName].filter(Boolean).join(" ")}</td>
                    <td>{client.whatsappPhone}</td>
                    <td>{categoryLabels[client.category]}</td>
                    <td>{languageLabels[client.language]}</td>
                    <td>{client.serviceType ?? "-"}</td>
                    <td>{client.travelPeriod ?? "-"}</td>
                    <td>{getUserName(client.assignedUserId)}</td>
                    <td>
                      <span className={client.whatsappOptOut ? "status-pill muted" : "status-pill success"}>
                        {client.whatsappOptOut ? "STOP" : "Contactable"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  );
}
