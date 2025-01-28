# Module 09 - Azure Kubernetes Service (AKS)

Attention, la création d'un cluster AKS est payante. Il faut que vous supprimiez vos ressources une fois l'exercice ou le cours terminé pour éviter de payer trop cher.

## Exercice 1 - Introduction à AKS

### Création d'un cluster AKS

Pour créer votre premier cluster AKS, vous pouvez passer par le portail Azure.

- Créez une nouvelle ressource de type `Azure Kubernetes Service (AKS)` :
  - Abonnement : choisissez votre abonnement
  - Groupe de ressources : créez `M09_AKS_RG`
  - Configuration pré-définie du cluster : choisissez `Dev/Test`
  - Nom du cluster Kubernetes : Donnez le nom `M09_AKS_Cluster`
  - Région : choisissez `Canada Central`
  - Zone de disponibilité : choisissez `Aucune`
  - Version de Kubernetes : choisissez `1.30.7` (ou celle par défaut si vous ne trouvez pas la version demandée)
  - AKS pricing tier : choisissez `Free`
  - Automatic upgrade : choisissez `Disabled`
- Les trois options suivantes se trouveront dans votre `Node Pool` par défaut : 
  - Taille de noeud : choisissez `DS2_v2` !! N'oubliez pas de supprimer vos ressources lorsque vous avez fini pour éviter des coûts !!
  - Méthode de mise à l'échelle : choisissez `Manuelle`
  - Nombre de noeuds : choisissez `1`
  - Dans l'onglet `Pools de noeuds`, validez que la somme des nombres de noeuds est égale à `1`
  - Dans l'onglet `Mise en réseau`, choisissez `Kubernetes`
  - Cochez la case `Activer le routage d'application HTTP`
- Validez la création du cluster AKS
- Deux groupes de ressources devraient apparaitre :
  - `M09_AKS_RG` : contient le cluster AKS
  - `MC_M09_AKS_RG_M09_AKS_Cluster_canadacentral` : contient les ressources du cluster AKS

### Première connexion au cluster AKS

- Lancez un terminal
- Utilisez l'utilitaire `az` pour vous connecter au cluster AKS
- Récupérez les informations de connexion au cluster AKS : `az aks get-credentials --resource-group M09_AKS_RG --name M09_AKS_Cluster`
  - Si vous avez une erreur de lecture du fichier de configuration, éditez le fichier `~/.kube/config` et validez que les nombres sont bien entre guillemets
- Validez que le tout fonctionne en listant les noeuds du cluster ainsi que les pods en cours d'exécution

## Exercice 2 - Déploiement d'une application sur AKS

### Création du namespace `env1`

- Créez un namespace `env1` dans le cluster AKS
- Modifiez le namespace par défaut pour utiliser `env1` par défaut avec la commande `kubectl config set-context --current --namespace=env1`
- Validez que ce namespace est bien utilisé par défaut avec la commande `kubectl config view`

### Création du PVC de type Azure Files

- Créez un PVC de type Azure Files dans le namespace `env1` avec la commande `kubectl apply -f azure-files-pvc-nginx.yaml`
- Le fichier `azure-files-pvc-nginx.yaml` contient le contenu suivant :

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: azure-files-pvc-nginx
spec:
  accessModes:
  - ReadWriteMany
  resources:
    requests:
      storage: 1Gi
  storageClassName: azurefile
```

- Un compte de stockage Azure Files est automatiquement créé par AKS. Vous pouvez le voir dans le portail Azure dans le groupe de ressources `MC_M09_AKS_RG_M09_AKS_Cluster_canadacentral`
- Créez un fichier index.html contenant "Bienvenue dans l'env1"
- Téléversez le fichier index.html dans le compte de stockage Azure Files (Stockage des données > partage de fichiers > <votre pvc> > Browse ) : le nom peut être obtenu en listant le PVC

### Déploiement d'un serveur web

- Déployez un serveur web dans le namespace `env1` avec la commande :

```YAML
apiVersion: apps/v1
kind: Deployment
metadata:
  name: webserver
spec:
  replicas: 1
  selector:
    matchLabels:
      app: webserver
  template:
    metadata:
      labels:
        app: webserver
    spec:
      containers:
      - name: webserver
        image: nginx
        ports:
        - containerPort: 80
        volumeMounts:
        - name: azure-files-pvc-nginx
          mountPath: /usr/share/nginx/html
      volumes:
      - name: azure-files-pvc-nginx
        persistentVolumeClaim:
          claimName: azure-files-pvc-nginx
```

- Créez un service de type `ClusterIP` pour exposer le serveur web

```yaml
apiVersion: v1
kind: Service
metadata:
  name: webserver
spec:
  selector:
    app: webserver
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
  type: ClusterIP
```

- Exposez le serveur web avec la définition d'un ingress
  - Créez un fichier `ingress.yaml` avec le contenu suivant :

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: webserver
  annotations:
    kubernetes.io/ingress.class: addon-http-application-routing
spec:
  rules:
  - host: webserver-env1.<Votre_Zone_DNS>
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: webserver
            port:
                number: 80
```

- Remplacez `<Votre_Zone_DNS>` par la zone DNS de votre ressource `MC_M09_AKS_RG_M09_AKS_Cluster_canadacentral`
- Appliquez la définition de l'ingress avec la commande

Pour débugger votre ingress, vous pouvez utiliser la commande `kubectl describe ingress webserver` ou la commande `kubectl logs -f deploy/addon-http-application-routing-nginx-ingress-controller -n kube-system`

- Validez que le serveur web est bien accessible depuis l'extérieur du cluster AKS : la création de l'ingress peut prendre quelques minutes. Vous pouvez validez que l'enregistrement DNS est bien créé dans la zone DNS de votre ressource `MC_M09_AKS_RG_M09_AKS_Cluster_canadacentral`

## Exercice 3 - Création des environnements `env2` et `env3`

Effectuez les étapes précédentes pour créer les environnements `env2` et `env3` sur le même cluster AKS.

## Exercice 4 - Nettoyage

Supprimez les ressources créées dans le portail Azure.
