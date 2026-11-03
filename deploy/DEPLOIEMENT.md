# Déploiement sur un VPS avec Caddy

Le site (Next.js, port 3001) et l'API (NestJS, port 4000) tournent sur le VPS
sous **PM2**. **Caddy** est devant : il reçoit les visiteurs, gère le HTTPS
automatiquement et transmet `/api/*` à l'API et le reste au site.
Les ports 3001 et 4000 ne sont pas joignables de l'extérieur.

```
Visiteur ──HTTPS──> Caddy (80/443) ──> /api/*  ──> API NestJS (127.0.0.1:4000) ──> Neon
                                   └─> le reste ──> Site Next  (127.0.0.1:3001)
```

Prérequis : un VPS Ubuntu 22.04 ou 24.04 (2 Go de RAM conseillés) et, pour le
HTTPS, un nom de domaine.

## 1. Faire pointer le domaine vers le VPS

Chez le fournisseur du domaine, créez deux enregistrements DNS de type **A** :

| Nom | Valeur |
| --- | --- |
| `@` (ou `spiro.example.com`) | adresse IP du VPS |
| `www` | adresse IP du VPS |

La propagation prend de quelques minutes à quelques heures.

## 2. Installer le serveur (une seule fois)

Depuis votre PC :

```bash
ssh root@IP_DU_VPS
```

Puis sur le VPS :

```bash
curl -fsSL https://raw.githubusercontent.com/Joetdz/spiro/main/deploy/setup.sh -o setup.sh
bash setup.sh
```

> Si le dépôt GitHub est privé, ce lien ne marche pas : copiez le script depuis
> votre PC avec `scp deploy/setup.sh root@IP_DU_VPS:` puis lancez `bash setup.sh`.

## 3. Récupérer le code

Passez sur l'utilisateur `spiro` :

```bash
su - spiro
```

**Dépôt public :**

```bash
git clone https://github.com/Joetdz/spiro.git
```

**Dépôt privé :** créez une clé de déploiement (lecture seule) :

```bash
ssh-keygen -t ed25519 -N "" -f ~/.ssh/id_ed25519
cat ~/.ssh/id_ed25519.pub
```

Sur GitHub : dépôt → **Settings → Deploy keys → Add deploy key**, collez la clé
(sans cocher « Allow write access »). Puis :

```bash
git clone git@github.com:Joetdz/spiro.git
```

## 4. Créer le fichier de secrets de l'API

```bash
cp ~/spiro/apps/api/.env.example ~/spiro/apps/api/.env
nano ~/spiro/apps/api/.env
```

Remplissez :

```
DATABASE_URL=postgresql://...      # l'adresse Neon (avec le NOUVEAU mot de passe)
ADMIN_KEY=une-longue-valeur-secrete
CORS_ORIGIN=https://spiro.example.com
```

Pour générer une `ADMIN_KEY` : `openssl rand -hex 32`.
Ce fichier ne doit jamais être envoyé sur GitHub (il est déjà ignoré).

## 5. Compiler et lancer

```bash
bash ~/spiro/deploy/deploy.sh
pm2 status
```

`spiro-api` et `spiro-web` doivent être « online ». Vérification :

```bash
curl http://127.0.0.1:4000/api/health
curl -I http://127.0.0.1:3001
```

Relance automatique au redémarrage du VPS : lancez `pm2 startup`, copiez la
commande `sudo ...` qu'il affiche, et exécutez-la **en root** (`exit` pour
quitter l'utilisateur spiro).

## 6. Configurer Caddy

En root :

```bash
cp /home/spiro/spiro/deploy/Caddyfile /etc/caddy/Caddyfile
nano /etc/caddy/Caddyfile        # remplacez spiro.example.com par votre domaine (3 fois)
caddy validate --config /etc/caddy/Caddyfile
systemctl reload caddy
```

Ouvrez `https://votre-domaine` : Caddy obtient le certificat HTTPS tout seul à
la première visite (le DNS de l'étape 1 doit être propagé).

**Sans domaine** pour l'instant : remplacez tout le contenu du Caddyfile par
le bloc ci-dessous, puis ouvrez `http://IP_DU_VPS` (pas de HTTPS sans domaine).

```
:80 {
	encode zstd gzip
	handle /api/* {
		reverse_proxy 127.0.0.1:4000
	}
	handle {
		reverse_proxy 127.0.0.1:3001
	}
}
```

## Mettre à jour le site

Après chaque `git push` depuis votre PC :

```bash
ssh spiro@IP_DU_VPS      # ou ssh root@... puis su - spiro
bash ~/spiro/deploy/deploy.sh
```

## Commandes utiles

| Besoin | Commande |
| --- | --- |
| État des services | `pm2 status` |
| Journaux de l'API / du site | `pm2 logs spiro-api` / `pm2 logs spiro-web` |
| Redémarrer | `pm2 restart all` |
| Journaux de Caddy | `journalctl -u caddy -f` |
| Recharger Caddy après modification | `systemctl reload caddy` |

## Sécurité

- Changez le mot de passe Neon (il a circulé dans un fichier texte) et mettez la
  nouvelle adresse uniquement dans `apps/api/.env` sur le serveur.
- Utilisez une connexion SSH par clé plutôt que par mot de passe.
- Le site contient des données d'exemple : tant que Spiro n'a pas validé,
  ne communiquez pas l'adresse publiquement.
