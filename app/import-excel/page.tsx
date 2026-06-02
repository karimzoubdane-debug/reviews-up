import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  Bot,
  CalendarClock,
  CheckCircle2,
  FileSpreadsheet,
  Gauge,
  MessageCircle,
  ShieldCheck,
  UploadCloud,
  UsersRound
} from "lucide-react";

const navigation = [
  { label: "Dashboard", icon: BarChart3, href: "/" },
  { label: "Import Excel", icon: FileSpreadsheet, href: "/import-excel", active: true },
  { label: "Clients", icon: UsersRound, href: "/clients" },
  { label: "Campagnes", icon: MessageCircle, href: "/campagnes" },
  { label: "Validation IA", icon: Bot, href: "#" },
  { label: "Anti-rush", icon: Gauge, href: "#" },
  { label: "Historique", icon: CalendarClock, href: "#" },
  { label: "Conformite", icon: ShieldCheck, href: "#" }
];

const requiredColumns = [
  "prenom",
  "nom",
  "telephone_whatsapp",
  "categorie",
  "langue",
  "type_prestation",
  "periode_voyage",
  "remarque_interne",
  "responsable"
];

const importChecks = [
  "Numeros WhatsApp au format international",
  "Categorie selectionnee depuis la liste autorisee",
  "Langue definie pour chaque client",
  "Aucun client marque STOP ou desinscrit",
  "Historique d'import conserve"
];

export default function ImportExcelPage() {
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
            <p className="eyebrow">Import clients</p>
            <h2>Importer une liste Excel</h2>
          </div>
          <Link className="secondary-button link-button" href="/">
            <ArrowLeft size={17} />
            Retour dashboard
          </Link>
        </header>

        <section className="import-grid">
          <div className="panel upload-panel">
            <div className="upload-zone">
              <UploadCloud size={34} />
              <h3>Deposer un fichier Excel</h3>
              <p>Formats prevus : .xlsx ou .csv. L'import reel sera branche apres validation du modele.</p>
              <button className="primary-button">Choisir un fichier</button>
            </div>
          </div>

          <div className="panel">
            <div className="panel-header compact">
              <div>
                <p className="eyebrow">Parametres</p>
                <h3>Preparation de l'import</h3>
              </div>
              <FileSpreadsheet size={22} />
            </div>
            <div className="form-grid">
              <label>
                Categorie par defaut
                <select>
                  <option>Selectionner si colonne vide</option>
                  <option>Omra</option>
                  <option>Hajj</option>
                  <option>Visa</option>
                  <option>Billets d'avion</option>
                  <option>Sejours touristiques</option>
                  <option>Voyages organises</option>
                  <option>Autres</option>
                </select>
              </label>
              <label>
                Langue par defaut
                <select>
                  <option>Selectionner si colonne vide</option>
                  <option>Francais</option>
                  <option>Arabe classique</option>
                  <option>Darija</option>
                  <option>Mix francais/arabe</option>
                </select>
              </label>
              <label>
                Responsable par defaut
                <select>
                  <option>Admin general</option>
                  <option>Responsable Omra/Hajj</option>
                  <option>Responsable billetterie</option>
                  <option>Responsable destinations</option>
                </select>
              </label>
            </div>
          </div>
        </section>

        <section className="content-grid">
          <div className="panel wide-panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Modele Excel</p>
                <h3>Colonnes attendues</h3>
              </div>
              <button className="secondary-button">Telecharger modele</button>
            </div>
            <div className="columns-grid">
              {requiredColumns.map((column) => (
                <span className="column-pill" key={column}>{column}</span>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="panel-header compact">
              <div>
                <p className="eyebrow">Controle</p>
                <h3>Avant validation</h3>
              </div>
              <ShieldCheck size={22} />
            </div>
            <ul className="check-list">
              {importChecks.map((item) => (
                <li key={item}><CheckCircle2 size={17} />{item}</li>
              ))}
            </ul>
          </div>
        </section>
      </section>
    </main>
  );
}
