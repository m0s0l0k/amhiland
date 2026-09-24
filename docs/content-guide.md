# Guide de contenu

Le contenu de la V1 reste court, local et versionné avec le code dans `src/content/news/`. Les actualités sont rédigées manuellement en Markdown, sans collecte distante, scraping, API ni agent. Ne pas ajouter de données personnelles réelles ni de contenu dont les droits ne sont pas établis.

La collection `news` est définie dans `src/content.config.ts` à partir du schéma partagé `src/lib/news-schema.ts`. Il valide `title`, `slug`, `category`, `excerpt`, `publishedAt`, `updatedAt`, `tags`, `featured`, `illustration` et `demo`. Les textes non vides sont débarrassés des espaces en bordure ; les dates de mise à jour antérieures à la publication sont refusées. Les catégories autorisées sont `Hunter × Hunter`, `JoJo` et `Anime & Manga`.

Pour ajouter un article, créer un fichier Markdown dont le nom correspond au slug dans `src/content/news/`, puis renseigner les champs requis du frontmatter. La cohérence fichier/slug et l'unicité des slugs sont vérifiées pendant la génération. Les dates utilisent le format YAML `YYYY-MM-DD`. `illustration` est optionnel : sans choix explicite, un motif est associé à la catégorie. `demo` vaut `false` par défaut. Les pages de liste et de détail sont générées statiquement au build.

Les trois premiers articles sont fictifs et portent la propriété `demo: true`, affichée comme avertissement. Remplacer ces exemples uniquement par du contenu vérifié, sourcé et autorisé avant toute publication réelle. Aucune collecte automatisée ni agent de news n’est en place.
