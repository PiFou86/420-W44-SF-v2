# TP04 - Déploiement d'une application web dans Kubernetes sur Azure

## Informations

- Remise du travail: mardi 11 juin 2024, 23:59
- Ce travail est réalisé en équipe de 2 personnes et seuls les membres de cette équipe y contribuent
- Toutes les réponses fournies doivent être originales (produites par l’étudiant ou un membre de l’équipe)
- Toute copie de code, de portion de code, d’algorithme ou de texte doit faire mention de sa source
- L’emprunt ou la copie de code ou de portions de code est interdite
- Tout constat de plagiat, tricherie ou fraude sera automatiquement déclaré à la Direction et les sanctions prévues seront appliquées
- Durée : 3 x 3 heures + travail à la maison
- Plate forme : Docker, Kubernetes, Azure, Azure Dev Ops, Visual Studio Code et dotnet/react
- Pas d'utilisation de Visual Studio (vous êtes des DevOps et l'entreprise ne paie pas de licence pour cela) : vous devez tout faire ne ligne de commande

## Objectifs

- Faire un flux d'intégration continue (CI) avec Azure DevOps qui construit une image Docker et la publie sur Docker Hub ou Azure Container Registry à chaque commit sur la branche master
- Effectuer le déploiement d'une base de données SQL Server dans un service SQL Database (Attention aux coûts ! Prenez la version la moins chère !)
- Effectuer le déploiement d'une application web dans Kubernetes
- Utiliser 3 environnements de déploiement (dev, test, prod) et faire une mise à l'échelle de l'application web dans au moins un environnement
- Être capable d'expliquer la partie théorique et technique

## Remise

- Vidéo sur YouTube (non listée - autour de 10 mins maximum ! Pénalités si dépassé !) (50 points):
  - Explication du/des pipelines d'intégration continue (CI) (7,5 points)
  - Explication du pipeline de déploiement (CD) (7,5 points)
  - Explication des fichiers YAML de déploiement (10 points)
  - Explication de l'architecture de déploiement (10 points) (Lien entre les fichiers sources, les images Docker, les fichiers YAML de déploiement et les environnements de déploiement)
  - Démonstration du fonctionnement de l'application sur les trois environnements (5 points)
  - Démonstration de la mise à l'échelle de l'application web sur au moins un environnement (10 points)
- Fichiers ARM, Images des tâches des pipelines, Fichiers YAML et Dockerfile (30 points)
- Répartition des tâches entre partenaires avec nombre d'heures par partenaire et total (5 points)
- Répondre aux questions suivantes (15 points):
  - Quels avantages offre une infrastructure de type Kubernetes pour votre équipe de développement ?
  - En quoi un service Kubernetes géré de type AKS est-il intéressant pour votre équipe de développement ?
- Fichier `AUTHORS.md` : (Jusqu'à -10 points pour non respect des consignes)
  - Lien YouTube
  - Lien Azure DevOps
  - Vos informations (prénom / nom / matricule)
  - le fichier doit être remis dans l'archive zip sur Léa

En résumé, ce qui est noté est ce qui est dans l'archive zip sur Léa à l'exception de la vidéo sur YouTube dont je dois trouver le lien dans le fichier `AUTHORS.md`.

## Projet

Le projet est écrit en .Net 6.0. Il se trouve dans le répertoire ```src``` du TP précédent.

Pour modifier la configuration de la chaîne de connexion et écraser les valeurs du fichier `appsettings.json`, vous pouvez utiliser les variables d'environnement. Par exemple, pour modifier la valeur de `ConnectionStrings.DefaultConnection` dans le fichier `appsettings.json`, vous pouvez utiliser la variable d'environnement `ConnectionStrings__DefaultConnection` : le point est remplacé par deux underscores.

![Modification de la chaîne de connexion](img/exemple_connectionString.png)

Pour simplifier le déploiemente et pour se concentrer sur l'utilisation de Kubernetes, l'application Web déploie son schéma de base de données à chaque démarrage.

## Étape 1 - Création du pipeline Azure DevOps d'intégration continue - Web

Vous devez créer une image Docker pour l'application Web (GC.WebReact). Vous devez publier l'image sur Docker Hub en public. L'adresse de l'image doit être dans le fichier `AUTHORS.md`.

Vous devez créer un pipeline Azure DevOps qui :

- Construit l'image Docker
- Publie l'image sur Docker Hub ou Azure Container Registry

## Étape 2 - Création du service SQL Database

Vous devez créer un service SQL Database dans Azure. Le serveur doit être déployé à partir d'un pipeline de type Release Azure DevOps (Vous faut-il un pipeline d'intégration continue ?).

