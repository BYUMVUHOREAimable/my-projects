# DevOps Express App

This is a simple DevOps project that demonstrates how to:

- Build a Node.js web server using Express
- Containerize the application using Docker
- Configure NGINX as a reverse proxy
- Define services using Docker Compose
- Deploy using Kubernetes

---

## 🚀 Features

- **Express.js Server** responds with `Hello, DevOps!` at the root endpoint.
- **Dockerized Application** for isolated deployment.
- **NGINX Reverse Proxy** routing traffic to the backend app.
- **Docker Compose** for multi-container orchestration.
- **Kubernetes Deployment YAML** for cloud-native deployment.

---

## 📁 Project Structure

devops-app/
├── app.js # Express server
├── package.json # Node.js project config
├── Dockerfile # Docker build instructions
├── docker-compose.yml # Compose for app + NGINX
├── k8s-deployment.yaml # Kubernetes deployment spec
└── nginx/
└── nginx.conf # NGINX reverse proxy config

## 🛠️ Setup & Usage

### 1. Clone the Repository

```bash
git clone https://github.com/BYUMVUHOREAimable/BYUMVUHORE_Aimable.git
cd BYUMVUHORE_Aimable
```
## 🐳 2. Run with Docker Compose

```bash
docker-compose up --build
Then open your browser or use:
```
```bash
curl http://localhost
```
✅ Expected output:

Hello, DevOps!
## 🧪 3. Test and Show Evidence
To prove your setup works, do the following:

## ✅ Test Through NGINX
Open a browser or terminal: http://localhost or curl http://localhost

Output: Hello, DevOps!

## ✅ Check Running Containers
```bash
docker ps
This show: containers express-app and nginx-proxy running.
```
## ✅ Check Image on Docker Hub
```bash
Visit: https://hub.docker.com/repository/docker/byumvuhoreaimable/devops-app
```
Screenshot showing the image exists.

## 📦 4. Docker Build & Push

```bash
docker build -t byumvuhoreaimable/devops-app:latest .
docker push byumvuhoreaimable/devops-app:latest
```
## ☸️ 5. Kubernetes Deployment
```bash
kubectl apply -f k8s-deployment.yaml
```
Verify:
``` bash
kubectl get deployments
kubectl get services
```
Expected:
Deployment express-app is running
Service express-service is exposed

## 👤 Maintainer
BYUMVUHORE Aimable
Invited: mwizstar@gmail.com as Maintainer

## 📜 License
This project is for educational purposes under the MIT License.