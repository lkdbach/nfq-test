module.exports = {
  apps: [
    {
      name: 'NFQ-TEST',
      script: './server.js',
      instances: 1,
      env: {
        PORT: 3001
      }
    }
  ]
};
