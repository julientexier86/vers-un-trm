# Vers un TRM

Application web (100 % client, sans serveur ni base de données) pour piloter la **DHG** (Dotation Horaire Globale), la **structure pédagogique** et la **répartition de services** d'un établissement scolaire (collège, lycée général et technologique, lycée professionnel).

Inspirée du DHG Manager de Fred Vedrenne.

**🔗 Application en ligne : https://julientexier86.github.io/vers-un-trm/**

> ⚠️ Aucune donnée n'est envoyée à un serveur. Tout reste dans le navigateur (`localStorage`) et dans les fichiers `.data` que vous téléchargez vous-même. Voir [Confidentialité](#confidentialité--données) plus bas.

---

## Sommaire

- [Démarrage rapide](#démarrage-rapide)
- [Vue d'ensemble des modules](#vue-densemble-des-modules)
- [Concepts clés](#concepts-clés)
- [Le moteur de scénarios automatiques](#le-moteur-de-scénarios-automatiques)
- [Exports](#exports)
- [Architecture technique](#architecture-technique)
- [Confidentialité & données](#confidentialité--données)
- [Développement local](#développement-local)
- [Structure des fichiers](#structure-des-fichiers)
- [Limites connues](#limites-connues)

---

## Démarrage rapide

1. Ouvrir [https://julientexier86.github.io/vers-un-trm/](https://julientexier86.github.io/vers-un-trm/)
2. Choisir le type d'établissement (Collège / Lycée GT / Lycée Pro) — ou charger une sauvegarde `.data` existante.
3. Renseigner la **Structure** (niveaux, effectifs, divisions, moyens horaires).
4. Configurer les **Matières & Modalités** (grilles horaires par niveau).
5. Saisir les **Professeurs** (ORS, HSA, décharges, statut).
6. Utiliser **Équipes Pédagogiques** pour affecter les professeurs aux classes.
7. Consulter le **Tableau de Bord** pour le pilotage global, les diagnostics et le simulateur budgétaire.
8. **Sauvegarder (.data)** régulièrement — c'est le seul moyen de conserver son travail (voir plus bas).

Aucune installation n'est nécessaire : c'est une page web statique.

---

## Vue d'ensemble des modules

| Module | Rôle |
|---|---|
| **Tableau de Bord** | KPI globaux (dotation, consommation, HP/HSA, marge), graphique de répartition, estimation budgétaire, diagnostic de couverture par discipline, simulateur de stress test, occupation des salles spécialisées, comparateur de scénarios |
| **Structure (Niveaux)** | Effectifs, divisions, moyens horaires par niveau, moyens supplémentaires, génération automatique des classes |
| **Matières & Modalités** | Grilles horaires par discipline et par niveau (heures de base + marge + coefficient), disciplines associées (co-intervention), rattachement parent/enfant (ex. Latin → Français) |
| **Spécialités & EDS** | Pilotage des enseignements de spécialité (lycée GT uniquement) |
| **Professeurs** | Liste des enseignants : ORS, HSA, statut, décharges (internes/externes), CSD, BMP, pactes, import Excel/CSV |
| **Grille Horaire** | Vue tableur de la grille horaire par niveau, pondération des coefficients |
| **Ventilation** | Vue « Besoins » par discipline : besoin structurel vs apport des professeurs, HP/HSA/solde |
| **Équipes Pédagogiques** | Grille croisée classes × professeurs pour affecter les services, gestion des professeurs principaux |
| **Répartition de Services** | Vue détaillée par enseignant ou par matière, avec calcul du service dû/assigné |
| **Bilan & Export** | Récapitulatif global par discipline, avec commentaires, prêt pour l'export |

---

## Concepts clés

### CSD (Complément de Service Donné) — interne et externe

Un professeur peut compléter son service :
- **Vers un autre établissement** (CSD externe) : les heures sortent de la DHG.
- **Vers une autre discipline de l'établissement** (CSD interne) : par exemple un professeur de Lettres Classiques complète son service en Lettres Modernes. Dans ce cas :
  - Les heures données sont **créditées en HP** à la discipline receveuse (avec garde anti-double-comptage si le professeur a déjà des classes affectées via la grille Équipes).
  - Les **HSA** du professeur suivent également la discipline receveuse (sa discipline d'origine étant, par définition, saturée).
  - Le **service dû dans l'établissement** reste l'ORS complet (contrairement au CSD externe, où seul le solde reste dû).

### BMP / CSR

Bloc de moyens provisoires ou complément de service reçu (d'un autre établissement) : le volume horaire saisi remplace directement l'ORS du poste.

### Marge / Autonomie d'établissement

Chaque discipline, à chaque niveau, dispose d'un volume horaire **de base** (réglementaire) et d'une **marge** (heures d'autonomie de l'établissement — AP, groupes, dédoublements...). Le total (base + marge) × coefficient × nombre de divisions donne le besoin de la discipline pour ce niveau.

### Marge de structure

`Dotation (cibles horaires par division + moyens supplémentaires) − Besoins totaux`. C'est le reliquat de pilotage disponible. L'application encourage à le maintenir dans une **bande de 2 à 4 heures** : trop bas, la répartition est fragile ; trop haut, des heures dues aux élèves restent non réparties.

---

## Le moteur de scénarios automatiques

Le comparateur de scénarios (Tableau de Bord) permet d'enregistrer, cloner et comparer différentes configurations de DHG. Un bouton **« 🤖 Proposer (auto) »** déclenche un moteur d'analyse qui :

1. **Diagnostique** la répartition courante : créneaux fractionnaires (barrettes d'1h30 issues du modèle « 4 classes = 5 groupes »), niveaux sans marge, marge de structure hors bande 2–4h, tensions besoin/apport par discipline, opportunité de groupes de besoins en LV1.
2. **Génère des scénarios** uniquement quand une condition est réellement détectée (pas de proposition « pour faire du volume ») :
   - **EDT allégé** — supprime les barrettes fractionnaires, réalloue en heures pleines.
   - **Rééquilibrage de niveau** — transfère de la marge d'un niveau excédentaire vers un niveau qui n'en a aucune.
   - **Reliquat hors bande** — réinvestit un excédent ou reconstitue une marge insuffisante.
   - **Tension disciplinaire** — déplace de la marge d'une discipline en surplus vers une discipline en déficit.
   - **Groupes de besoins LV1 Anglais** — crée des groupes financés par la marge existante, sur les niveaux à fort effectif par division qui suivent encore l'anglais en classe entière.
3. **Justifie chaque proposition** avec les chiffres exacts du diagnostic, directement dans les notes du scénario (visibles dans le comparateur).

Règles strictes appliquées par le moteur : réallocations concrètes uniquement (jamais d'enveloppe flottante non ventilée), heures pleines exclusives (aucune nouvelle barrette d'1h30), marge finale toujours dans la bande 2–4h, idempotent (pas de doublon si on reclique).

Les scénarios (manuels et automatiques) sont **embarqués dans le fichier `.data`** à la sauvegarde, donc ils voyagent avec le fichier — pas seulement dans le `localStorage` du navigateur qui l'a créé.

---

## Exports

- **Excel** (`.xlsx`, via xlsx-js-style) : structure, grille horaire, répartition, professeurs, bilan.
- **PDF** (via jsPDF + autotable) : toutes les pages, fiches de service individuelles, listes d'équipes par classe, note de synthèse pour le Conseil d'Administration.
- **PowerPoint** (`.pptx`, via pptxgenjs) : diaporama de présentation pour le CA (pilotage global, budget, diagnostic de couverture).
- **Export EDT monoposte** : assistant dédié pour préparer l'import dans un logiciel d'emploi du temps.

---

## Architecture technique

- **Aucun framework** : HTML + CSS + JavaScript vanilla (~6800 lignes dans `app.js`).
- **Aucun backend** : tout tourne dans le navigateur. Les librairies externes (Chart.js, xlsx-js-style, jsPDF, pptxgenjs) sont chargées depuis un CDN.
- **Persistance** :
  - Session courante : `localStorage` (clé `DHG_Data_V9`).
  - Sauvegarde durable : fichier `.data` (JSON) téléchargé/rechargé manuellement — c'est le format d'échange et d'archivage.
- **Thème** : palette « Claude Design » (polices IBM Plex Serif/Sans, fond crème, marine/terracotta/vert/violet), avec mode sombre. Variables CSS centralisées dans `style.css`.
- **Hébergement** : GitHub Pages (page statique), `index.html` redirige vers `versuntrm.html`.

---

## Confidentialité & données

- L'application ne communique avec **aucun serveur** pour vos données métier (élèves, professeurs, établissement). Tout reste local à votre navigateur, sauf action explicite de votre part (téléchargement d'un fichier `.data`, export Excel/PDF/PPTX).
- Le dépôt GitHub ne contient **aucune donnée d'établissement réel** : le `.gitignore` exclut tout fichier `*.data`.
- Le site publié par GitHub Pages est accessible publiquement (limite technique de GitHub Pages), mais il s'agit d'une page vierge tant qu'aucune donnée n'y est chargée manuellement — rien n'est pré-rempli ni stocké côté serveur.
- Ne committez jamais de fichier `.data` réel dans ce dépôt.

---

## Développement local

Aucune dépendance à installer. Pour prévisualiser localement :

```bash
python3 -m http.server 8080
# puis ouvrir http://localhost:8080/versuntrm.html
```

---

## Structure des fichiers

```
versuntrm.html        Page principale de l'application
app.js                 Toute la logique métier (calculs, rendu, exports, moteur de scénarios)
style.css              Thème visuel (variables CSS, composants)
versuntrm.dc.html       Maquette de design (Claude Design) — référence visuelle, non fonctionnelle
versuntrm_backup.html   Ancienne version de secours
index.html              Redirection GitHub Pages vers versuntrm.html
```

---

## Limites connues

- Pas de mode multi-utilisateur / collaboratif (un fichier `.data` = un état, à fusionner manuellement si besoin).
- Le moteur de scénarios automatiques ne connaît pas les compétences réelles des enseignants : ses propositions de CSD ou de réallocation sont à valider humainement avant tout arbitrage en CA.
- L'export EDT monoposte est un assistant de préparation, pas une intégration directe avec un logiciel d'emploi du temps.
