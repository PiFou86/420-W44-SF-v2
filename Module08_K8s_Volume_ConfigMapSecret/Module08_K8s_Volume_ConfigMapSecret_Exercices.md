# Module 08 - Volume, ConfigMap et Secret

Ce module a pour but de vous faire découvrir les volumes, les ConfigMaps et les Secrets.

Dans ces exercices n'oubliez pas de créer des labels et de bien ranger vos ressources dans des namespaces. Les objets doivent être créés à partir de fichiers YAML (déploiements, pod, services, persistant volume, persistant volume claim, etc.).

Faites attention de bien garder une trace de vos ressources (fichiers YAML, commandes, etc.) afin de pouvoir comparer leurs évolutions au fil des exercices.

## Exercice 1 - Volume

**Attention, sous Windows, vous devez référer le path à partir de `/run/desktop/mnt/host/c/PATH/TO/FILE`** (c:\PATH\TO\FILE)

### Exercice 1.1 - NGINX - On reprends le cours !

- Créez un déploiement nommé "nginx" avec l'image `nginx:1.17.1` et les paramètres suivants :
  - Un volume nommé "nginx-data" de type "hostPath" et montez le dans le répertoire `/usr/share/nginx/html` du conteneur
  - Dans le répertoire du volume, créez un fichier `index.html` dans le répertoire que vous partager à partir de votre hôte.
- Appliquez votre déploiement
- Validez que le fichier est visible dans le répertoire `/usr/share/nginx/html` du conteneur (`kubectl exec -it nginx-xxxxx -- ls /usr/share/nginx/html`)
- Exposez votre déploiement sur le port 80 en service de type NodePort et validez que vous pouvez accéder à votre page web depuis votre hôte
- Supprimez votre déploiement et votre service

### Exercice 1.2 - MySQL

N'oubliez jamais : quand vous déployez une base de données, vous devez toujours vous poser la question de la persistance de données. Est-ce que votre client veut que les données persistent d'une déploiement à l'autre ?

- Créez un déploiement nommé "mysql" avec l'image `mysql:5.7` et les paramètres suivants :
  - Variables d'environnement (voir [https://hub.docker.com/_/mysql](https://hub.docker.com/_/mysql) pour plus d'informations) :
    - `MYSQL_ROOT_PASSWORD` : `Passw0rdRoot`
    - `MYSQL_DATABASE` : `maBD`
    - `MYSQL_USER` : `monUtilisateur`
    - `MYSQL_PASSWORD` : `Passw0rd`
  - Un volume nommé "mysql-data" de type "hostPath" et montez le dans le répertoire `/var/lib/mysql` du conteneur
- Appliquez votre déploiement
- Exposez le déploiement en service de type NodePort et validez que vous pouvez vous connecter à votre base de données depuis votre hôte

## Exercice 2 - ConfigMap et Secret

### Exercice 2.1 - NGINX

- Créez un fichier de déploiement pour un objet de type "ConfigMap" nommé "nginx-config" avec les paramètres suivants :
  - Nom de la clé : `index.html`
  - Valeur de la clé : `Hello World !`
- Modifiez votre déploiement "nginx" de l'exercice précédent pour utiliser le fichier de configuration que vous venez de créer (i.e. il n'utilise plus le fichier `index.html` que vous avez créé dans le répertoire du volume)
- Appliquez vos déploiements
- Validez que le fichier est visible dans le répertoire `/usr/share/nginx/html` du conteneur
- Exposez votre déploiement sur le port 80 en service de type NodePort et validez que vous pouvez accéder à votre page web depuis votre hôte
- Supprimez les ressources

### Exercice 2.2 - MySQL

- Créez un fichier de déploiement pour un objet de type "Secret" nommé "mysql-secret-config" avec les paramètres suivants :
  - `ROOT_PASSWORD` : `Passw0rdRoot`
  - `DATABASE` : `maBD`
  - `USER` : `monUtilisateur`
  - `PASSWORD` : `Passw0rd`
- Copiez et modifiez votre déploiement "mysql" de l'exercice précédent pour utiliser le fichier de secret que vous venez de créer. Ce fichier ne doit plus contenir les secrets en clair.
- Appliquez vos déploiements
- Validez que tout fonctionne toujours

## Exercice 3 - Retour aux sources - Créez un projet ASP.NET Core MVC

- Créez un projet C# de type `MVC` avec authentification de type `Individual User Accounts`
- Créez une image Docker de votre projet
- Créez un/des fichier(s) de déploiement Kubernetes pour votre base de données de type SQL Server :
  - Configurez un mot de passe pour l'utilisateur `sa`
  - Configurez un service pour votre base de données
- Créez un/des fichier(s) de déploiement Kubernetes pour votre projet :
  - L'URL d'exposition doit être personnalisée (i.e. port 12345) et passée par variable d'environnement
  - La chaînes de connexion à la base de données doit être passée par variable d'environnement
  - Exposez votre site web sur le port 80 en service de type NodePort
