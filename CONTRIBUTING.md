# Guide de contribution

Merci de votre intérêt pour contribuer à Pumpfoil Tracker ! 🎉

## Comment contribuer

### Signaler un bug

1. Vérifiez que le bug n'a pas déjà été signalé dans les [Issues](https://github.com/votre-username/pumpfoil-tracker/issues)
2. Créez une nouvelle issue avec :
   - Un titre clair et descriptif
   - Les étapes pour reproduire le bug
   - Le comportement attendu vs le comportement observé
   - Votre environnement (navigateur, OS)
   - Des captures d'écran si applicable

### Proposer une fonctionnalité

1. Ouvrez une issue avec le label "enhancement"
2. Décrivez clairement la fonctionnalité souhaitée
3. Expliquez pourquoi elle serait utile

### Soumettre du code

1. **Fork** le repository
2. **Clone** votre fork localement
3. Créez une **branche** pour votre modification :
   ```bash
   git checkout -b feature/ma-fonctionnalite
   ```
4. Faites vos modifications
5. **Testez** vos changements
6. **Commit** avec un message clair :
   ```bash
   git commit -m "feat: ajout de la fonctionnalité X"
   ```
7. **Push** sur votre fork :
   ```bash
   git push origin feature/ma-fonctionnalite
   ```
8. Ouvrez une **Pull Request**

## Conventions de code

### TypeScript

- Utilisez des types explicites (évitez `any`)
- Documentez les fonctions complexes avec des commentaires JSDoc
- Suivez les conventions de nommage :
  - `camelCase` pour les variables et fonctions
  - `PascalCase` pour les composants et types
  - `UPPER_SNAKE_CASE` pour les constantes

### React

- Utilisez des composants fonctionnels avec hooks
- Préférez les composants atomiques et réutilisables
- Gardez la logique métier séparée de l'UI (hooks personnalisés, services)

### CSS (Tailwind)

- Utilisez les classes Tailwind existantes
- Évitez le CSS personnalisé sauf si nécessaire
- Gardez la cohérence avec le design existant

### Git

- Un commit = une modification logique
- Messages de commit en français ou anglais (soyez cohérent)
- Format recommandé :
  ```
  type: description courte

  Description détaillée si nécessaire
  ```
  Types : `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## Structure du projet

```
src/
├── components/     # Composants React
├── context/        # Contextes React (état global)
├── pages/          # Pages/vues principales
├── services/       # Logique métier, API
├── types/          # Types TypeScript
└── utils/          # Fonctions utilitaires
```

## Tests

Avant de soumettre une PR :

1. Vérifiez que le build passe :
   ```bash
   npm run build
   ```

2. Vérifiez le linting :
   ```bash
   npm run lint
   ```

3. Testez manuellement les fonctionnalités impactées

## Questions ?

N'hésitez pas à ouvrir une issue pour toute question !
