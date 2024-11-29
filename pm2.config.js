module.exports = {
  apps: [
    {
      name: 'pims-nextjs',
      exec_mode: 'cluster',
      watch: ['build'],
      // Delay between restart
      watch_delay: 1000,
      ignore_watch: ['node_modules', '\\.git', '*.log'],
      instances: 1, // Or a number of instances
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      env_local: {
        APP_ENV: 'local', // APP_ENV=local
      },
      env_dev: {
        APP_ENV: 'dev', // APP_ENV=dev
      },
      env_prod: {
        APP_ENV: 'prod', // APP_ENV=prod
        PORT: 5000,
      },
    },
  ],
}
