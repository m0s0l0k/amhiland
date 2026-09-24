# Architecture

## Socle

Amhiland utilise Astro avec TypeScript et une sortie statique (`output: static`). Les pages sont pré-rendues en HTML ; aucun serveur applicatif ni stockage de données n’est requis par la V1.

`src/pages/` définit les routes, `src/layouts/` les structures de page, `src/components/` les éléments d’interface, `src/styles/` les styles et variables CSS, et `src/content/` les futurs contenus éditoriaux.

## Évolution

Ajouter une capacité dynamique lorsqu’un besoin concret l’exige. Une page statique pourra appeler une API ou une fonction serveur dédiée. Garder l’interface découplée de cette intégration et éviter de créer des couches génériques avant d’en avoir l’usage.

Les actualités pourront être publiées manuellement dans une collection de contenu. Le test de personnalité sera un module interactif. Les services IA, un backend éventuel et l’intégration d’un RAG externe/local demanderont chacun une décision séparée sur données, hébergement, sécurité et coûts. Le RAG est prévu comme projet GitHub distinct et n’est pas implémenté ici. Le quiz compétitif est hors du site et destiné à une future application mobile.
