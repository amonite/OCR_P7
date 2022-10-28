+=======================================================================================+
                                    Groupommania 
+=======================================================================================+

Introduction :

Groupomania est un réseau social interne pour les employés de Groupomnaia, une entreprise
fictive, dans le cadre du dernier projet de la formation développeur web de l"école en
ligne Openclassrooms.com

Ce document décrit la manière de faire tourner le projet en local sur votre pc depuis chez 
vous. 

Une fois le projet cloné il vous faudra suivre les étapes suivantes:

 1 - Connection à la base de données MongoDB :

    Afin de faire fonctionner la partie backend il est tout d'abord nécessaire de créer un compte
sur le site de mongoDB qui propose un service gratuit de base de donnée (database as a service).

https://www.mongodb.com/cloud/atlas

Une fois votre compte gratuit activé, créez un cluster en le configurant avec l'option AWS et 
uniquement les options gratuites.

Pendant le démarrage de votre cluster, vous pouvez acceder à l'onglet Database Access qui vous 
permet d'ajouter un utilisateur qui dispose des droits d'écriture et de lecture dans n'importe
quelle base de donnée.

Notez bien votre nom d'utilisateur et votre mot de passe, ils seront necéssaires pour connecter
l'API au cluster.

Ensuite depuis l'onglet Netwok Access, cliquez sur Add IP Address et autoriser depuis 
n'importe ou (Add access from Anywhere).

Depuis MongoDB Atlas cliquez sur le bouton Connect et choisissez Connect your application.
Selectionnez bien la version la plus récente du driver Node.js puis Connection String Only
et faites une copie de la chaîne de caractères retournée.

2 - Création du fichier .env :

    Créez un fichier .env dans le dossier "backend" qui contiendra 2 variables d'environnement
nécessaires au bon fonctionnenemnt de l'application.

Dans ce fichier il faut créer :
 - une variable USER_KEY qui prendra comme valeur votre chaîne
de caractère retournée par mongoDB et remplacer le <PASSWORD> par le votre (en enlevant les
chevrons).
- une variable SECRET_PHRASE qui contiendra la clef pour décripter le token lors de l'authen-
tification. 

exemple:
USER_KEY='votre_chaîne_de_caractères_fournie_par_mongodb'
SECRET_PHRASE='une_chaîne_de_caractères_de_votre_choix'

3 - Installer nodejs sur votre ordinateur :

Linux :
Dans un terminal entrez la comande suivante :
sudo apt-get install nodejs

Windows et Mac:
allez sur https://nodejs.org/en/ puis installez la dernière version.

4 - Démarrez le projet :

    Depuis le dossier du backend entrez les commandes suivante dans un terminal:
npm install
node server 

Depuis le dossier du frontend entrez les commandes suivantes dans un terminal:
npm install
npm run start 

Dans le navigateur de votre choix allez à l'adresse suivante :
http://localhost:3000

Voila tout est en place et Groupomania devrait se lancer en local sur votre ordinateur.

5 - Créez un utilisateur administrateur :

Afin de pouvoir modérer les messages postés sur Groupomania il est nécessaire de créer
un compte qui dispose des droits d'administration. 

Commencez par vous enregistrer dans l'application  avec une adresse email et un mot de 
passe de votre choix. 

Ensuite sur le site de mongoDB vous avez la possibilité de consulter et d'éditer les 
données présentes dans la base depuis l'onglet Collections.

Cliquez sur "users" pour voir les données de votre utilisateur nouvellement créé.
Puis sur l'icone d'edition qui apparait quand vous passez la souris sur les dif-
férents champs du document. 
Changez la valeur de 'isAdmin' pour le passer de l'état 'false' à l'état 'true'.

