// config/environments.js
export const environments = {
    local: {
      baseUrl: 'http://localhost:3000',
      sleepTime: 1,
      tags: { environment: 'local' }
    },
    dev: {
      baseUrl: 'https://jsonplaceholder.typicode.com',
      sleepTime: 1,
      tags: { environment: 'dev' }
    },
    staging: {
      baseUrl: 'https://jsonplaceholder.typicode.com',
      sleepTime: 0.5,
      tags: { environment: 'staging' }
    },
    prod: {
      baseUrl: 'https://jsonplaceholder.typicode.com',
      sleepTime: 0.3,
      tags: { environment: 'prod' }
    }
  };
  
  export function getEnvironment() {
    // Default to dev if not specified
    const env = __ENV.ENVIRONMENT || 'dev';
    
    if (!environments[env]) {
      throw new Error(`Environment '${env}' is not defined`);
    }
    
    return environments[env];
  }