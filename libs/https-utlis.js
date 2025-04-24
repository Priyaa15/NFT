// libs/http-utils.js
import http from 'k6/http';
import { check } from 'k6';
import { Rate } from 'k6/metrics';

export const errorRate = new Rate('error_rate');

export function makeRequest(method, url, payload = null, params = {}) {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  params.headers = { ...defaultHeaders, ...params.headers };
  
  let response;
  
  switch (method.toLowerCase()) {
    case 'get':
      response = http.get(url, params);
      break;
    case 'post':
      response = http.post(url, payload, params);
      break;
    case 'put':
      response = http.put(url, payload, params);
      break;
    case 'patch':
      response = http.patch(url, payload, params);
      break;
    case 'delete':
      response = http.del(url, params);
      break;
    default:
      throw new Error(`Unsupported HTTP method: ${method}`);
  }
  
  return response;
}

export function checkResponse(response, expectedStatus = 200) {
  const success = check(response, {
    [`status is ${expectedStatus}`]: (r) => r.status === expectedStatus,
    'response body is not empty': (r) => r.body.length > 0,
    'response time is acceptable': (r) => r.timings.duration < 2000
  });
  
  if (!success) {
    errorRate.add(1);
    console.error(`Request failed: ${response.url}, status: ${response.status}, duration: ${response.timings.duration}ms`);
  }
  
  return success;
}