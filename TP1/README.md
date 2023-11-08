# Travail pratique 1 - Intégration continue

## Informations

- Remise du travail: 21 novembre 2023, 23:59
- Ce travail est réalisé en équipe de 2 personnes et seuls les membres de cette équipe y contribuent
- Toutes les réponses fournies doivent être originales (produites par l’étudiant ou un membre de l’équipe)
- Toute copie de code, de portion de code, d’algorithme ou de texte doit faire mention de sa source
- L’emprunt ou la copie de code ou de portions de code est interdite
- Tout constat de plagiat, tricherie ou fraude sera automatiquement déclaré à la Direction et les sanctions prévues seront appliquées
- Durée : 3 x 3 heures + travail à la maison
- Plate forme : Azure DevOps, Visual Studio Code et dotnet/react
- Pas d'utilisation de Visual Studio (vous êtes des DevOps et l'entreprise ne paie pas de licence pour cela) : vous devez tout faire en ligne de commande
- Le nouveau projet Web à créer doit avoir les références vers les projets nécessaires à sa création pour la gestion de clients (références de projets)

## Objectifs

- Montrer que vous avez compris l'utilisation de branches, des pull-requests
- Montrer que vous avez compris le principe d'intégration continue et son intégration dans le cycle DevOps
- Créer deux pipelines d'intégration continue dans Azure, un en mode classic et l'autre en YAML
- Être capable d'expliquer la partie théorique et technique

## Remise

- Vidéo sur YouTube (non listée - 15 mins maximum) (35 points):
  - Création d'un bug avec la création d'une branche et d'une pull-request pour le résoudre (10 points)
  - Démonstration des étapes à réaliser localement pour créer et tester les artefacts (5 points)
  - Explication et démonstration des pipelines (15 points)
  - Démonstration du fonctionnement des artefacts  (5 points)
- Copies d'écran (pipeline classic) (15 points) :
  - Liste des tâches
  - Paramètres de chaque tâche
  - Variables et paramètres
  - L'ordre logique des images est indiqué par le tri des noms de fichier par ordre lexicographique ou les copies d'écran sont dans un fichier Word ou PDF
- Fichier YAML (pipeline YAML) (15 points)
- Liste des commandes de compilation, ajout de projets / package NuGet (10 points)
- Répartition des tâches entre partenaires avec nombre d'heures (5 points)
- Ajoutez `pfleon@csfoy.ca` comme utilisateur et administrateur avec une licence de type Basic (Le faire au niveau de l'organisation) (-10 points si je dois courir après vous)
- Répondre aux questions suivantes (15 points):
  - Quelles sont les technologies utilisées (Langages, versions de bibliothèques, versions de logiciels, services utilisées) ?
  - En quoi l'utilisation des outils tels qu'Azure DevOps permet d'améliorer la traçabilité ? (Ne pas oublier de décrire ce qu'est la traçabilité)
  - Quels types d'actions peut-on et devrait-on trouver dans un flux de travail d'intégration continue ?
- Écrivez un manuel d'utilisation de votre pipeline d'intégration continue (5 points)
- Fichier `AUTHORS.md` : (Jusqu'à -10 points pour non respect des consignes)
  - Lien YouTube
  - Lien du projet sur Azure DevOps
  - Vos informations (prénom / nom / matricule)
  - Le fichier doit être remis dans l'archive zip sur Léa

En résumé, ce qui est noté est ce qui est dans l'archive zip sur Léa à l'exception de la vidéo sur YouTube dont je dois trouver le lien dans le fichier `AUTHORS.md`.

## Projet

Le projet est un vieux projet développé en dotnet 3.1. Il se trouve dans le répertoire ```src``` du présent répertoire. Vous pouvez le passer en version plus récente pour les besoins de ce travail pratique.

## Étape 1 - Gestion de source et intégration continue

Vous devez mettre le projet sous contrôle de source et mettre en place des pipelines d'intégration continue afin d'améliorer la traçabilité et la qualité logicielle.

- Vous devez créer un nouveau projet d'équipe et y ajouter le code du projet dans le dépôt par défaut dans la branche "main" (n'oubliez pas le .gitignore !)
- Vous devez créer une branche "develop"
- Vous devez créer un pipeline classic d'intégration continue qui construit 3 artefacts (donc 3 "Azure publish" et non 1 comme dans les exercices) : un pour l'interface utilisateur (GC.ConsoleUI) et un par traitement lot (GC.Batch.ModifierNomPrenomPremiereLettreMajuscules et GC.Batch.ModifierPaysMajusculesClients)
- Reproduire une nouvelle version de ce pipeline avec des fichiers de description YAML
- Les pipelines doivent se déclencher automatiquement à chaque modification des branches "main" et "develop"

## Étape 2 - Préparation d'un projet web

Une nouvelle équipe de développeur va être prochainement créée afin de moderniser l'interface utilisateur actuelle du projet : elle va réaliser une application web avec les technologies ASP.Net MVC et React. L'application sera proposée en mode authentifiée grâce à une authentification individuelle.

Vous devez donc :

- Créer une branche pour ajouter le nouveau projet web (Créé à partir de l'utilitaire dotnet en ligne de commandes - mettre les lignes utilisées dans la documentation)
- Faire une pull-request pour l'intégrer dans la branche la plus logique
- Modifier les pipelines afin d'ajouter un artefact pour l'application Web
- Tester vos pipelines, ainsi que les artefacts de sortie

Tout partage de code, d'explication, de bouts de texte, etc. est considéré comme du plagiat. Pour plus de détails, consultez le site (et ses vidéos) [Sois intègre du Cégep de Sainte-Foy](http://csfoy.ca/soisintegre) ainsi que [l'article 6.1.12 de la PÉA](https://www.csfoy.ca/fileadmin/documents/notre_cegep/politiques_et_reglements/5.9_PolitiqueEvaluationApprentissages_2019.pdf)
