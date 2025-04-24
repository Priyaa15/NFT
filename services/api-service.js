// services/api-service.js
import { makeRequest, checkResponse } from '../libs/http-utils.js';
import { sleep } from 'k6';
import MetricsService from '../libs/metrics-service.js';

export default class JsonPlaceholderService {
  constructor(baseUrl, sleepTime = 1) {
    this.baseUrl = baseUrl;
    this.sleepTime = sleepTime;
    this.metrics = new MetricsService('api');
  }

  // Posts
  getPosts() {
    const startTime = Date.now();
    const response = makeRequest('get', `${this.baseUrl}/posts`);
    this.metrics.recordDuration('get_posts_duration', startTime);
    
    const success = checkResponse(response);
    if (success) {
      this.metrics.increment('successful_gets');
    }
    
    sleep(this.sleepTime);
    return response;
  }

  getPost(id) {
    const startTime = Date.now();
    const response = makeRequest('get', `${this.baseUrl}/posts/${id}`);
    this.metrics.recordDuration('get_post_duration', startTime);
    
    const success = checkResponse(response);
    if (success) {
      this.metrics.increment('successful_gets');
    }
    
    sleep(this.sleepTime);
    return response;
  }

  createPost(postData) {
    const startTime = Date.now();
    const payload = JSON.stringify(postData);
    const response = makeRequest('post', `${this.baseUrl}/posts`, payload);
    this.metrics.recordDuration('create_post_duration', startTime);
    
    const success = checkResponse(response, 201);
    if (success) {
      this.metrics.increment('successful_posts');
    }
    
    sleep(this.sleepTime);
    return response;
  }

  // Comments
  getComments() {
    const startTime = Date.now();
    const response = makeRequest('get', `${this.baseUrl}/comments`);
    this.metrics.recordDuration('get_comments_duration', startTime);
    
    const success = checkResponse(response);
    if (success) {
      this.metrics.increment('successful_gets');
    }
    
    sleep(this.sleepTime);
    return response;
  }

  getPostComments(postId) {
    const startTime = Date.now();
    const response = makeRequest('get', `${this.baseUrl}/posts/${postId}/comments`);
    this.metrics.recordDuration('get_post_comments_duration', startTime);
    
    const success = checkResponse(response);
    if (success) {
      this.metrics.increment('successful_gets');
    }
    
    sleep(this.sleepTime);
    return response;
  }

  // Users
  getUsers() {
    const startTime = Date.now();
    const response = makeRequest('get', `${this.baseUrl}/users`);
    this.metrics.recordDuration('get_users_duration', startTime);
    
    const success = checkResponse(response);
    if (success) {
      this.metrics.increment('successful_gets');
    }
    
    sleep(this.sleepTime);
    return response;
  }

  getUserPosts(userId) {
    const startTime = Date.now();
    const response = makeRequest('get', `${this.baseUrl}/users/${userId}/posts`);
    this.metrics.recordDuration('get_user_posts_duration', startTime);
    
    const success = checkResponse(response);
    if (success) {
      this.metrics.increment('successful_gets');
    }
    
    sleep(this.sleepTime);
    return response;
  }
}