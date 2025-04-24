import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Counter, Rate, Trend } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');
const getPosts = new Trend('get_posts_duration');
const getComments = new Trend('get_comments_duration');
const createPost = new Trend('create_post_duration');

export const options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '1m', target: 10 },
    { duration: '30s', target: 0 }
  ],
  thresholds: {
    'http_req_duration': ['p(95)<500'],
    'errors': ['rate<0.1'],
    'get_posts_duration': ['p(95)<400'],
    'get_comments_duration': ['p(95)<450'],
    'create_post_duration': ['p(95)<600']
  }
};

export default function() {
  const baseUrl = 'https://jsonplaceholder.typicode.com';
  
  group('Get all posts', function() {
    const start = new Date();
    const response = http.get(`${baseUrl}/posts`);
    getPosts.add(new Date() - start);
    
    const success = check(response, {
      'status is 200': (r) => r.status === 200,
      'response has posts': (r) => JSON.parse(r.body).length > 0
    });
    
    if (!success) {
      errorRate.add(1);
    }
  });
  
  sleep(1);
  
  group('Get comments for a post', function() {
    // Get comments for a random post (1-100)
    const postId = Math.floor(Math.random() * 100) + 1;
    const start = new Date();
    const response = http.get(`${baseUrl}/posts/${postId}/comments`);
    getComments.add(new Date() - start);
    
    const success = check(response, {
      'status is 200': (r) => r.status === 200,
      'response has comments': (r) => JSON.parse(r.body).length > 0
    });
    
    if (!success) {
      errorRate.add(1);
    }
  });
  
  sleep(1);
  
  group('Create a new post', function() {
    const payload = JSON.stringify({
      title: 'foo',
      body: 'bar',
      userId: 1
    });
    
    const params = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const start = new Date();
    const response = http.post(`${baseUrl}/posts`, payload, params);
    createPost.add(new Date() - start);
    
    const success = check(response, {
      'status is 201': (r) => r.status === 201,
      'post has id': (r) => JSON.parse(r.body).id !== undefined
    });
    
    if (!success) {
      errorRate.add(1);
    }
  });
  
  sleep(2);
}