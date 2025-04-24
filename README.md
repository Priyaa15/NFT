# NFT-with-K6
# JSONPlaceholder Load Testing Framework

This framework provides a structured approach to perform non-functional load testing against the JSONPlaceholder API.

## Project Structure

```
k6-load-test/
├── config/
│   └── environments.js       # Environment configuration
├── libs/
│   ├── data-generator.js     # Test data generation utilities
│   ├── http-utils.js         # HTTP request helpers
│   └── metrics-service.js    # Custom metrics tracking
├── services/
│   └── api-service.js        # API client for JSONPlaceholder
├── scripts/
│   ├── load-test.js          # Main load test script
│   └── other-test-types.js   # Other test scripts can be added
└── README.md                 # This file
```

## Getting Started

1. Install k6:
   ```bash
   # macOS
   brew install k6
   
   # Windows
   choco install k6
   
   # Ubuntu/Debian
   sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
   echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
   sudo apt-get update
   sudo apt-get install k6
   ```

2. Clone this repository:
   ```bash
   git clone <repository-url>
   cd k6-load-test
   ```

3. Run the load test:
   ```bash
   k6 run scripts/load-test.js
   ```

4. Run with specific environment:
   ```bash
   k6 run -e ENVIRONMENT=staging scripts/load-test.js
   ```

5. Save results to a file:
   ```bash
   k6 run scripts/load-test.js --out json=results.json
   ```

## Test Scenarios

The framework includes several realistic user scenarios:

1. **Browse Posts** - Simulates users browsing posts and comments
2. **View User Profile** - Simulates users viewing profiles and associated posts
3. **Create Content** - Simulates users creating new posts
4. **Mixed Activity** - Simulates users performing a mix of activities

## Custom Metrics

The framework tracks custom metrics to measure:

- Response times for specific API endpoints
- Duration of complete user scenarios
- Success/error rates
- Counts of different request types

## Configuring Tests

To modify the load test parameters:

1. Edit the `options` object in `scripts/load-test.js`:
   - `stages`: Control the number of virtual users and test duration
   - `thresholds`: Define performance SLAs and pass/fail criteria

2. Environment configurations in `config/environments.js`:
   - `baseUrl`: API endpoint
   - `sleepTime`: Think time between requests
   - `tags`: Custom tags for reporting

## Extending the Framework

To add new test scenarios:

1. Create new scenario functions in `scripts/load-test.js`
2. Add new API methods in `services/api-service.js`
3. Add new data generation functions in `libs/data-generator.js`
4. Update thresholds in the `options` object as needed

## Best Practices

- Start with lower load and gradually increase
- Run baseline tests before implementing changes
- Use realistic think times between requests
- Analyze trends over multiple test runs
- Compare results between environments
