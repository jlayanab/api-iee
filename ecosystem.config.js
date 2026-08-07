module.exports = {
  apps: [
    {
      name: 'api-iee',
      script: './build/index.js',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        PORT: 4000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 4000,
        MONGODB_URI: 'mongodb://localhost:27017/ieedb?authSource=admin',
        SECRET: 'ieeproyectos-api-secret-key-change-in-production'
      }
    }
  ]
};