Vous devez créer un pipeline de type Release Azure DevOps qui :

- Récupère les fichiers ARM de déploiement du service SQL Database
- Modifie les fichiers ARM pour ajouter les variables d'environnement
- Effectue le déploiement du service SQL Database

**N'oubliez pas, la création des tables est effectuée au démarrage de l'application Web : vous n'avez pas à me démontrer ici que vous savez extraire le fichier SQL à partir d'entity framework.**

## Étape 3 - Création du service Kubernetes

Vous devez créer un service Kubernetes dans Azure. Le serveur doit être déployé à partir du pipeline de type Release Azure DevOps précédent.

Vous devez ajouter les tâches qui :

- Récupère les fichiers ARM de déploiement du service Kubernetes
- Modifie les fichiers ARM pour ajouter les variables d'environnement
- Effectue le déploiement du service Kubernetes

## Étape 4 - Déploiement de l'application Web dans Kubernetes

Vous devez créer les fichiers YAML de déploiement pour déployer l'application Web (GC.WebReact) dans Kubernetes. Vous devez créer un/des fichiers YAML génériques utilisables sur tous les environnements de déploiement (unitaire, acceptation, production) en effectuant simplement des remplacmenets.

Chaque environnement doit :

- Être isolé dans un namespace Kubernetes
- Être configuré à l'aide de configmaps et de secrets
- Les fichiers YAML doivent être réutilisables d'un environnement à l'autre. Si les configmaps ne sont pas utilisable pour certaines sections de vos fichiers YAML, n'oubliez pas que vous pouvez toujours lancer une tâche qui remplace des textes par d'autres textes dans vos fichiers YAML (Vous pouvez installer et utiliser l'extension suivante : [Replace Tokens](https://marketplace.visualstudio.com/items?itemName=qetza.replacetokens)).
- Le conteneur contenant l'application Web doit avoir les tags suivants :
  - app : GC.WebReact
  - tier : web
- Seul le tier web de chaque environnement doit être exposé à l'extérieur du cluster Kubernetes :
  - unitaire : webreact-unitaire.<Votre_zone_DNS>
  - acceptation : webreact-acceptation.<Votre_zone_DNS>
  - production : webreact-production.<Votre_zone_DNS>
  
## Informations supplémentaires
  
- Pour forcer le port d'exposition du site web, vous pouvez utiliser la variable d'environnement `ASPNETCORE_URLS`. Voici un exemple de valeur pour exposer le site sur le port 5000 : `ASPNETCORE_URLS=http://+:5000`
- Vous pouvez allez chercher la zone DNS en ligne de commande avec la commande `az network dns zone list`
- Vous pouvez définir une variable de pipeline à partir d'un script : [https://learn.microsoft.com/en-us/azure/devops/pipelines/process/set-variables-scripts?view=azure-devops&tabs=bash](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/set-variables-scripts?view=azure-devops&tabs=bash)

Tout partage de code, d'explication, de bouts de texte, etc. est considéré comme du plagiat. Pour plus de détails, consultez le site (et ses vidéos) [Sois intègre du Cégep de Sainte-Foy](http://csfoy.ca/soisintegre) ainsi que [l'article 6.1.12 de la PÉA](https://www.csfoy.ca/fileadmin/documents/notre_cegep/politiques_et_reglements/5.9_PolitiqueEvaluationApprentissages_2019.pdf)

## Bonus

- Mise à l'échelle automatique des pods (pas des noeuds !) 5%
