#!/usr/bin/env bash
# Installation du serveur (Ubuntu 22.04 / 24.04), à lancer UNE fois en root :
#   bash setup.sh
# Installe Node.js 22, PM2, Caddy, un pare-feu et un utilisateur « spiro ».
set -euo pipefail

if [ "$(id -u)" -ne 0 ]; then
  echo "Lancez ce script en root (ou avec sudo)." >&2
  exit 1
fi

echo "==> Mise à jour du système"
apt-get update
apt-get -y upgrade
apt-get install -y curl git ufw ca-certificates gnupg debian-keyring debian-archive-keyring apt-transport-https

echo "==> Mémoire d'échange de 2 Go (la compilation de Next.js en a besoin)"
if [ ! -f /swapfile ]; then
  fallocate -l 2G /swapfile
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

echo "==> Node.js 22"
if ! command -v node >/dev/null || [ "$(node -v | cut -d. -f1)" != "v22" ]; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y nodejs
fi
npm install -g pm2

echo "==> Caddy"
if ! command -v caddy >/dev/null; then
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' > /etc/apt/sources.list.d/caddy-stable.list
  apt-get update
  apt-get install -y caddy
fi
mkdir -p /var/log/caddy
chown caddy:caddy /var/log/caddy

echo "==> Pare-feu : seuls SSH, HTTP et HTTPS sont ouverts"
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

echo "==> Utilisateur « spiro » (fait tourner l'application, sans droits root)"
if ! id spiro >/dev/null 2>&1; then
  adduser --disabled-password --gecos "" spiro
fi

echo
echo "Serveur prêt. Étape suivante : voir deploy/DEPLOIEMENT.md, étape 3."
