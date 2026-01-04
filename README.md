# 🛍️ Shopia - Plateforme E-Commerce

## 📋 Table des matières
- [À propos](#à-propos)
- [Technologies](#technologies)
- [Architecture](#architecture)
- [Fonctionnalités](#fonctionnalités)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [API Documentation](#api-documentation)
- [Docker](#docker)
- [Schéma de base de données](#schéma-de-base-de-données)
- [Scripts disponibles](#scripts-disponibles)
- [Structure du projet](#structure-du-projet)

---

## 🎯 À propos

**Shopia** est une plateforme e-commerce complète construite avec NestJS et PostgreSQL. Elle offre un système complet de gestion de produits, commandes, utilisateurs et inventaire avec authentification JWT.

### Caractéristiques principales
- 🔐 Authentification JWT avec gestion des rôles (Admin/Client)
- 📦 Gestion complète des produits avec catégories
- 🛒 Système de commandes avec statuts multiples
- 📊 Gestion d'inventaire avec SKU et quantités
- 📝 Documentation API automatique avec Swagger
- 🐳 Support Docker complet
- 🔄 Migrations Prisma automatiques

---

## 🛠️ Technologies

### Backend
- **Framework:** NestJS 11.0.1
- **Langage:** TypeScript
- **Base de données:** PostgreSQL 15
- **ORM:** Prisma 5.22.0
- **Authentification:** JWT (Passport.js)
- **Validation:** Class-validator & Class-transformer
- **Documentation:** Swagger/OpenAPI
- **Sécurité:** Bcrypt pour hachage de mots de passe

### DevOps
- **Conteneurisation:** Docker & Docker Compose
- **Base image:** Node 20 Alpine Linux

---

## 🏗️ Architecture

### Modules principaux

#### 1. **Auth Module**
- Inscription (`POST /auth/register`)
- Connexion (`POST /auth/login`)
- Génération de tokens JWT
- Guards pour protection des routes

#### 2. **Users Module**
- CRUD complet des utilisateurs
- Gestion des rôles (ADMIN, CLIENT)
- Endpoints protégés par authentification

#### 3. **Products Module**
- Gestion des produits (CRUD)
- Activation/Désactivation des produits
- Relation avec catégories et inventaire
- Création automatique d'inventaire avec chaque produit

#### 4. **Categories Module**
- CRUD des catégories
- Relation one-to-many avec les produits

#### 5. **Inventory Module**
- Gestion du stock par produit
- SKU unique par produit
- Ajustement de quantités (incrémentation/décrémentation)
- Alertes de stock faible
- Gestion des quantités réservées

#### 6. **Orders (Commandes) Module**
- Création de commandes
- Mise à jour partielle (ajout/modification/suppression de produits)
- Gestion des statuts (PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED)
- Calcul automatique du prix total
- Gestion automatique du stock lors des commandes

---

## ✨ Fonctionnalités

### 🔐 Authentification & Autorisation
- [x] Inscription avec validation email
- [x] Connexion avec JWT
- [x] Protection des routes avec Guards
- [x] Gestion des rôles (Admin/Client)
- [x] Décorateur personnalisé `@CurrentUser()`

### 📦 Gestion des produits
- [x] CRUD complet
- [x] Catégorisation
- [x] Activation/Désactivation
- [x] Création automatique d'inventaire
- [x] Validation des SKU uniques

### 🛒 Gestion des commandes
- [x] Création de commandes multi-produits
- [x] Mise à jour partielle:
  - Ajout de produits (`addProduits`)
  - Modification de quantités (`updateProduits`)
  - Suppression de produits (`removeProduitIds`)
- [x] Changement de statut
- [x] Calcul automatique du prix
- [x] Gestion automatique du stock

### 📊 Gestion d'inventaire
- [x] SKU unique par produit
- [x] Suivi des quantités disponibles
- [x] Suivi des quantités réservées
- [x] Ajustement de stock (ajout/retrait)
- [x] Alerte de stock faible
- [x] Recherche par produit

### 📝 Documentation API
- [x] Swagger UI automatique
- [x] Documentation complète de tous les endpoints
- [x] Exemples de requêtes/réponses
- [x] Authentification Bearer dans Swagger

---

## 📥 Installation

### Prérequis
- Node.js 20+
- PostgreSQL 15+
- npm ou yarn
- Docker & Docker Compose (optionnel)

### Installation locale

```bash
# 1. Cloner le repository
git clone <repository-url>
cd Shopia

# 2. Installer les dépendances
cd backend
npm install

# 3. Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos paramètres

# 4. Lancer PostgreSQL (via Docker ou local)
docker run -d \
  --name shopia-postgres \
  -e POSTGRES_PASSWORD=postgres123 \
  -e POSTGRES_DB=shopia_db \
  -p 5432:5432 \
  postgres:15-alpine

# 5. Générer Prisma Client
npx prisma generate

# 6. Exécuter les migrations
npx prisma migrate deploy

# 7. Seed la base de données (optionnel)
npm run prisma:seed

# 8. Démarrer l'application
npm run start:dev
```

L'API sera disponible sur: `http://localhost:3000`
Swagger UI: `http://localhost:3000/api`

---

## ⚙️ Configuration

### Variables d'environnement

Créer un fichier `.env` dans le dossier `backend`:

```env
# Database
DATABASE_URL="postgresql://postgres:postgres123@localhost:5432/shopia_db"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-in-production"

# Application
PORT=3000
NODE_ENV=development
```

### Configuration de production

Pour la production, modifier:
```env
NODE_ENV=production
JWT_SECRET="<générer-une-clé-sécurisée-ici>"
DATABASE_URL="<url-base-de-données-production>"
```

---

## 🚀 Utilisation

### Démarrage en développement

```bash
cd backend
npm run start:dev
```

### Démarrage en production

```bash
cd backend
npm run build
npm run start:prod
```

### Accès aux interfaces

- **API Backend:** http://localhost:3000
- **Swagger Documentation:** http://localhost:3000/api
- **Prisma Studio:** `npx prisma studio` → http://localhost:5555

---

## 📚 API Documentation

### Authentification

#### Inscription
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "password123",
  "role": "CLIENT"
}
```

#### Connexion
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Produits

#### Créer un produit (avec inventaire)
```http
POST /produits
Authorization: Bearer <token>
Content-Type: application/json

{
  "nom": "iPhone 15 Pro",
  "description": "Latest iPhone model",
  "prix": 12000,
  "categoryId": 1,
  "sku": "IPH-15-PRO-001",
  "quantity": 50,
  "reserved": 0
}
```

#### Lister les produits
```http
GET /produits
Authorization: Bearer <token>
```

### Commandes

#### Créer une commande
```http
POST /commandes
Authorization: Bearer <token>
Content-Type: application/json

{
  "produits": [
    {
      "produitId": 1,
      "quantity": 2
    },
    {
      "produitId": 3,
      "quantity": 1
    }
  ]
}
```

#### Mettre à jour partiellement une commande
```http
PATCH /commandes/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "addProduits": [
    {
      "produitId": 5,
      "quantity": 1
    }
  ],
  "updateProduits": [
    {
      "produitId": 1,
      "quantity": 3
    }
  ],
  "removeProduitIds": [3]
}
```

### Inventaire

#### Ajuster le stock
```http
PUT /inventory/product/:productId/adjust
Authorization: Bearer <token>
Content-Type: application/json

{
  "adjustment": 10  // Positif = ajouter, Négatif = retirer
}
```

#### Stock faible
```http
GET /inventory/low-stock?threshold=10
Authorization: Bearer <token>
```

Pour une documentation complète, visitez: **http://localhost:3000/api**

---

## 🐳 Docker

### Avec Docker Compose (recommandé)

```bash
# 1. Build les images
docker-compose build

# 2. Démarrer les services
docker-compose up -d

# 3. Vérifier les logs
docker-compose logs -f backend

# 4. Exécuter les migrations
docker-compose exec backend npx prisma migrate deploy

# 5. Seed la base de données
docker-compose exec backend npm run prisma:seed

# 6. Arrêter les services
docker-compose down
```

### Services Docker

- **postgres**: PostgreSQL 15 sur port 5432
- **backend**: API NestJS sur port 3000

### Prisma Studio avec Docker

```bash
docker-compose --profile tools up prisma-studio
```

Accès: http://localhost:5555

---

## 🗄️ Schéma de base de données

### Modèles

#### User
- `id`: INT (PK)
- `email`: STRING (unique)
- `name`: STRING
- `password`: STRING (hashed)
- `role`: ENUM (ADMIN, CLIENT)
- `createdAt`: DATETIME

#### Produit
- `id`: INT (PK)
- `nom`: STRING
- `description`: STRING
- `prix`: INT
- `isActive`: BOOLEAN
- `categoryId`: INT (FK)
- `createdAt`: DATETIME

#### Inventory
- `id`: INT (PK)
- `productId`: INT (FK, unique)
- `sku`: STRING (unique)
- `quantity`: INT
- `reserved`: INT
- `createdAt`: DATETIME

#### Commande
- `id`: INT (PK)
- `userId`: INT (FK)
- `status`: ENUM (PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED)
- `totalPrice`: INT
- `createdAt`: DATETIME

#### Category
- `id`: INT (PK)
- `nom`: STRING
- `createdAt`: DATETIME

#### ComProd (Relation produits-commandes)
- `id`: INT (PK)
- `commandeId`: INT (FK)
- `produitId`: INT (FK)
- `quantity`: INT
- `price`: INT

### Relations

```
User 1---* Commande
Produit 1---* ComProd
Commande 1---* ComProd
Category 1---* Produit
Produit 1---1 Inventory
```

---

## 📜 Scripts disponibles

### Backend

```bash
# Développement
npm run start:dev          # Démarrage avec hot-reload

# Build
npm run build              # Compilation TypeScript

# Production
npm run start:prod         # Démarrage en production

# Prisma
npx prisma generate        # Générer le client Prisma
npx prisma migrate dev     # Créer une migration
npx prisma migrate deploy  # Appliquer les migrations
npx prisma studio          # Interface graphique
npm run prisma:seed        # Seed la base de données

# Tests
npm run test              # Tests unitaires
npm run test:e2e          # Tests end-to-end
npm run test:cov          # Coverage

# Qualité du code
npm run lint              # ESLint
npm run format            # Prettier
```

### Docker

```bash
docker-compose build       # Build les images
docker-compose up -d       # Démarrer en arrière-plan
docker-compose down        # Arrêter les services
docker-compose down -v     # Arrêter + supprimer volumes
docker-compose logs -f     # Voir les logs
docker-compose ps          # Status des containers
docker-compose restart     # Redémarrer les services
```

---

## 📁 Structure du projet

```
Shopia/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma          # Schéma de base de données
│   │   ├── seed.ts                # Données de test
│   │   └── migrations/            # Historique migrations
│   ├── src/
│   │   ├── auth/                  # Module authentification
│   │   │   ├── decorators/        # Décorateurs personnalisés
│   │   │   ├── dto/               # Data Transfer Objects
│   │   │   ├── guards/            # Guards JWT
│   │   │   ├── strategies/        # Stratégies Passport
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.module.ts
│   │   ├── users/                 # Module utilisateurs
│   │   │   ├── dto/
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   └── users.module.ts
│   │   ├── produits/              # Module produits
│   │   │   ├── dto/
│   │   │   ├── produits.controller.ts
│   │   │   ├── produits.service.ts
│   │   │   └── produits.module.ts
│   │   ├── categories/            # Module catégories
│   │   │   ├── dto/
│   │   │   ├── categories.controller.ts
│   │   │   ├── categories.service.ts
│   │   │   └── categories.module.ts
│   │   ├── commandes/             # Module commandes
│   │   │   ├── dto/
│   │   │   ├── commandes.controller.ts
│   │   │   ├── commandes.service.ts
│   │   │   └── commandes.module.ts
│   │   ├── inventory/             # Module inventaire
│   │   │   ├── dto/
│   │   │   ├── inventory.controller.ts
│   │   │   ├── inventory.service.ts
│   │   │   └── inventory.module.ts
│   │   ├── prisma/                # Module Prisma
│   │   │   ├── prisma.service.ts
│   │   │   └── prisma.module.ts
│   │   ├── common/                # Ressources partagées
│   │   ├── config/                # Configuration
│   │   ├── app.module.ts          # Module principal
│   │   └── main.ts                # Point d'entrée
│   ├── test/                      # Tests E2E
│   ├── Dockerfile                 # Configuration Docker
│   ├── .dockerignore              # Exclusions Docker
│   ├── package.json               # Dépendances
│   ├── tsconfig.json              # Configuration TypeScript
│   ├── nest-cli.json              # Configuration NestJS
│   └── .env                       # Variables d'environnement
├── docker-compose.yml             # Orchestration Docker
├── .env                           # Variables globales
└── README.md                      # Ce fichier

```

---

## 🔒 Sécurité

### Bonnes pratiques implémentées

- ✅ Hachage des mots de passe avec Bcrypt
- ✅ Authentification JWT avec expiration
- ✅ Protection CORS configurée
- ✅ Validation des données avec class-validator
- ✅ Variables d'environnement pour secrets
- ✅ Guards pour protection des routes
- ✅ Gestion des rôles (RBAC)

### Recommandations pour la production

- [ ] Utiliser HTTPS
- [ ] Configurer rate limiting
- [ ] Mettre en place un WAF
- [ ] Logger les accès et erreurs
- [ ] Sauvegardes régulières de la base de données
- [ ] Monitoring et alertes
- [ ] Changer JWT_SECRET en production

---

## 🧪 Tests

### Tests unitaires
```bash
npm run test
```

### Tests E2E
```bash
npm run test:e2e
```

### Coverage
```bash
npm run test:cov
```

---

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

## 📄 Licence

Ce projet est sous licence UNLICENSED - voir le fichier package.json pour plus de détails.

---

## 👥 Auteurs

- Développeur Backend - NestJS, Prisma, PostgreSQL
- Architecture & DevOps - Docker, CI/CD

---

## 🙏 Remerciements

- NestJS pour le framework backend
- Prisma pour l'ORM moderne
- PostgreSQL pour la base de données robuste
- Docker pour la conteneurisation

---

## 📞 Support

Pour toute question ou problème:
- Ouvrir une issue sur GitHub
- Consulter la documentation Swagger: http://localhost:3000/api
- Vérifier les logs: `docker-compose logs -f`

---

**Fait avec ❤️ et NestJS**