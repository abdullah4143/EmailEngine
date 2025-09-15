const axios = require('axios');

async function testAPI() {
  try {
    console.log('Testing Email API Service...\n');
    
    // Test health endpoint
    console.log('1. Testing health check endpoint...');
    const healthResponse = await axios.get('http://localhost:3000/health');
    console.log('✅ Health check passed:', healthResponse.data);
    
    // Test contact form endpoint
    console.log('\n2. Testing contact form endpoint...');
    const contactData = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'This is a test message from the API',
      phone: '+1234567890',
      company: 'Test Company',
      subject: 'API Test',
      productInterest: 'Testing'
    };
    
    const contactResponse = await axios.post('http://localhost:3000/api/contact', contactData);
    console.log('✅ Contact form test passed:', contactResponse.data);
    
    console.log('\n🎉 All tests passed! Your email API is production ready.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    process.exit(1);
  }
}

// Run tests if server is running
setTimeout(testAPI, 2000);
