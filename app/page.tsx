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

const metrics = [
  { label: "Clients importes", value: "1 248", change: "+320 cette semaine" },
  { label: "Invitations prevues", value: "20/jour", change: "rythme tres prudent" },
  { label: "Messages a valider", value: "36", change: "Omra/Hajj en priorite" },
  { label: "Avis suivis", value: "24", change: "Google en verification V2" }
];

const campaigns = [
  {
    name: "Anciens clients Omra",
    segment: "Omra / Arabe classique",
    owner: "Responsable Omra/Hajj",
    status: "Validation messages",
    volume: "12 invitations"
  },
  {
    name: "Billetterie 2024-2025",
    segment: "Billets d'avion / Francais",
    owner: "Responsable billetterie",
    status: "Planifiee",
    volume: "8 invitations"
  },
  {
    name: "Sejours touristiques",
    segment: "Voyages organises / Mix FR-AR",
    owner: "Responsable destinations",
    status: "Brouillon IA",
    volume: "10 invitations"
  }
];

const validations = [
  {
    client: "Kawtar A.",
    category: "Omra",
    language: "Arabe classique",
    message: "Suggestion d'avis personnalisee prete a adapter librement."
  },
  {
    client: "Youssef B.",
    category: "Billetterie",
    language: "Francais",
    message: "Invitation avec rappel d'experience et lien avis Google."
  },
  {
    client: "Samira E.",
    category: "Sejour",
    language: "Darija",
    message: "Texte chaleureux, non repetitif, avec mention de liberte."
  }
];

const navigation = [
  { label: "Dashboard", icon: BarChart3, active: true },
  { label: "Import Excel", icon: FileSpreadsheet },
  { label: "Clients", icon: UsersRound },
  { label: "Campagnes", icon: MessageCircle },
  { label: "Validation IA", icon: Bot },
  { label: "Anti-rush", icon: Gauge },
  { label: "Historique", icon: CalendarClock },
  { label: "Conformite", icon: ShieldCheck }
];

export default function Home() {
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
              <button className={item.active ? "nav-item active" : "nav-item"} key={item.label}>
                <Icon size={18} aria-hidden="true" />
                <span>{item.label}</span>
              </button>
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
            <h3>Rythme conseille : 10 a 20 invitations par jour pendant le premier mois.</h3>
            <p>
              Envois espaces entre fin de matinee, milieu d'apres-midi et debut de soiree. Acceleration uniquement apres analyse hebdomadaire.
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
              <button className="secondary-button">Importer Excel</button>
            </div>
            <div className="campaign-list">
              {campaigns.map((campaign) => (
                <article className="campaign-row" key={campaign.name}>
                  <div>
                    <h4>{campaign.name}</h4>
                    <p>{campaign.segment}</p>
                  </div>
                  <span>{campaign.owner}</span>
                  <span>{campaign.volume}</span>
                  <strong>{campaign.status}</strong>
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
              {validations.map((item) => (
                <article className="validation-row" key={item.client}>
                  <div className="avatar">{item.client.slice(0, 1)}</div>
                  <div>
                    <h4>{item.client}</h4>
                    <p>{item.category} - {item.language}</p>
                  </div>
                  <span>{item.message}</span>
                  <button className="approve-button">Valider</button>
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
