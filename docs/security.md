# Sécurité

- Ne jamais commiter de secret, jeton, clé privée, export confidentiel ou fichier `.env` réel.
- `.env.example` ne contient que des indications non sensibles ; le site initial n’en a pas besoin.
- Garder les permissions GitHub Actions minimales et verrouiller les dépendances avec `pnpm-lock.yaml`.
- La CI audite les dépendances de production. Examiner les mises à jour et alertes avant intégration.
- Les futurs secrets d’API ou d’IA devront rester côté serveur ou dans le gestionnaire de secrets de l’hébergeur, jamais dans le code client.
- Définir en-têtes de sécurité et politique de contenu au moment de configurer l’hébergeur et les ressources effectivement utilisées.
