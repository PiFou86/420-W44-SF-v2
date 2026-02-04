# Module 07 - Kubernetes - Manifest et Services

Dans les exercices qui le permettent, assurez-vous de toujours indiquer un espace de nom qui correspond à votre numéro de matricule. Pour vous aider, ne sautez pas l'exercice 2.

## Exercice 1 - Modification du contexte

Dans cet exercice, vous allez apprendre à créer un contexte afin de simplifier vos lignes de commande ou, pour les prochains modules, viser un autre serveur Kubernetes.

!!! Si vous êtes sous Windows, ne passez pas par le Ubuntu de Windows mais par powershell !!!

- Faites une copie de sauvegarde de votre fichier `.kube/config` (le dossier caché .kube devrait se trouver dans voter dossier utilisateur)
- Créez vous un contexte avec la commande `kubectl config set-context` (allez chercher comment spécifier des paramètres), spécifiez un nom de namespace qui correspond à votre numéro de matricule. Vous pouvez aller chercher le cluster local et l'utilisateur dans votre configuration courante (allez chercher la commande pour voir votre configuration courante)
- Définissez votre nouveau context comme étant le contexte courant (use-context, voir démonstration)
- Affichez les noeuds et les pods du cluster (tous les namespaces) et de votre namespace pour valider que tout fonctionne
- Créez un fichier manifeste afin de créer votre espace de noms et appliques le. Attention, étant donné que vous utilisez votre numéro de matricule comme nom, il faut le mettre entre guillemets sinon YAML va le prendre pour un entier et non une chaîne de caractères.
- Validez que l'espace de noms existe bien

## Exercice 2 - Créez plusieurs déploiements - Sélection

Dans cet exercice, nous allons créer des déploiements quelconques dont nous allons nous servir afin de tester les requêtes sur les labels (i.e. l'image et la fonctionnalité n'a pas d'importance ici !).

- Créez plusieurs déploiements avec les caractéristiques suivantes (un replica) :
  - dep1.yaml :
    - image : `nginxdemos/hello`
    - replica : 1
    - labels :
      - tier : frontend
      - env : unit
  - dep2.yaml :
    - image : `nginxdemos/hello`
    - replica : 1
    - labels :
      - tier : backend
      - env : unit
  - dep3.yaml :
    - image : `nginxdemos/hello`
    - replica : 1
    - labels :
      - tier : frontend
      - env : fonc
  - dep4.yaml :
    - image : `nginxdemos/hello`
    - replica : 1
    - labels :
      - tier : backend
      - env : fonc
  - dep5.yaml :
    - image : `nginxdemos/hello`
    - replica : 1
    - labels :
      - tier : frontend
      - env : accept
  - dep6.yaml :
    - image : `nginxdemos/hello`
    - replica : 1
    - labels :
      - tier : backend
      - env : accept
  - Faites des requêtes à partir de kubectl afin d'afficher :
    - tous les pods du tier backend appartenant à l'environnement fonc
    - tous les pods du tier frontend appartenant n'appartenant pas à l'environnement fonc
    - tous les pods du tier backend appartenant aux environnements (fonc, unit)
    - tous les pods du tier backend
    - tous les pods de l'environnement unit
- Supprimez tous vos déploiements

## Exercice 3 - Replica

- Créez un déploiement avec les caractéristiques suivantes :
  - rep1.yaml :
    - replica : 1
    - image : nginxdemos/hello
    - labels :
      - tier : frontend
      - env : unit
- Affichez les pods, vous devriez voir un seul replica de votre pod
- Rentrez en mode intéractif dans un nouveau pod qui vous permet de faire des lignes de commandes comme l'image busybox.
- Avec wget / curl, affichez la page web de votre précédent déploiement avec l'adresse IP du pod
- À partir d'une autre fenêtre de commande, supprimez le pod (pas le déploiement !) qui contient votre nginx-demos/hello.
- Listez les pods et regardez ce qui se passe
- À partir de la précédente fenêtre faites de nouveau des requêtes au service web. Que s'est-il passé ? (une différence dans l'adresse IP ?)
- Faites une mise à l'échelle (scale) pour passer d'un replica à 10.
- Affichez les pods avec une vue enrichie (wide)
- Dans le pod qui contient votre shell, essayez différentes adresses
- Amusez vous à supprimer des pods pour voir ce qui se passe
- **Ne supprimez pas le déploiement, nous allons l'utiliser dans l'exercice suivant**

## Exercice 4 - Service

Dans cet exercice, nous allons créer un service qui va nous permettre d'accéder à nos replicas.

- Créez le déploiement d'un service qui vous permet d'accéder à vos 10 replica :
  - service :
    - nom : mon-site
    - port : 80
    - ne spécifiez pas de port pour le node et ne créez donc pas de propriété nodePort
    - type : nodePort
    - matchLabels : voir exercice précédent
- À partir d'un pod qui a un shell, essayez la commande suivante (au passage, observez le nom du service et du site) :

```bash
watch -n 1 wget -qO - mon-site | grep -o -E '[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+'
```

- Cherchez le port d'exposition sur le noeud en affichant la liste des services
- À partir de votre VM, naviguez l'adresse IP suivie du port
- Supprimez le déploiement et le service

## Exercice 5 - Livre d'or

- Suivez les instructions du site https://kubernetes.io/docs/tutorials/stateless-application/guestbook/ afin de créer un livre d'or avec un site PHP et le serveur de cache redis
