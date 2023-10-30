# Exercice 1 – Premier pas avec DevOps

## Objectifs

Dans cet exercice, vous allez vous installer un environnement de travail pour la majorité des exercices et des travaux pratiques du cours. Par la suite, vous allez travailler avec Git et les branches.

## Partie 1 : Installation et configuration

### Git

- S'il n'est pas installé, procéder à l'installation de git selon votre système d'exploitation. Vous pouvez-vous aidez du [site officiel](https://git-scm.com/)
- Procédez aux [paramétrage](https://git-scm.com/book/fr/v2/D%C3%A9marrage-rapide-Param%C3%A9trage-%C3%A0-la-premi%C3%A8re-utilisation-de-Git) de vos options globales en respectant les éléments suivant :
  - Nom d'utilisateur : Votre nom complet
  - Courriel : Votre adresse courriel
  - Editeur : Visual Studio Code
  - Exemple de configuration :

```bash
git config --global user.name "John Doe"
git config --global user.email "john.doe@csfoy.ca"
git config --global core.editor "code --wait"
git config --global --list
```

### Installation Docker Desktop

- Installez la dernière version de [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Activez le mode Kubernetes

## Installation Visual Studio Code

- Au besoin, installer [Visual Studio Code](https://code.visualstudio.com/)
- Installer les extensions suivantes :
  - Docker
  - Kubernetes

## Partie 2 : Premières commandes Git

Dans cette partie, vous allez cloner un dépôt Git, créer une branche et déposer cette branche sur le dépôt distant. Au prochain cours nous allons voir la théorie sûre comment travailler avec les branches.

- Faites un fork du dépôt suivant : [https://github.com/PiFou86/420-W44-SF-Module01](https://github.com/PiFou86/420-W44-SF-Module01)
- Clonez localement votre dépôt à l'aide de Visual Studio Code.
- **Attentions, faites des commits à toutes les étapes avec des messages significatifs.**
- Ajouter une branche MaBranche_[VosInitiales] pour ce faire cliquer sur la branche dans la barre en bas.
![Branche](img/brancheVScode.jpg)
- Cliquez sur créer branche dans la barre du haut
- Placez-vous sur cette branche, pour ce faire cliquer sur la branche dans la barre en bas.
![Branche](img/brancheVScode.jpg)
- Prenez le fichier pageEtudiant.html et copier avec comme nouveau nom MaPage_[VosInitiales] et placer ce fichier dans le dossier étudiants
- Créer un lien hypertext entre votre page et votre nom dans la liste de la page index.html
- Faite un commit avec un message significatif.
- Pousser votre branche sur le dépôt distant
- Vous pouvez le faire avec Visual Studio Code
- À partir de GitHub, faites une requête de tirage (pull request) pour fusionner votre branch avec main
- Acceptez votre requête de tirage (pull request) pour fusionner votre branche avec main
- À partir de GitHub, faites une requête de tirage (pull request) vers le dépôt original (https://github.com/PiFou86/420-W44-SF-Module01) pour fusionner votre branch avec main
