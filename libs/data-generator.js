export function generateUser() {
    const userId = Math.floor(Math.random() * 10) + 1; // JSONPlaceholder has 10 users
    return { userId };
  }
  
  export function generatePost() {
    const userId = Math.floor(Math.random() * 10) + 1;
    return {
      userId,
      title: `Load Test Post ${Date.now()}`,
      body: `This is a test post created during load testing at ${new Date().toISOString()}.`
    };
  }
  
  export function generateComment() {
    const postId = Math.floor(Math.random() * 100) + 1; // JSONPlaceholder has 100 posts
    return {
      postId,
      name: `Test Comment ${Date.now()}`,
      email: `tester${Date.now()}@example.com`,
      body: `This is a test comment created during load testing at ${new Date().toISOString()}.`
    };
  }
  
  export function getRandomPostId() {
    return Math.floor(Math.random() * 100) + 1;
  }
  
  export function getRandomUserId() {
    return Math.floor(Math.random() * 10) + 1;
  }