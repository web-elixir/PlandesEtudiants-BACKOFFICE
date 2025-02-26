# PlanDesEtudiantsBackOffice

## Strapi v5 + MySQL + React (Vite)

Ce projet est un backoffice Strapi v5 utilisant MySQL comme base de données, accompagnée d'un front-end en React avec Vite.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :
- [Node.js 22 LTS](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MySQL](https://www.mysql.com/)

## Installation

1. Clonez ce dépôt :
   ```sh
   git clone https://github.com/lucasdslvra/PlanDesEtudiantsBackOffice.git
   cd PlanDesEtudiantsBackOffice/Backoffice-Strapi
   ```

2. Installez les dépendances :
   ```sh
   npm install
   ```

3. Configurez la base de données MySQL :
   - Créez une base de données MySQL.
   - Copiez le fichier `.env.example` en `.env` et modifiez les variables pour correspondre à votre configuration :
     ```env
     DATABASE_CLIENT=mysql
     DATABASE_HOST=localhost
     DATABASE_PORT=3306
     DATABASE_NAME=strapi_db
     DATABASE_USERNAME=root
     DATABASE_PASSWORD=yourpassword
     ```

4. Créez le dossier `uploads` dans `public` pour le stockage des fichiers :
    ```sh
    mkdir public/uploads
    ```
    Assurez-vous que ce dossier est ignoré dans `.gitignore`.
    ```sh
    /public/uploads
    ```

## Démarrage du projet

1. Générez le build :
   ```sh
   npm run build
   ```

2. Démarrez Strapi en mode développement :
   ```sh
   npm run develop
   ```

   ou en mode production :
   ```sh
   npm start
   ```

3. Accédez à l'interface d'administration :
   - Ouvrez [http://localhost:1337/admin](http://localhost:1337/admin) dans votre navigateur.

## Front-end React (Vite)

1. Allez dans le dossier `frontend` :
   ```sh
   cd Backoffice-Front
   ```

2. Installez les dépendances :
   ```sh
   npm install
   ```

3. Lancez l'application en mode développement :
   ```sh
   npm run dev
   ```

4. Accédez au front-end via :
   - Ouvrez [http://localhost:5173](http://localhost:5173) dans votre navigateur.

## Commandes utiles

- **Lancer Strapi en mode développement** :
  ```sh
  npm run develop
  ```
- **Lancer Strapi en mode production** :
  ```sh
  npm start
  ```
- **Lancer le front-end en mode développement** :
  ```sh
  cd frontend && npm run dev
  ```
- **Nettoyer le cache et reconstruire** :
  ```sh
  npm run build
  ```
- **Mettre à jour les dépendances** :
  ```sh
  npm update
  ```

## Déploiement

1. Assurez-vous que votre base de données est accessible en production.
2. Déployez votre code sur un serveur compatible Node.js.
3. Configurez les variables d'environnement de production.
4. Exécutez :
   ```sh
   npm run build && npm start
   ```

5. Pour déployer le front-end, générez un build :
   ```sh
   cd Backoffice-Front
   npm run build
   ```
   Puis servez les fichiers statiques via un serveur (Nginx, Vercel, Netlify, etc.).