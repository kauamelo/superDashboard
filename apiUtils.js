
const apiBaseUrl = 'https://staging-api.agriavetguide.com';
const authUrl = '/v1/auth/login';

const userEmail = 'kaua+sw120@agriavetguide.com';
const userPassword = '12345678';

let accessToken;  // It's valid for 60 minutes
let refreshToken; // It's valid for 30 days


// ------------------------------------------------------------------------

async function authenticate() {
    const authData = {
      email: userEmail,
      password: userPassword,
    };

    try 
    {
        const response = await fetch(apiBaseUrl + authUrl, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
          body: JSON.stringify(authData),
        });
    
        if (!response.ok) {
          throw new Error(`Authentication failed! Status: ${response.status}`);
        }
    
        const authResult = await response.json();
        accessToken = authResult.accessToken;
        refreshToken = authResult.refreshToken;

        console.log('AUTHENTICATION SUCCEEDED:');
        console.log('   accessToken: ', accessToken);
        console.log('   refreshToken: ', refreshToken);
        console.log('-----------------------------');
    
      } 
        catch (error) {
            console.error('Authentication error:', error.message);
        }
}
    
