# OpenClassrooms-project-7 - Créer un réseau social d'entreprise.

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) 
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)

Accessible sur *https://groupomania-socials.herokuapp.com/*

## Description

Le projet consiste à construire un **réseau social interne** pour les employés d'une entreprise afin de faciliter les intéractions entre collègues. Il doit être possible de partager et commenter du contenu avec d'autres collègues sur le modèle de **9GAG et Reddit**.  

Voici les exigences émises par le comité de pilotage :  
- la présentation des fonctionnalités doit être simple  
- la création d’un compte doit être simple et possible depuis un téléphone mobile  
- le profil doit contenir très peu d’informations pour que sa complétion soit rapide  
- la suppression du compte doit être possible  
- l’accès à un forum où les salariés publient des contenus multimédias doit être présent  
- l’accès à un forum où les salariés publient des textes doit être présent  
- les utilisateurs doivent pouvoir facilement repérer les dernières participations des employés  
- le ou la chargé-e de communication Groupomania doit pouvoir modérer les interactions entre salariés  

**L'utilisation d'un framework javascript pour le front-end est obligatoire.**

## Installer et lancer l'application

**Prérequis**

Nécessite une base de donnée Postgresql pour le fonctionnement du back-end.

`npm install` ou `yarn install` depuis la racine du projet pour l'installer.
Renommer le fichier `.env.sample` en `.env` et compléter les variables d'environnement pour la base de donnée.

### Front-end et back-end séparés

#### Lancer le back-end

`npm run start:dev` ou `yarn start:dev` depuis la racine pour lancer le back-end.  

*http://localhost:8000/* pour y accéder.

#### Lancer le front-end

`npm run dev` ou `yarn dev` depuis la racine pour lancer le front-end.  

*http://localhost:3000/* pour y accéder.  

### Application complète servie par le back-end

`npm run build` ou `yarn build` pour la compliler.  

`npm run start` ou `yarn start` pour la lancer.

*http://localhost:8000/* pour y accéder.


