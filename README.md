# Analyste d’Univers Business Objects

Application Next.js permettant de charger, analyser et explorer les métadonnées d’un univers SAP Business Objects exporté au format `.unx`, `.xml` ou `.json`. Les fichiers compressés (`.unx`, `.zip`) sont automatiquement décompressés et inspectés côté navigateur : aucune donnée n’est transmise à un service externe.

## 🚀 Démarrage

```bash
npm install
npm run dev
# http://localhost:3000
```

### Scripts disponibles

- `npm run dev` — lance le serveur de développement Next.js
- `npm run build` — construit l’application pour la production
- `npm run start` — démarre le serveur en mode production

## 🔍 Fonctionnalités principales

- Dépôt de fichiers (`.unx`, `.xml`, `.json`, `.lcmbiar`, `.zip`)
- Extraction automatique des documents XML/JSON contenus dans les univers compressés
- Synthèse immédiate des classes, dimensions, mesures, contextes, connexions et extraits SQL
- Visionneuse hiérarchique interactive pour naviguer dans la structure détaillée
- Exemple embarqué (`Charger un exemple`) pour tester l’interface sans fichier réel

## 🗂️ Structure du projet

```
app/                Pages Next.js (App Router)
components/         UI et visualisations
lib/                Parsing et utilitaires
public/sample/      Exemple d’univers au format XML
```

## 🧱 Technologies

- Next.js 14 (App Router)
- React 18
- `fast-xml-parser` pour convertir les fichiers XML en JSON
- `jszip` pour lire les univers `.unx`/`.lcmbiar`

## 🛡️ Notes

- Les univers `.unv` binaires ne peuvent pas être décodés directement ; exportez-les depuis Designer / IDT en `.unx` ou XML.
- Le traitement est exécuté côté client : adaptez l’application si vous devez centraliser l’analyse ou appliquer des règles spécifiques à votre organisation.
