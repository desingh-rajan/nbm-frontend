# Kamal Deployment Guide for NBM Frontend

## Prerequisites

1. **Kamal installed** (you already have it! ✅)
2. **Docker Hub account** (or any container registry)
3. **Vultr VPS** with SSH access
4. **Domain name** pointed to your server

## Step 1: Setup Secrets

Create your secrets file:

```bash
mkdir -p .kamal
cp .kamal/secrets.example .kamal/secrets
```

Edit `.kamal/secrets` with your actual credentials:

```bash
nano .kamal/secrets
```

Add your Docker Hub password or access token.

## Step 2: Configure deploy.yml

Edit `config/deploy.yml` and update:

1. **Your server IP**:

   ```yaml
   servers:
     web:
       - YOUR_VULTR_SERVER_IP  # Replace with actual IP
   ```

2. **Your email for SSL**:

   ```yaml
   certificatesResolvers.letsencrypt.acme.email: "your-email@example.com"
   ```

3. **Your Docker Hub username** (if different):

   ```yaml
   registry:
     username: desinghrajan  # Change if needed
   ```

## Step 3: Setup Server

First time setup on your Vultr server:

```bash
# This installs Docker and sets up the server
kamal server bootstrap
```

## Step 4: Initial Deployment

```bash
# Deploy for the first time (builds image and deploys)
kamal setup
```

This will:

- Build your Docker image
- Push to Docker Hub
- Deploy to your server
- Setup Traefik reverse proxy
- Configure SSL certificates

## Step 5: Setup Domain

Add these DNS records for your domain:

```
Type: A
Name: @
Value: YOUR_VULTR_SERVER_IP

Type: A
Name: www
Value: YOUR_VULTR_SERVER_IP
```

Update `config/deploy.yml` to add your domain to Traefik labels:

```yaml
traefik:
  labels:
    traefik.http.routers.nbm-frontend.rule: "Host(`yourdomain.com`) || Host(`www.yourdomain.com`)"
    traefik.http.routers.nbm-frontend.entrypoints: websecure
    traefik.http.routers.nbm-frontend.tls.certresolver: letsencrypt
```

Then redeploy:

```bash
kamal deploy
```

## Common Kamal Commands

### Deploy updates

```bash
kamal deploy
```

### View logs

```bash
kamal app logs -f
```

### Check app status

```bash
kamal app details
```

### Restart app

```bash
kamal app restart
```

### SSH into server

```bash
kamal app exec -i bash
```

### Rollback to previous version

```bash
kamal rollback
```

### View all running containers

```bash
kamal app containers
```

### Stop the app

```bash
kamal app stop
```

### Remove the app completely

```bash
kamal remove
```

### Check Traefik status

```bash
kamal traefik logs
kamal traefik details
```

### Reboot Traefik

```bash
kamal traefik reboot
```

## Environment Variables

To add environment variables, edit `config/deploy.yml`:

```yaml
env:
  clear:
    NODE_ENV: production
    NEXT_PUBLIC_API_URL: https://api.example.com
  secret:
    - SECRET_API_KEY
```

Then add `SECRET_API_KEY=your_key` to `.kamal/secrets`

## Troubleshooting

### View deployment logs

```bash
kamal app logs --since 1h
```

### SSH to server and check Docker

```bash
ssh root@YOUR_SERVER_IP
docker ps
docker logs <container-id>
```

### Rebuild and deploy

```bash
kamal build deliver
```

### Check Traefik routes

```bash
kamal traefik logs | grep nbm-frontend
```

### Container health issues

```bash
kamal app exec "wget -O- http://localhost:3000"
```

## SSL Certificate Issues

If SSL isn't working:

1. Ensure ports 80 and 443 are open:

   ```bash
   ssh root@YOUR_SERVER_IP
   ufw allow 80
   ufw allow 443
   ```

2. Check Traefik logs:

   ```bash
   kamal traefik logs | grep -i acme
   ```

3. Restart Traefik:

   ```bash
   kamal traefik reboot
   ```

## Zero-Downtime Deployments

Kamal automatically does zero-downtime deployments:

1. Builds new image
2. Starts new container
3. Runs healthchecks
4. Switches traffic to new container
5. Stops old container

## CI/CD Integration (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy with Kamal

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: 3.2
      
      - name: Install Kamal
        run: gem install kamal
      
      - name: Deploy
        env:
          KAMAL_REGISTRY_PASSWORD: ${{ secrets.DOCKER_HUB_TOKEN }}
        run: |
          eval "$(ssh-agent -s)"
          ssh-add <(echo "${{ secrets.SSH_PRIVATE_KEY }}")
          kamal deploy
```

## Performance Tips

1. **Enable HTTP/2**:
   Already enabled in Traefik config ✅

2. **Enable compression**:
   Add to Traefik args in `config/deploy.yml`:

   ```yaml
   traefik.http.middlewares.compress.compress: true
   ```

3. **Cache Docker layers**:
   Already configured with builder cache ✅

## Your Site Will Be Live At

After deployment:

- **HTTP**: http://YOUR_DOMAIN (auto-redirects to HTTPS)
- **HTTPS**: https://YOUR_DOMAIN 🔒

---

🚀 **Ready to deploy!** Run: `kamal setup`
