# Module04 - Cloud Introduction

## Objectifs

- Préparer l'environnement de travail
- Découverte du portail Azure
- Installation du Azure CLI

## Exercice 1 - Préparation de l'environnement

### Tâche 1 - Validation du compte Azure

- Vérifier que vous avez un compte Azure
  - Connectez-vous à https://portal.azure.com
  - Sur votre cahier de laboratoire, notez le nom de votre abonnement
- Si vous n'avez pas de compte Azure, vous pouvez en créer un gratuitement (si crédit non utilisé) :
  - https://azure.microsoft.com/fr-ca/free/students/
- Pour accéder au menu étudiant à partir du portail, simplement se rendre sur le service Azure "Education".

### Tâche 2 - Installation du Azure CLI

- Installez le Azure CLI sur votre machine. **Pour ceux qui utilisent l'application *Windows Terminal*, veillez prendre note que la tâche *Azure Cloud Shell* est actuellement non opérationnelle. Cependant une fois Azure CLI installé, il sera possible d'utiliser les commandes Azure dans *CMD* ou dans *PowerShell*.**
  - https://docs.microsoft.com/fr-ca/cli/azure/install-azure-cli
- Testez l'installation
  - Ouvrez un terminal
  - Exécutez la commande `az login`
  - Connectez-vous avec votre compte Azure
  - La commande `az account list` s'exécute automatiquement. Sur "Azure Cloud Shell", la commande est `az account show`.
  - Notez le nom de votre abonnement sur votre cahier de laboratoire.

## Exercice 2 - Découverte du portail Azure

### Tâche 1 - Création d'une ressource par l'interface web

- Créez une ressource Azure
  - Ouvrez le portail Azure
  - Cliquez sur `Créer une ressource` (en haut à gauche)
  - Allez dans la catégorie `Stockage` sélectionnez `Storage account` (Compte de stockage)
  - Choisissez votre abonnement, créez un groupe de ressources "M04-Exercice2-T01" et nommez votre compte de stockage avec votre matricule, exemple `1234567stockage` (peu d'importance).
  - Au niveau de la région, choisissez `Canada east`
  - Pour la redondance de stockage, il devrait s'afficher 2 options. Choisissez `Stockage localement redondant` (LRS)
  - Rendez-vous dans l'onglet "Étiquettes" et ajoutez les étiquettes suivantes&nbsp;:
    - `cohorte` : `4393`
    - `session` : `A22`
    - `cours` : `420-W44-SF`
    - `module` : `M04`
  - Cliquez sur l'onglet "Vérifier + Créer", attendez que Azure valide votre ressource et cliquez sur le bouton "Créer".
  - Téléchargez la ressource.

### Tâche 2 - Affichage du Cloud Shell

- Ouvrez le Cloud Shell
  - Cliquez sur le bouton `Cloud Shell` (en haut à droite) (Vous pouvez aussi utiliser l'URI https://shell.azure.com/)
  - Choisissez `Bash`
  - Cliquez sur "Afficher les paramètres avancés". Autrement, un nouveau compte de stockage sera créé. Sélectionnez&nbsp;:
    - Votre bonne région
    - Votre groupe de ressources
    - Votre compte de stockage
    - Créez un partage de fichier (le nom a peu d'importance).
  - Une fois le Cloud Shell ouvert, exécutez la commande `az account show`
  - Notez le nom de votre abonnement sur votre cahier de laboratoire et valider que c'est le même que celui de la tâche précédente.
- Allez dans le dossier `~/clouddrive`. Vous pouvez utiliser les commandes Linux et Windows.
- Créez le fichier `test.txt` avec le contenu suivant :
  - `Bonjour, je suis un fichier texte créé à partir du Cloud Shell`
- Retournez dans le portail :
  - Allez dans le groupe de ressources que vous avez créé
  - Allez dans le compte de stockage
  - Dans la section de gauche, allez dans `partage de fichiers`
  - Validez que vous voyez bien votre fichier
  - Téléchargez le fichier `test.txt` sur votre machine et validez que le contenu est correct.

### Tâche 3 - Création d'une ressource par le Cloud Shell

- Ouvrez "CMD" ou "PowerShell" sur votre ordinateur
- Vérifiez que vous êtes bien connecté à votre compte Azure
  - Exécutez la commande `az account show`
  - Valider que c'est le même que celui de la tâche précédente
- Créez un nouveau compte de stockage :
  - Créez un nouveau groupe de ressources :
    - Exécutez la commande `az group create --name "M04-Exercice2-T03" --location "canadaeast"`
    - Validez le résultat de la commande avec la commande `az group list`
  - Créez un nouveau compte de stockage :
    - Exécutez la commande `az storage account create --name "m04exercice2t03" --location "canadaeast" --resource-group "M04-Exercice2-T03" --sku "Standard_LRS"`
    - Validez le résultat de la commande avec la commande `az storage account list`

## Exercice 3 - Nettoyage des ressources

### Tâche 1 - Suppression des ressources par le portail

Supprimez les ressources créées dans l'exercice 2 / tâche 1 :

- Allez dans le groupe de ressources que vous aviez créé
- Supprimez le groupe de ressources
- Validez que le groupe de ressources a bien été supprimé

### Tâche 2 - Suppression des ressources par le Azure CLI

Supprimez les ressources créées dans l'exercice 2 / tâche 3 :

- Ouvrez un terminal sur votre ordinateur
- Liste les groupes de ressources :
  - Exécutez la commande `az group list`
- Supprimer le groupe de ressources :
  - Exécutez la commande `az group delete --name "M04-Exercice2-T03"`
- Validez que le groupe de ressources a bien été supprimé
  - Exécutez la commande `az group list`
