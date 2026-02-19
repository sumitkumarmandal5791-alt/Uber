# User Registration API Endpoint

## Endpoint
\`GET /user/register\` matches the route mounting, but looking at \`user_routes.js\` it is defined as \`userRouter.post("/register", ...)\`. Assuming the router is mounted at \`/user\`, the full endpoint is:

**POST** \`/user/register\`

## Description
This endpoint allows a new user to register by providing their full name (first and last name), email address, and password. It validates the input, checks for existing users, hashes the password, creates a new user record, generates an authentication token, and sets it as a cookie.

## Request Headers
- \`Content-Type\`: \`application/json\`

## Request Body
The request body must be a JSON object with the following structure:

\`\`\`json
{
  "fullname": {
    "firstname": "John", // Required, min 3 characters
    "lastname": "Doe"    // Optional, min 3 characters if provided
  },
  "email": "john.doe@example.com", // Required, must be unique
  "password": "securePassword123"  // Required, min 5 characters
}
\`\`\`

### Field Validation Rules
- **fullname.firstname**: Required, String, Min length 3.
- **fullname.lastname**: Optional, String, Min length 3.
- **email**: Required, String, Valid email format. Unique in the database.
- **password**: Required, String, Min length 5.

## Responses

### Success Response (201 Created)
Returns the created user object and a success message. An HTTP-only cookie named \`token\` is also set.

\`\`\`json
{
  "message": "User registered successfully",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "_id": "64f1b2c3e4b0a1a2b3c4d5e6",
    "createdAt": "2023-09-01T12:00:00.000Z",
    "updatedAt": "2023-09-01T12:00:00.000Z",
    "__v": 0
  }
}
\`\`\`

### Error Responses

**400 Bad Request**
- If the user already exists with the provided email.
- If validation fails (e.g. missing fields, short password).

\`\`\`json
{
  "message": "User already exists with this email"
}
```

**500 Internal Server Error**
- If an unexpected error occurs on the server.

```json
{
  "message": "Internal Server Error"
}
```

# User Login API Endpoint

## Endpoint
**POST** `/user/login`

## Description
This endpoint allows a registered user to login by providing their email address and password. It validates the credentials, generates an authentication token, and sets it as an HTTP-only cookie.

## Request Headers
- `Content-Type`: `application/json`

## Request Body
The request body must be a JSON object with the following structure:

```json
{
  "email": "john.doe@example.com", // Required
  "password": "securePassword123"  // Required
}
```

## Responses

### Success Response (201 Created)
Returns the user object and a success message. An HTTP-only cookie named `token` is also set (valid for 1 hour).

```json
{
  "message": "use loged in successfully",
  "person": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "_id": "64f1b2c3e4b0a1a2b3c4d5e6",
    "createdAt": "2023-09-01T12:00:00.000Z",
    "updatedAt": "2023-09-01T12:00:00.000Z",
    "__v": 0
  }
}
```

### Error Responses

**400 Bad Request**
Returns a plain text error message in the following cases:
- If email or password is missing: "All fields are mandatory"
- If the user is not found: "User not found"
- If the password is incorrect: "Invalid credential"
