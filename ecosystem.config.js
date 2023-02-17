module.exports = {
  apps : [{
    script: 'index.js',
    watch: '.'
  }, {
    script: './service-worker/',
    watch: ['./service-worker']
  }],

  deploy : {
    production : {
      key: 'exposure-frontend-production.pem',
      user : 'ubuntu',
      host : '3.144.76.54',
      ref  : 'origin/main',
      repo : 'git@github.com:konstantinstanmeyer/exposure-frontend-ts.git',
      path : '/home/ubuntu',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh_options': 'ForwardAgent=yes'
    }
  }
};
