# Modele de donnees - Reviews UP

Ce document decrit la structure fonctionnelle des donnees du MVP. Elle servira de base pour la future base PostgreSQL cloud.

## Utilisateurs

Chaque utilisateur a un role et un perimetre de service.

Roles :

- admin ;
- responsable Omra/Hajj ;
- responsable billetterie ;
- responsable destinations ;
- lecture seule.

Champs principaux :

- nom ;
- email ;
- telephone ;
- role ;
- categories autorisees ;
- statut actif.

## Numeros WhatsApp

Chaque numero peut etre associe a un ou plusieurs services.

Champs principaux :

- libelle ;
- numero ;
- categories autorisees ;
- numero admin oui/non ;
- statut actif.

## Clients

Les clients sont importes depuis Excel.

Champs principaux :

- prenom ;
- nom ;
- telephone WhatsApp ;
- categorie ;
- langue ;
- type de prestation ;
- date ou periode du voyage ;
- remarque interne ;
- responsable affecte ;
- desinscription WhatsApp oui/non.

## Campagnes

Une campagne regroupe une liste de clients et une logique d'envoi.

Champs principaux :

- nom ;
- categorie ;
- langue ;
- statut ;
- limite quotidienne ;
- date de debut ;
- lien Google Review ;
- numero WhatsApp utilise ;
- responsable.

Statuts :

- brouillon ;
- generation IA ;
- validation en attente ;
- planifiee ;
- en cours d'envoi ;
- pause ;
- terminee.

## Messages IA

Chaque client recoit une invitation personnalisee et une suggestion d'avis modifiable.

Champs principaux :

- campagne ;
- client ;
- texte d'invitation ;
- suggestion d'avis ;
- mention obligatoire de liberte ;
- score de similarite ;
- statut ;
- date de generation ;
- validation ;
- date d'envoi.

Statuts :

- brouillon ;
- validation en attente ;
- approuve ;
- rejete ;
- planifie ;
- envoye ;
- stop/desinscrit.

## Anti-rush

Le module anti-rush recommande le rythme de campagne.

Champs principaux :

- campagne ;
- limite quotidienne recommandee ;
- creneaux recommandes ;
- niveau de risque ;
- conseil IA ;
- date de recommandation.

## Avis Google

Prevus en V2 apres verification des acces Google Business Profile.

Champs principaux :

- auteur ;
- note ;
- texte ;
- langue ;
- date de reception ;
- categorie estimee ;
- statut de traitement.

## Brouillons de reponses

Les reponses aux avis sont generees par IA puis validees humainement.

Champs principaux :

- avis associe ;
- texte de reponse ;
- statut ;
- date de generation ;
- validateur ;
- date de publication.

## Historique

Toutes les actions importantes sont journalisees.

Actions suivies :

- import client ;
- creation campagne ;
- generation message ;
- validation message ;
- envoi message ;
- reception avis ;
- generation reponse ;
- validation reponse ;
- publication reponse ;
- changement de parametrage.
