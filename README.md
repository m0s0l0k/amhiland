# Amhiland

Socle du site web Amhiland. Le projet commence comme un site statique et pourra évoluer par étapes lorsque des besoins dynamiques seront établis.

## Prérequis

- Node.js 24 (minimum pris en charge : 22.12)
- pnpm 10.8.1, fourni via Corepack

## Développement local

```sh
corepack pnpm install --frozen-lockfile
corepack pnpm dev
```

Astro affiche l’adresse locale dans le terminal.

## Vérifications

```sh
corepack pnpm check
corepack pnpm test
corepack pnpm build
corepack pnpm preview
```

La CI exécute ces contrôles et audite les dépendances de production. Le site généré se trouve dans `dist/`.

## Configuration

Le site initial ne nécessite aucune variable d’environnement. `.env.example` sert de modèle si un besoin apparaît ; ne jamais ajouter de secret ou de fichier `.env` réel au dépôt.

## Documentation

Voir [`docs/architecture.md`](docs/architecture.md), [`docs/deployment.md`](docs/deployment.md), [`docs/security.md`](docs/security.md), [`docs/privacy.md`](docs/privacy.md) et [`docs/content-guide.md`](docs/content-guide.md).
