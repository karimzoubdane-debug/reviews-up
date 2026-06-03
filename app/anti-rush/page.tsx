import Link from "next/link";
import {
  AlertTriangle,
  BarChart3,
  Bot,
  CalendarClock,
  CheckCircle2,
  Clock3,
  FileSpreadsheet,
  Gauge,
  MessageCircle,
  PauseCircle,
  ShieldCheck,
  TrendingUp,
  UsersRound
} from "lucide-react";
import { antiRushRecommendations, campaigns, generatedMessages, googleReviews } from "../../lib/mock-data";

const navigation = [
  { label: "Dashboard", icon: BarChart3, href: "/" },
  { label: "Import Excel", icon: FileSpreadsheet, href: "/import-excel" },
  { label: "Clients", icon: UsersRound, href: "/clients" },
  { label: "Campagnes", icon: MessageCircle, href: "/campagnes" },
  { label: "Validation IA", icon: Bot, href: "/validation-ia" },
  { label: "Anti-rush", icon: Gauge, href: "/anti-rush", active: true },
  { label: "Historique", icon: CalendarClock, href: "#" },
  { label: "Conformite", icon: ShieldCheck, href: "#" }
];

const rules = [
  "Demarrer entre 10 et 20 invitations par jour pendant le premier mois.",
  "Espacer les envois et eviter les lots envoyes a la meme minute.",
  "Ralentir pendant 48h si le nombre d'avis recus devient inhabituel.",
  "Ne pas accelerer avant une analyse hebdomadaire stable.",
  "Melanger progressivement les categories pour eviter un signal artificiel."
];

function getCampaignName(campaignId: string) {
  return campaigns.find((campaign) => campaign.id === campaignId)?.name ?? "Campagne inconnue";
}

export default function AntiRushPage() {
  const latestRecommendation = antiRushRecommendations[0];
  const totalDailyLimit = campaigns.reduce((sum, campaign) => sum + campaign.dailyLimit, 0);
  const pendingMessages = generatedMessages.filter((message) => message.status === "pending_validation").length;
  const riskLabel = latestRecommendation?.riskLevel === "low" ? "Faible" : latestRecommendation?.riskLevel ?? "Faible";

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
            <p className="eyebrow">Anti-rush</p>
            <h2>Rythme prudent des campagnes</h2>
          </div>
          <button className="primary-button link-button">
            <TrendingUp size={17} />
            Recalculer conseil
          </button>
        </header>

        <section className="status-band">
          <div>
            <p className="eyebrow">Recommandation IA</p>
            <h3>{latestRecommendation?.recommendedDailyLimit ?? 12} invitations par jour maximum pour la campagne prioritaire.</h3>
            <p>{latestRecommendation?.advice}</p>
          </div>
          <div className="status-badge">
            <Gauge size={18} />
            Risque {riskLabel}
          </div>
        </section>

        <section className="metrics-grid" aria-label="Indicateurs anti-rush">
          <article className="metric-card">
            <p>Limite cumulee</p>
            <strong>{totalDailyLimit}/jour</strong>
            <span>toutes campagnes</span>
          </article>
          <article className="metric-card">
            <p>Campagnes actives</p>
            <strong>{campaigns.length}</strong>
            <span>en preparation ou planifiees</span>
          </article>
          <article className="metric-card">
            <p>Messages a controler</p>
            <strong>{pendingMessages}</strong>
            <span>avant envoi</span>
          </article>
          <article className="metric-card">
            <p>Avis suivis</p>
            <strong>{googleReviews.length}</strong>
            <span>Google en verification V2</span>
          </article>
        </section>

        <section className="content-grid">
          <div className="panel wide-panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Creneaux recommandes</p>
                <h3>Fenetre d'envoi naturelle</h3>
              </div>
              <Clock3 size={22} />
            </div>
            <div className="campaign-detail-grid">
              {(latestRecommendation?.recommendedTimeWindows ?? ["10:30-12:00", "15:30-17:30", "19:00-20:30"]).map((window) => (
                <div key={window}>
                  <span>Creneau</span>
                  <strong>{window}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="panel-header compact">
              <div>
                <p className="eyebrow">Blocage automatique</p>
                <h3>Ralentir si besoin</h3>
              </div>
              <PauseCircle size={22} />
            </div>
            <ul className="check-list">
              <li><AlertTriangle size={17} />Pic d'avis inhabituel</li>
              <li><AlertTriangle size={17} />Trop de messages similaires</li>
              <li><AlertTriangle size={17} />Volume superieur au rythme conseille</li>
            </ul>
          </div>
        </section>

        <section className="content-grid">
          <div className="panel wide-panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Campagne suivie</p>
                <h3>{getCampaignName(latestRecommendation?.campaignId ?? "")}</h3>
              </div>
              <span className="status-pill success">Risque {riskLabel}</span>
            </div>
            <div className="message-preview review-preview">
              <p className="eyebrow">Conseil operationnel</p>
              <p>{latestRecommendation?.advice}</p>
            </div>
          </div>

          <div className="panel">
            <div className="panel-header compact">
              <div>
                <p className="eyebrow">Regles</p>
                <h3>Cadre de prudence</h3>
              </div>
              <ShieldCheck size={22} />
            </div>
            <ul className="check-list">
              {rules.map((rule) => (
                <li key={rule}><CheckCircle2 size={17} />{rule}</li>
              ))}
            </ul>
          </div>
        </section>
      </section>
    </main>
  );
}
