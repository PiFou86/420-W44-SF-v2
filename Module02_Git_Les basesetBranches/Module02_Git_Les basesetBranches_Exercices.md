# Exercice 2 – Utilisation des branches git

## Objectifs

Dans cet exercice, vous allez développer des tâches liées à des branches d'un dépôt. Vous allez apprendre à créer les branches, à les fusionner et au besoin à régler les conflits.

## Étape 1 - Création d'un dépôt GitHub

- Dans le service GitHub, créez le dépôt Git `420-W44-SF-M02`
- Ajouter une description résumant le dépôt
- Choisissez la visibilité `public`
- N'ajoutez pas de fichier `README.md` ou de fichier `.gitignore` pour le moment
- À ce niveau, vous devriez avoir un dépôt vide
- Allez dans le menu `Settings` et ajoutez votre enseignant (@PiFou86) comme collaborateur

## Étape 2 - Initialisation du dépôt

- Sur votre machine, à partir d'une fenêtre de type `ligne de commande`, créez le sous-dossier `420-W44-SF-M02` dans le dossier de votre choix
- À l'intérieur de ce dossier, créez un fichier `README.md` et ajoutez-y le texte suivant :

```md
# 420-W44-SF-M02

Prénom : \<prénom> <br />
Nom : \<nom>
```

- À l'intérieur de ce dossier, créez un fichier `.gitignore` et ajoutez-y le texte suivant :

```md
FichierIgnore.md
```

- À l'intérieur de ce dossier, créez un fichier `FichierIgnore.md` et ajoutez-y le texte suivant :

```md
# Fichier à ignorer
```

- Initialisez le dépôt Git dans ce dossier (`git init`)
- Affichez le status du dépôt (`git status`)
- Notez que le fichier `FichierIgnore.md` est présent dans le répertoire mais est ignoré par Git
- Ajoutez les fichiers `README.md` et `.gitignore` au dépôt (`git add README.md .gitignore`)
- Validez les changements (`git commit -m "Initialisation du dépôt"`)

## Étape 3 - Envoi des modifications sur le dépôt distant

- Rafraîchissez la page de votre dépôt sur GitHub
- Que constatez-vous ?
- Nous allons maintenant envoyer les modifications sur le dépôt distant :
  - Notez les commandes proposées sur la page de votre dépôt
  - Essayez de déduire ce que fait chacune de ces commandes
  - À l'aide de ces commandes, utilisez simplement les commandes les plus pertinentes (pas besoin de tout copier-coller):
    - Ajout du dépôt distant (`git remote add origin <url>`)
    - Paramétrer la branche upstream pour les push (`git push --set-upstream origin main`)
    - Envoi des modifications sur le dépôt distant (`git push`)
- Validez de nouveau les changements sur GitHub

## Étape 4 - Création d'un modèle d'issue

- Retournez sur votre dépôt dans GitHub
- Allez dans le menu `settings` : vous vous retrouvez sur la page des paramètres généraux du dépôt
- Allez dans le menu `Features/Issues` et cliquez sur `Set up templates`
- Choisissez `Set up templates` dans le menu déroulant et prenez `Bug report` comme modèle
- Enregistrez les modifications

## Étape 5 - Création d'une branche

- Créez une branche `develop` à partir de la branche `main` (`git checkout -b develop`)
- Pousser les modifications sur le dépôt distant (`git push --set-upstream origin develop`)
- Validez que la branche `develop` est présente sur GitHub
- Allez dans les `Settings` de votre dépôt et ajoutez une protection de branche pour la branche `main`
  - Cochez `Require a pull request before merging`
  - Cochez `Do not allow bypassing the above settings`
  - Décochez les autres options
  - Sauvegardez les changements
- Validez que vous ne pouvez plus éditer le fichier `README.md` directement sur la branche `main` (il devrait vous proposer de créer une branche et de faire une demande de fusion)

## Étape 6 - Création d'un ticket

- Retournez sur votre dépôt dans GitHub
- Allez dans le menu `Issues` et cliquez sur `New issue`
- Choisissez `Bug report` comme modèle
- Dans le titre du ticket, ajoutez le texte suivant : `Modification des informations du README.md`
- Dans description, remplissez au mieux les informations demandées :
  - Vous avez minimalement observé que les informations du README.md ne sont pas à jour
  - Le comportement attendu, c'est de trouver vos informations personnelles dans le fichier (Attention, le dépôt est public, vous pouvez mettre de fausses informations)

## Étape 7 - Création d'une branche à partir du ticket

- Ouvrez le ticket
- À droite de la page, cliquez sur `Create branch`, gardez le nom de la branche proposée, modifiez la branche source pour qu'elle soit `develop` et cliquez sur `Create branch`
- Copiez la commande proposée (`git fetch origin` et `git checkout 2-modification-des-informations-du-readmemd`) (Ici mon identifiant d'issue est 2. Notez le votre !)
- Faire les modifications nécessaires dans le fichier `README.md` pour y mettre vos informations personnelles ou des informations génériques
- Validez les modifications (`git add README.md` et `git commit -m "Resolution de #2"`) (Ici mon identifiant d'issue est 2. Changez pour le votre !)
- Pousser les modifications sur le dépôt distant (`git push`)
- À partir de la page de votre ticket, cliquez sur `Pull requests` et cliquez sur `New pull request`
- Choisissez `develop` comme branche de destination et cliquez sur `Create pull request`
- Acceptez la demande de fusion et supprimez la branche
- Allez valider les informations du ticket et allez le fermer
- Créez une requête de tirage pour la branche `develop` vers la branche `main` et acceptez la demande de fusion
