# vzy-backend-test

## Overview
This project is a backend application built with Node.js and Express.js. It provides endpoints for user authentication, user management, generating payment links, and managing subscriptions.

## Getting Started
To run the project locally, follow these steps:

- ### Clone the Project
```bash
git clone https://github.com/Gbolahan10/vzy_test.git
```
- ### Setting up the project locally
1. install all dependencies (run in terminal) - 
```bash
npm install
```

2. build the project (run in terminal) 
```bash
npm run build
```

3. start development server (run in terminal)
```bash
npm run dev
```

## Documentation - Localhost Sample

### SignUp - http://localhost:8000/auth/signup

- request body:
```json
{
    "email": "************@gmail.com",
    "firstName": "test",
    "lastName": "user",
    "password": "password",
    "countryCode": "234",
    "phoneNumber": "08100000000"
}
```

- sample response:
```json
{
    "data": {
        "user": {
            "email": "************@gmail.com",
            "password": "$2b$10$wQo6txYSdYyW.Il3SUIwc.H3I4/SPSTfCyhS3ZneQ9DJDgx24zzkq",
            "firstName": "test",
            "lastName": "user",
            "countryCode": "234",
            "phoneNumber": "08100000000",
            "_id": "65cc7693********db3510c",
            "createdAt": "2024-02-14T08:15:15.216Z",
            "updatedAt": "2024-02-14T08:15:15.216Z",
            "__v": 0,
            "id": "65cc7693********db3510c"
        }
    },
    "message": "Account created successfully."
}
```

### SignIn - http://localhost:8000/auth/signin

- request body:
```json
{
    "email": "***********@gmail.com",
    "password": "password"
}
```

- sample response:
```json
{
    "data": {
        "user": {
            "_id": "65cdca*******ef7434bd",
            "email": "***********@gmail.com",
            "password": "$2b$10$kkd7MFETu53nptv/L2MvzeCCQoR.tr6T02FFcYv0j3Mdfo3qF1llm",
            "firstName": "test",
            "lastName": "user",
            "countryCode": "234",
            "phoneNumber": "08100000000",
            "status": "EXPIRED",
            "createdAt": "2024-02-15T08:24:13.586Z",
            "updatedAt": "2024-02-15T08:36:19.247Z",
            "__v": 0,
            "id": "65cdca*******ef7434bd"
        },
        "token_details": {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6eyJfaWQiOiI2NWNkY2EyZGJlZjFmY2VhZWY3NDM0YmQiLCJlbWFpbCI6Imdib2xhaGFuLmFqaWJhZGVAbGlrZW5lc3Nncm91cC5jb20iLCJwYXNzd29yZCI6IiQyYiQx*************************************************IsInVwZGF0ZWRBdCI6IjIwMjQtMDItMTVUMDg6MzY6MTkuMjQ3WiIsIl9fdiI6MCwiaWQiOiI2NWNkY2EyZGJlZjFmY2VhZWY3NDM0YmQifSwiaWF0IjoxNzA3OTg2MjI3LCJleHAiOjE3MDc5ODYyODd9.KZ_Y8yq0OOfrKvtevBR_I4qzWc9oa90D0X3lP7O6Gzg",
            "createdAt": "2024-02-15T08:37:07.665Z",
            "expiresAt": "2024-02-15T08:38:07.665Z",
            "expiresIn": 60
        }
    },
    "message": "Login successful"
}
```

### Update User details - http://localhost:8000/user/update

login token required - (Bearer Token)
note- all fields are optional. Other fields that can be updated are lastName, countryCode and phoneNumber

- request body: 
```json
{
    "address": "test, test",
    "firstName": "testuser"
}
```

- sample response:
```json
{
    "message": "User details updated"
}
```

### Generate Payment Link - http://localhost:8000/payment/link/generate

login token trequired

- request body: no request body

- sample response:
```json
{
    "data": {
        "paymentLink": "https://buy.stripe.com/**************"
    },
    "message": "Paymrnt link generated successfully"
}
```

Note: click on the link to make test payment.
test card details:

16 digits - 4242 4242 4242 4242
expiry date - 02/24
cic - 123

### End Subscription Manually - http://localhost:8000/user/subscription/end

This is to be able to quickly test that a user status is updated to PAID upon confirmation of their payment. This is just a test project and can't cover scenario like time lapse. Use this endpoint to elapse current subscription so as to be able to perform some dependent activities.

login token required

- request body - no request body

- sample response:
```json
{
    "message": "Subscription ended successfully"
}
```

### .env.development format - development server

PORT = 8000
DATABASE_URL = mongodb://localhost:27017/vzytest

ORIGIN = *
CREDENTIALS = true

SECRET_KEY = VZYBackendSpecialSecret100223645856%$&$*#()@

LOG_FORMAT = dev
LOG_DIR = ../../logs

ENDPOINT_SECRET = generate from stripe
WEBHOOK_API_KEY = generate from stripe