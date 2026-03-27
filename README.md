# 🚀 Local Kubernetes DevOps Lab (k3d + Node.js)

## 📌 Overview

This project demonstrates a **complete local Kubernetes setup** using **k3d**, where a Node.js application is containerized, deployed, exposed via Ingress, and managed using real DevOps practices.

The goal was to simulate a **production-like environment (similar to AWS ECS/EKS)** on a local machine.

---

## 🧱 Architecture

```
Browser → Ingress → Service → Pods → Node.js App
```

---

## 🛠 Tech Stack

* Docker
* Kubernetes (k3d)
* Node.js (Express)
* NGINX Ingress Controller
* kubectl

---

## ⚙️ Setup Steps

### 1️⃣ Install Dependencies

```bash
# Docker
sudo apt install docker.io -y

# kubectl
sudo snap install kubectl --classic

# k3d
curl -s https://raw.githubusercontent.com/k3d-io/k3d/main/install.sh | bash
```

---

### 2️⃣ Create Kubernetes Cluster

```bash
k3d cluster create mycluster -p "8080:80@loadbalancer"
```

---

### 3️⃣ Deploy Sample App (Initial)

```bash
kubectl create deployment myapp --image=nginx
kubectl expose deployment myapp --type=NodePort --port=80
```

---

### 4️⃣ Setup Ingress (ALB Equivalent)

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/cloud/deploy.yaml
```

Create ingress rule:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp-ingress
spec:
  rules:
  - host: myapp.local
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: myapp
            port:
              number: 80
```

Update hosts:

```
127.0.0.1 myapp.local
```

---

## 🐳 Node.js Application Deployment

### Build Docker Image

```bash
docker build --no-cache -t node-k8s-app:v1 .
```

### Import Image into k3d

```bash
k3d image import node-k8s-app:v1 -c mycluster
```

### Deploy to Kubernetes

```bash
kubectl apply -f node-deployment.yaml
```

---

## 🔥 Key Learnings & Challenges

### 1️⃣ NodePort vs Ingress

* NodePort not directly accessible in k3d
* Used `port-forward` initially
* Later switched to **Ingress (production-like approach)**

---

### 2️⃣ ImagePullBackOff Issue

**Problem:**

```
Failed to pull image "node-k8s-app"
```

**Cause:**

* Kubernetes tried to pull from Docker Hub

**Fix:**

```bash
k3d image import node-k8s-app -c mycluster
```

---

### 3️⃣ Service ↔ Pod Mismatch

**Problem:**

* Ingress returned **Bad Gateway**

**Cause:**

* Service selector didn't match pod labels

**Fix:**

```bash
kubectl patch svc myapp -p '{"spec":{"selector":{"app":"node-app"}}}'
```

---

### 4️⃣ CrashLoopBackOff Debugging

**Problem:**

* Pods crashing repeatedly

**Root Cause:**

* Syntax error in Node.js (`\${PORT}`)

**Fix:**

```js
console.log(`Server running at http://localhost:${PORT}`);
```

---

### 5️⃣ Docker Cache Issues

**Problem:**

* Code changes not reflected

**Fix:**

```bash
docker build --no-cache -t node-k8s-app:vX .
```

---

### 6️⃣ Image Tagging Best Practice

❌ Avoid:

```
latest
v1 reused
```

✅ Use:

```
v1, v2, v3...
```

---

### 7️⃣ Rolling Deployments

```bash
kubectl set image deployment/node-app node-app=node-k8s-app:v2
```

**Behavior:**

* Zero downtime deployment
* Old pods remain until new pods are healthy

---

### 8️⃣ Rollout Debugging

```bash
kubectl rollout status deployment/node-app
kubectl rollout undo deployment/node-app
```

---

### 9️⃣ Logs & Debugging

```bash
kubectl logs <pod>
kubectl describe pod <pod>
```

---

## 🧠 DevOps Concepts Covered

* Containerization (Docker)
* Kubernetes Deployments
* Services & Networking
* Ingress (ALB equivalent)
* Rolling Updates
* Debugging production issues
* Image management
* Zero downtime deployments

---

## 🔄 DevOps Mapping (AWS Equivalent)

| Kubernetes | AWS Equivalent      |
| ---------- | ------------------- |
| Pod        | Container (Fargate) |
| Deployment | ECS Service         |
| Service    | Service Discovery   |
| Ingress    | ALB                 |
| Image      | ECR                 |

---

## 🚀 Future Improvements

* CI/CD Pipeline (GitHub Actions)
* Monitoring (Prometheus + Grafana)
* Auto-scaling (HPA)
* Authentication (JWT / Cognito)
* Rate Limiting (API Gateway style)

---

## 🎯 Conclusion

This project simulates a **real-world DevOps workflow**:

* Build → Containerize → Deploy → Expose → Debug → Scale

It provides hands-on experience with **cloud-native architecture locally**, preparing for real production environments.

---

## 👨‍💻 Author

**Shrikant Sherkar**

---
