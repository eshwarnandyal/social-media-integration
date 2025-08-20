import requests

# Replace these with your actual values
APP_ID = '1777779976510800'
APP_SECRET = '5e667f8e53909e07c2066cffeeaf1c46'
SHORT_LIVED_TOKEN = 'EAAZAQ4af9HVABPCQkrK0KnEWb89ypGHOFEKc2LEB7zUCAX9uC23iIwhKVBrXFfoJxlFij3Dcagh00ch7bVbfwemod3hpsW8WudkilTLXMVJz8ZATz7StRjZBJFEv50ApDPcj3gFZCmuiK9EZAZCBS17HZASMHubnAdW77fESoY5jvZCNyoLPBRz4BbvPD52HcvZA6CCkfiXzeZClea0KYZALk8khhPPZBrdN9EXM'

# Facebook Graph API endpoint to exchange token
url = 'https://graph.facebook.com/v19.0/oauth/access_token'

# Request parameters
params = {
    'grant_type': 'fb_exchange_token',
    'client_id': APP_ID,
    'client_secret': APP_SECRET,
    'fb_exchange_token': SHORT_LIVED_TOKEN
}

# Make the GET request
response = requests.get(url, params=params)

# Handle the response
if response.status_code == 200:
    data = response.json()
    long_lived_token = data.get('access_token')
    expires_in = data.get('expires_in')

    print("Long-Lived Token:", long_lived_token)
    print("Expires In (seconds):", expires_in)
else:
    print("Error exchanging token:")
    print(response.text)