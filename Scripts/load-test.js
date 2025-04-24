// scripts/load-test.js
import { group, sleep } from 'k6';
import { getEnvironment } from '../config/environments.js';
import JsonPlaceholderService from '../services/api-service.js';
import { generatePost, generateComment, getRandomPostId, getRandomUserId } from '../libs/data-generator.js';

// Load test configuration
export const options = {
  // Normal expected load scenario
  stages: [
    { duration: '1m', target: 10 },  // Ramp up to 10 users over 1 minute
    { duration: '5m', target: 10 },  // Stay at 10 users for 5 minutes
    { duration: '1m', target: 0 }    // Ramp down to 0 users over 1 minute
  ],
  thresholds: {
    // Service-level SLAs
    'http_req_duration': ['p(95)<1000', 'p(99)<1500'],  // 95% of requests must complete within 1s, 99% within 1.5s
    'http_req_failed': ['rate<0.01'],                   // Less than 1% of requests should fail
    
    // Endpoint-specific SLAs
    'api_get_posts_duration': ['p(95)<800'],            // 95% of get posts requests complete within 800ms
    'api_get_post_comments_duration': ['p(95)<800'],    // 95% of get comments requests complete within 800ms
    'api_create_post_duration': ['p(95)<1200'],         // 95% of create post requests complete within 1.2s
    
    // Business transaction SLAs
    'scenario_browse_posts': ['p(95)<2000'],            // 95% of post browsing scenarios complete within 2s
    'scenario_user_profile': ['p(95)<2000']             // 95% of user profile scenarios complete within 2s
  }
};

// Initialize environment and services once at the beginning
const env = getEnvironment();
const api = new JsonPlaceholderService(env.baseUrl, env.sleepTime);

// Main test function - each VU executes this
export default function() {
  // Randomly choose a scenario to execute (simulate different user behaviors)
  const scenario = Math.random();
  
  if (scenario < 0.4) {
    // 40% of users browse posts and comments
    browsePosts();
  } else if (scenario < 0.7) {
    // 30% of users view user profiles
    viewUserProfile();
  } else if (scenario < 0.9) {
    // 20% of users create content
    createContent();
  } else {
    // 10% of users do a mix of activities
    mixedActivity();
  }
}

// Scenario 1: Browsing posts and comments
function browsePosts() {
  const scenarioStart = Date.now();
  
  group('Browse Posts Scenario', function() {
    // Get all posts
    const postsResponse = api.getPosts();
    
    // View a specific post
    const postId = getRandomPostId();
    const postResponse = api.getPost(postId);
    
    // View comments on that post
    const commentsResponse = api.getPostComments(postId);
  });
  
  // Record full scenario duration
  const scenarioDuration = Date.now() - scenarioStart;
  api.metrics.recordTrend('scenario_browse_posts', scenarioDuration);
}

// Scenario 2: Viewing user profiles and their posts
function viewUserProfile() {
  const scenarioStart = Date.now();
  
  group('User Profile Scenario', function() {
    // Get all users
    const usersResponse = api.getUsers();
    
    // View a specific user's posts
    const userId = getRandomUserId();
    const userPostsResponse = api.getUserPosts(userId);
  });
  
  // Record full scenario duration
  const scenarioDuration = Date.now() - scenarioStart;
  api.metrics.recordTrend('scenario_user_profile', scenarioDuration);
}

// Scenario 3: Creating content
function createContent() {
  const scenarioStart = Date.now();
  
  group('Create Content Scenario', function() {
    // Create a new post
    const postData = generatePost();
    const createPostResponse = api.createPost(postData);
  });
  
  // Record full scenario duration
  const scenarioDuration = Date.now() - scenarioStart;
  api.metrics.recordTrend('scenario_create_content', scenarioDuration);
}

// Scenario 4: Mixed activity
function mixedActivity() {
  const scenarioStart = Date.now();
  
  group('Mixed Activity Scenario', function() {
    // View some posts
    const postsResponse = api.getPosts();
    
    // View a specific user
    const userId = getRandomUserId();
    const userPostsResponse = api.getUserPosts(userId);
    
    // Create content
    const postData = generatePost();
    const createPostResponse = api.createPost(postData);
  });
  
  // Record full scenario duration
  const scenarioDuration = Date.now() - scenarioStart;
  api.metrics.recordTrend('scenario_mixed_activity', scenarioDuration);
}