#!/usr/bin/env bash
# Mise à jour du site, à lancer en tant qu'utilisateur « spiro » :
#   bash ~/spiro/deploy/deploy.sh
# Récupère le dernier code, recompile et relance sans coupure.
set -euo pipefail

cd "$(dirname "$0")/.."

if [ ! -f apps/api/.env ]; then
  echo "apps/api/.env manquant : copiez apps/api/.env.example et remplissez-le." >&2
  exit 1
fi

echo "==> Récupération du code"
git pull --ff-only

echo "==> Installation des dépendances"
npm ci

echo "==> Compilation"
npm run build

echo "==> Relance"
pm2 startOrReload deploy/ecosystem.config.cjs --update-env
pm2 save

echo "Déploiement terminé."
