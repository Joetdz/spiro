// PM2 : garde le site et l'API en marche, les relance en cas d'arrêt
// et au redémarrage du serveur (après `pm2 startup` puis `pm2 save`).
module.exports = {
  apps: [
    {
      name: 'spiro-api',
      cwd: `${__dirname}/../apps/api`,
      script: 'dist/main.js',
      // Les secrets restent dans apps/api/.env, créé à la main sur le serveur.
      env: { NODE_ENV: 'production', HOST: '127.0.0.1', PORT: '4000' },
      max_memory_restart: '400M',
    },
    {
      name: 'spiro-web',
      cwd: `${__dirname}/../apps/web`,
      script: '../../node_modules/next/dist/bin/next',
      args: 'start --port 3001 --hostname 127.0.0.1',
      env: { NODE_ENV: 'production', API_URL: 'http://127.0.0.1:4000' },
      max_memory_restart: '600M',
    },
  ],
};
