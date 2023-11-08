# Module 03 –  Création d’un pipeline avec l’interface classique

## Informations

- Évaluation : formative
- Type de travail : Individuel
- Durée : 3 heures
- Plate forme : Azure DevOps

## Objectifs

- Créer un projet Azure DevOps
- Créer un pipeline d'intégration continue à travers l'interface classique
- Créer un pipeline d'intégration continue en YAML

## Création du projet Azure DevOps

- Sur votre poste de développement, clonez le dépôt "https://github.com/PiFou86/eShopOnWeb_net60" (Version fixe prise de [https://github.com/dotnet-architecture/eShopOnWeb](https://github.com/dotnet-architecture/eShopOnWeb) )
- Désactivez le suivi de sources de votre nouveau répertoire en supprimant le répertoire « .git »
- Initialisez votre répertoire avec les sources actuelles avec « git init »
- Ajoutez tous vos fichiers et validez la version actuelle
  - git add .
  - git commit -m "version initiale"
- Dans votre organisation Azure DevOps, créez un projet d’équipe nommé « eShopOnWeb »
- Poussez le code de votre poste de développement vers le dépôt du projet Azure DevOps
  - Suivez les indications fournies dans la page d’accueil du dépôt par dépôt du projet. Les commandes sont :
  - git remote add origin https://<login>@dev.azure.com/<organisation>/<projet>/_git/<nomDepot>
  - git push -u origin --all

### Testez la solution localement

- Naviguez le répertoire « src/Web »
- Exécutez le projet
  - Si vous avez un problème de bases de données, vous pouvez éditer le fichier « appsettings.Development.json » et ajouter la clef « UseOnlyInMemoryDatabase » avec la valeur « true » : la base de données sera alors en mémoire
- Lancez votre navigateur Web afin de valider que le site fonctionne correctement

### Création locale de l’artefact et tests

Étapes :

- Naviguez le répertoire racine de votre dépôt
- Débutez par la restauration des packages Nuget : ici vous devrez spécifier le nom de votre solution en arguments. Vous devrez aussi le faire dans les commandes suivantes
- Lancez la compilation de la solution avec la configuration « Release »
- Lancez les tests unitaires avec la configuration « Release »
- Créez une version publiable du projet Web avec la configuration « Release » avec la sortie dans le répertoire « bin/publishedArtifact »
- Testez votre artéfact

<details>
    <summary>Solution</summary>

Étapes et commandes

```bash
cd <cheminDepot>
dotnet restore eShopOnWeb.sln 
dotnet build --configuration Release eShopOnWeb.sln
dotnet test --configuration Release eShopOnWeb.sln
dotnet publish src/Web --configuration Release --output bin/publishedArtifact
cd bin/publishedArtifact ; dotnet Web.dll
```

</details>

## Création d’un pipeline avec l’interface classique

<details>
    <summary>Si vous ne pouvez pas voir la création classique</summary>

- Allez dans "Organization Settings"
- Allez dans "Pipelines / Settings"
- Allez désactiver les options "Disable creation of classic release pipelines" et "Disable creation of classic build pipelines"

![Activation des "modes classiques"](img/activer_mode_classic.png)

</details>

### Étapes

- Créez le pipeline classique « eShopOnWeb_CI » qui s’appuie sur les sources de votre dépôt git
- Choisissez le modèle « ASP.NET Core »
- Au niveau de l’agent, nous allons changer et compiler notre solution sur Linux : choisissez « ubuntu-20.04 »
- Naviguez les différentes tâches et comparez vos commandes avec les valeurs des options des tâches : vous devriez voir des variables. Ces variables sont déclarées et définies dans l’onglet « Variables » du pipeline. Les autres sont définies automatiquement par l’agent (https://docs.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops) 
- Sauvegardez vos modifications et lancez manuellement une intégration pour valider le tout

### Instructions plus détaillées

- Sur le site du projet Azure DevOps « eShopOnWeb », naviguez le menu « Pipelines/Pipelines »
- Cliquez sur « Create Pipeline »
- Choisissez le lien en bas de page « Use the classic editor to create a pipeline without YAML »
- Choisissez « Azure Repos Git »
- Cliquez sur « Continue » (les options par défaut devrez être bonnes car vous n’avez qu’un dépôt dans votre projet)
- Choisissez le modèle « ASP.NET Core »
- Cliquez sur « Apply »
- Au niveau de l’agent, nous allons changer et compiler notre solution sur Linux : choisissez « ubuntu-20.04 »
- Naviguez les différentes tâches et comparez vos commandes avec les valeurs des options des tâches : vous devriez voir des variables. Ces variables sont déclarées et définies dans l’onglet « Variables » du pipeline. Les autres sont définies automatiquement par l’agent (https://docs.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops) 
- Sauvegardez vos modifications et lancez manuellement une intégration pour valider le tout en cliquant sur le bouton « Save & queue »

### Ajout de la couverture de tests

- Modifiez le pipeline afin d’ajouter l’argument « --collect "Code coverage" » à la tâche de tests.
- Sauvegardez à nouveau votre pipeline et lancez-le
- Validez que la métrique est maintenant présente

## Création d’un pipeline avec YAML

Le pipeline doit créer les artéfacts nécessaires à la publication d’eShopOnWeb. La solution est donnée à la fin du document. Vous pouvez vous y référer en cas de problèmes ou de doutes.

### Étapes

- Créez le pipeline « eShopOnWeb_CI – YAML » qui s’appuie sur les sources de votre dépôt git :
  - Choisissez le modèle « Azure Repos Git - YAML »
  - Sélectionnez votre dépôt
  - Choisissez le modèle « ASP.Net Core
  - Supprimez toutes les tâches (« task »)
- Créez les quatre tâches suivantes : restauration de packages, compilation, tests et publication en utilisant la commande « dotnet » :
  - Pour cela, ajoutez une tâche avec la bonne commande
  - Cliquez sur « .NET Core »
  - Choisissez la commande adéquate (restore / build / pusblish)
  - Ajoutez les arguments nécessaires en utilisant des références aux variables
- Ajoutez la tâche de publication des artéfacts : l’artefact doit contenir le résultat de la publication
- Sauvegardez vos modifications et lancez manuellement une intégration pour valider le tout

### Ajout de la couverture de tests

- Modifiez le pipeline afin d’ajouter l’argument « --collect "Code coverage" » à la tâche de tests.
- Sauvegardez à nouveau votre pipeline et lancez-le
- Validez que la métrique est maintenant présente

<details>
    <summary>Solultion YAML</summary>

```yaml
trigger:
- master

pool:
  vmImage: 'windows-2022' 

variables:
  solution: '**/*.sln'
  buildPlatform: 'Any CPU'
  buildConfiguration: 'Release'

steps:
  - task: DotNetCoreCLI@2
    displayName: 'Restore'
    inputs:
      command: 'restore'
      projects: '$(solution)'
  - task: DotNetCoreCLI@2
    displayName: 'Build'
    inputs:
      command: 'build'
      projects: '$(solution)'
      arguments: '--configuration $(BuildConfiguration) /p:Platform="$(BuildPlatform)"'
  - task: DotNetCoreCLI@2
    displayName: 'Tests'
    inputs:
      command: 'test'
      projects: '**/*[Tt]ests/*.csproj'
      arguments: '--configuration $(BuildConfiguration) /p:Platform="$(BuildPlatform)" --collect "Code coverage"'
  - task: DotNetCoreCLI@2
    displayName: 'Publication'
    inputs:
      command: 'publish'
      publishWebProjects: true
      arguments: '--configuration $(BuildConfiguration) /p:Platform="$(BuildPlatform)" --output "$(Build.ArtifactStagingDirectory)"'
  - task: PublishBuildArtifacts@1
    displayName: 'Publication Azure'
    inputs:
      PathtoPublish: '$(Build.ArtifactStagingDirectory)'
      ArtifactName: 'Web'
      publishLocation: 'Container'
```

</details>

### Test local

Téléchargez votre artefact et validez qu’il fonctionne en local :

- Téléchargez le fichier « Web.zip »
- Décompressez le fichier dans un répertoire
- En ligne de commande, placez-vous dans le répertoire décompressé
- Lancez l’exécution du site web et validez qu’il fonctionne dans le navigateur (si vous avez une erreur SQL, reportez-vous à la solution de modifier la source de données dans le fichier « appsettings.json ».

## Pour vérifications

- Résumé ce que vous avez compris dans un document Word.
- Copies d'écran comprenant l'adresse URL de vos pipelines : édition et exécution
- Code YAML
- Copies d'écran du site qui tourne en local
