# 💕 Girlfriend Day - Application de Messages d'Amour

Une application web romantique permettant de créer et partager des messages d'amour personnalisés avec des animations magiques.

## ✨ Fonctionnalités

- **Création de messages personnalisés** : Prénom de la destinataire + message d'amour (500 caractères max)
- **Liens uniques partageables** : Chaque message génère un lien unique
- **Animations romantiques** : Enveloppe interactive avec ouverture fluide et pluie de cœurs
- **Design responsive** : Optimisé mobile-first avec une palette romantique
- **Expérience utilisateur fluide** : Interface épurée, maximum 2 clics

## 🚀 Technologies Utilisées

- **Frontend** : Next.js 14 (App Router)
- **Base de données** : Supabase
- **Styling** : Tailwind CSS
- **Animations** : Framer Motion
- **Icônes** : Lucide React
- **Typographie** : Google Fonts (Inter + Dancing Script)

## 📋 Prérequis

- Node.js 18+ 
- Compte Supabase
- NPM ou Yarn

## 🛠️ Installation

1. **Cloner le projet**
```bash
git clone <votre-repo>
cd girlfriend-day-app
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration Supabase**
   - Créez un nouveau projet sur [Supabase](https://supabase.com)
   - Allez dans Settings > API pour récupérer vos clés
   - Renommez `.env.local` et ajoutez vos clés :

```env
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anonyme_supabase
```

4. **Créer la base de données**
   - Dans le dashboard Supabase, allez dans SQL Editor
   - Exécutez le contenu du fichier `supabase/migrations/create_messages_table.sql`

5. **Lancer l'application**
```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

## 🗂️ Structure du Projet

```
├── app/                    # App Router de Next.js
│   ├── create/            # Page de création de messages
│   ├── love/              # Page d'affichage des messages
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Page d'accueil
│   └── globals.css        # Styles globaux
├── components/            # Composants réutilisables
│   └── EnvelopeAnimation.tsx # Animation d'enveloppe
├── lib/                   # Utilitaires
│   └── supabase.ts        # Configuration Supabase
├── supabase/              # Migrations de base de données
│   └── migrations/
└── public/                # Assets statiques
```

## 🎨 Palette de Couleurs

- **Rose poudré** : `#F8BBD9`
- **Blanc cassé** : `#FFF8F0`  
- **Doré romantique** : `#F59E0B`
- **Rose profond** : `#EC4899`
- **Rose clair** : `#FCE7F3`

## 🔧 Déploiement

### Vercel (Recommandé)

1. Connectez votre repo à Vercel
2. Ajoutez vos variables d'environnement dans les paramètres Vercel
3. Déployez automatiquement

### Netlify

1. Build command : `npm run build`
2. Publish directory : `out`
3. Ajoutez vos variables d'environnement

## 📱 Utilisation

1. **Page d'accueil** (`/`) : Présentation de l'application
2. **Création** (`/create`) : 
   - Saisir le prénom de la destinataire
   - Écrire le message d'amour (max 500 caractères)
   - Générer et copier le lien unique
3. **Affichage** (`/love?id=xxx`) :
   - Animation d'enveloppe fermée avec battement de cœur
   - Clic pour ouvrir avec pluie de cœurs
   - Affichage du message personnalisé

## 🐛 Résolution des Problèmes

### Erreurs Supabase
- Vérifiez vos variables d'environnement
- Assurez-vous que la table `messages` existe
- Vérifiez les politiques RLS

### Problèmes d'animations
- Vérifiez que Framer Motion est correctement installé
- Les animations peuvent être réduites sur les appareils avec `prefers-reduced-motion`

### Erreurs de build
```bash
npm run build
```
Vérifiez les erreurs TypeScript et corrigez-les

## 🤝 Contribution

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 💖 Crédits

Créé avec amour pour célébrer les relations et partager des moments magiques.

---

**Note** : Cette application ne nécessite aucune authentification et stocke les messages de façon permanente. Assurez-vous de respecter la confidentialité des utilisateurs.#   a m o u r c m  
 