# Application Web de Vente de Maquillage en Ligne

## Description

Ce projet est une application web de vente de maquillage en ligne, conçue pour offrir une expérience utilisateur fluide et intuitive. L'application permet aux utilisateurs de parcourir, rechercher, et acheter une variété de produits de maquillage directement en ligne.

## Technologies Utilisées

- **Backend :** Nous avons opté pour Django, un framework web puissant et flexible, pour la gestion du backend. Nous avons utilisé Django REST Framework pour créer une API RESTful, offrant une communication efficace entre le frontend et le backend. Pour la gestion des sessions utilisateur et l'authentification, nous avons intégré JSON Web Tokens (JWT), assurant une sécurité renforcée.
  
- **Frontend :** Le frontend de l'application est développé avec React, une bibliothèque JavaScript moderne qui permet de créer des interfaces utilisateur dynamiques et réactives. Grâce à React, l'application offre une expérience utilisateur fluide, avec des transitions et des interactions rapides.

## Fonctionnalités Principales

- **Catalogue de produits :** Parcourez un large éventail de produits de maquillage avec des filtres de recherche et des catégories pour faciliter la navigation.
- **Panier d'achat :** Gérez facilement les articles que vous souhaitez acheter grâce à un panier d'achat intuitif.
- **Authentification sécurisée :** Inscrivez-vous, connectez-vous et gérez votre compte en toute sécurité avec JWT.
- **Paiement en ligne :** Finalisez vos achats avec une passerelle de paiement sécurisée (fonctionnalité en cours de développement).
- **Gestion des commandes :** Suivez l'état de vos commandes et consultez l'historique de vos achats.

## Installation et Déploiement

Pour exécuter ce projet localement, suivez les étapes ci-dessous :

1. **Clonez le dépôt :** `git clone https://github.com/nom-utilisateur/projet-maquillage.git`
2. **Installez les dépendances backend :**
   ```bash
   cd backend
   pip install -r requirements.txt
3.**Lancez le serveur Django :**
```bash
python manage.py runserver
```
4.**Installez les dépendances frontend :**
```bash
cd frontend
npm install
```
5.**Lancez l'application React :**
```bash
npm start
```
