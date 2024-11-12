# Module 05 - Déploiements continu avec Azure DevOps

Le but de se module est de mettre en place le déploiement d'une application Web avec une base de données sur Azure. Pour cela, vous allez utiliser Azure DevOps pour mettre en place un pipeline de déploiement continu. Pour cela, vous allez utiliser les fichiers ARM que vous avez extrait dans le module précédent ou les reextraire si ce n'est pas le cas.

Pour vous aider, vous pouvez utiliser le PDF que vous allez trouver à la racine de ce répertoire.

## Exercice 1 - Créer un pipeline de déploiement continu

### Tâche 1 - Extraire des fichiers ARM (si ce n'est pas déjà fait)

À partir du portail Azure, créez une application web et une base de données. Puis, faite l'extraction des fichiers ARM :

- Débutez la création d'une application web à partir du portail
- Configurez l'ensemble par le portail
- Faite l'extraction des fichiers ARM
- Testez les en ligne de commande (seul les chaines de connexion à la BD ne devraient pas fonctionner)
- Effectuez les mêmes actions pour la base de données

****Attention de bien choisir les ressources les moins couteuses (Voir module précédent !)****

### Tâche 2 - Préparation du dépôt Git et d'un pipeline pour l'IaC

- À partir site web de Azure DevOps, retourner dans le projet d'équipe que vous aviez utilisé dans le module 3 pour l'application eShopOnWeb
- Modifiez le code source de l'application pour intégrer la création de la BD au démarrage de l'application (Pour simplifier la migration) et envoyez le code source dans votre dépôt Git (Voir le module précédent)
- À partir du portail Azure DevOps, créez un nouveau dépôt Git nommé "eShopOnWeb-IaC"
- Clonez le dépôt Git sur votre machine
- Ajoutez les fichiers ARM dans votre dépôt Git en créant un nouveau répertoire nommé "BD" et un autre nommé "WebApp"
- Mettez les fichiers ARM dans les répertoires "BD" et "WebApp"
- Poussez le modification dans votre dépôt distant
- Créez un pipeline d'intégration continu pour le dépôt Git "eShopOnWeb-IaC" qui copie simplement les fichiers ARM dans un artefact nommé "IaC"

### Tâche 3 - Création d'un pipeline de déploiement continu

- Créez un "Release Pipeline" nommé "eShopOnWeb-Release"
- Ajoutez l'artefact "IaC" qui a été créé dans le pipeline d'intégration continu
- Créez un environnement de déploiement nommé "Dev". Ici un environnement sera représenté par un "stage" dans le pipeline de déploiement
- Ajoutez une tâche de type "ARM Template Deployment" dans le stage "Dev"
- Testez votre pipeline de déploiement et vérifiez que les ressources sont bien créées dans votre souscription Azure

### Tâche 4 - Ajouter une étape de déploiement de l'application

- Modifiez le pipeline de déploiement pour ajouter une étape de déploiement de l'application :
  - Ajoutez l'artefact "eShopOnWeb" qui a été créé dans le pipeline d'intégration continu
  - En début de pipeline, ajoutez une tâche de type "File transform" pour modifier le fichier "appsettings.json" pour qu'il contienne la bonne chaîne de connexion à la base de données
  - À la suite de la tâche de déploiement du fichier ARM, ajoutez une tâche de type "Azure App Service Deploy" dans le stage "Dev" et configurez le pour qu'il déploie l'application sur l'application web
  - Dans l'onglet "Variables", ajoutez une variable nommée "ConnectionStrings.CatalogConnection" et configurez la pour qu'elle contienne la bonne chaîne de connexion à la base de données
  - Faites de même pour la variable "ConnectionStrings.IdentityConnection"
- Essayez de déployer votre application et vérifiez que l'application est bien déployée et que la base de données est bien créée

### Tâche 5 - Modifier les variables de création des ressources

- Allez dans l'édition du pipeline de déploiement
- Ajoutez une étape de type "File transform" dans le stage "Dev" pour modifier les fichier "parameters.json"
- Dans variables, ajoutez les variables nécessaires pour configurer les noms des ressources (observez bien les noms des variables dans les fichiers ARM). Les valeurs doivent être suffixées par "-dev". Exemples de variables :
  - serverName
  - administratorLogin
  - administratorLoginPassword
  - name
  - hostingPlanName
  - serverFarmResourceGroup
- Supprimez vos ressources azure et testez votre pipeline de déploiement pour vérifier que les ressources sont bien créées avec les noms que vous avez choisis et que l'application se déploie correctement

### Tâche 6 - Ajouter un environnement de déploiement

- Cloner votre environnement "Dev" en un environnement de déploiement nommé "Prod" dans votre pipeline de déploiement
- Modifiez les variables de déploiement pour que les ressources soient créées dans un autre groupe de ressources et avec un nom suffixé par "-prod" à la place de "-dev"
- Testez vos deux environnements de déploiement

### Tâche 7 - Nettoyer vos ressources Azure

- Supprimez vos ressources Azure pour ne pas être facturé
