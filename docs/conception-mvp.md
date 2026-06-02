# Dossier de conception MVP - Reviews UP

## 1. Objectif MVP

Creer une premiere version utilisable de Reviews UP permettant d'importer des clients depuis Excel, creer des campagnes WhatsApp par categorie, generer avec IA des messages personnalises incluant une suggestion d'avis modifiable, valider les messages, suivre l'historique et controler le rythme d'envoi.

## 2. Perimetre V1

Inclus :

- connexion securisee ;
- roles utilisateurs ;
- import Excel ;
- gestion clients ;
- categories et langues ;
- creation campagne ;
- generation IA ;
- validation des messages ;
- historique complet ;
- recommandation anti-rush ;
- tableau de bord simple.

Prevus en V2 :

- connexion Google Business API ;
- recuperation automatique des avis ;
- publication des reponses apres validation ;
- notifications WhatsApp avancees ;
- rapport hebdomadaire automatise complet.

## 3. Roles utilisateurs

- Admin general : voit tout, configure tout, valide tout.
- Responsable Omra/Hajj : gere uniquement Omra/Hajj.
- Responsable billetterie : gere uniquement billetterie.
- Responsable destinations : gere autres voyages et sejours.
- Lecture seule : consultation sans modification.

## 4. Ecrans MVP

- Login.
- Dashboard.
- Import Excel.
- Clients.
- Campagnes.
- Generation IA.
- Messages a valider.
- Historique.
- Parametres.
- Utilisateurs et roles.

## 5. Workflow principal

1. L'admin se connecte.
2. Il importe un fichier Excel clients.
3. Il choisit categorie, langue, service et responsable.
4. Il cree une campagne.
5. L'IA genere les messages WhatsApp.
6. L'application applique le rythme anti-rush.
7. Les messages passent en validation.
8. L'utilisateur valide.
9. Les messages sont envoyes ou exportes selon le mode WhatsApp disponible.
10. L'historique conserve tout.

## 6. Champs clients Excel

- prenom ;
- nom ;
- telephone WhatsApp ;
- categorie ;
- langue ;
- type de prestation ;
- date ou periode du voyage ;
- remarque interne ;
- responsable/service.

## 7. Regles IA

L'IA doit :

- generer une invitation WhatsApp personnalisee ;
- inclure une suggestion d'avis complet mais modifiable ;
- rappeler que le client est libre de modifier, ignorer ou ecrire son propre avis ;
- ne jamais demander 5 etoiles ;
- ne jamais promettre un avantage ;
- varier fortement les textes ;
- conserver l'historique des propositions ;
- adapter le message a la langue et a la categorie.

Mention obligatoire :

> Voici une suggestion que vous pouvez adapter librement. Vous pouvez aussi l'ignorer ou ecrire votre propre avis selon votre experience reelle avec Voyages 21.

Pour les anciens clients :

> Si vous gardez un souvenir de votre experience avec Voyages 21, meme ancienne, votre avis honnete nous aiderait beaucoup.

## 8. Anti-rush

Rythme initial :

- 10 a 20 invitations par jour ;
- tres prudent pendant le premier mois ;
- envois espaces ;
- creneaux recommandes : fin de matinee, milieu d'apres-midi, debut de soiree ;
- acceleration seulement apres analyse.

L'application doit recommander chaque semaine de maintenir, ralentir, mettre en pause ou accelerer.

## 9. Architecture recommandee

- Frontend : Next.js.
- Backend : API Next.js.
- Base de donnees : PostgreSQL cloud, Supabase ou Neon.
- IA : OpenAI API.
- WhatsApp : WhatsApp Business Platform officielle via prestataire agree.
- Hebergement : Vercel.
- Code source : GitHub.

## 10. Prochaine phase technique

Scaffolder l'application Next.js, ajouter l'interface MVP, puis connecter progressivement la base de donnees, l'IA, WhatsApp et Google Business Profile.
