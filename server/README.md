# Backend API Documentation

## **User Auth Section**

## Register User -

### Overview

This API handles the registration of new users for the application. It accepts user details, validates the input, hashes the password, and generates a JWT token for authentication.

---

### Endpoints

- ### URL: `/api/auth/signup`
- ### Method: `POST`

---

### Request Body:

The request body must be in JSON format and include the following fields:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "Password123!",
  "age": "25",
  "gender": "male",
  "about": "Software developer with 5 years of experience.",
  "skills": ["JavaScript", "Node.js", "MongoDB"]
}
```

---

### **Fields**

- **firstName**(string, required): The user's first name (min length: 2, max length: 20).
- **lastName**(string, required): The user's last name (min length: 2, max length: 20).
- **password**(string, required): A password (must be at least 8 characters long, must include an uppercase letter, a lowercase letter, a number, and a special character).
- **age**(Number, optional): The user's age.
- **gender**(string, optional): The user's gender. Options: `male`, `female`, `others`.
- **about**(String, optional): A short bio or description about the user.
- **skills**(array of strings, optional): An array of skills (each skill should have a minimum length of 10 characters).

---

### Example Response:

- **Success Response (201 Created)**

```json
{
  "success": true,
  "message": "User registered successfully!",
  "data": {
    "_id": "64c1234abcd567ef9012gh34",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "age": "25",
    "gender": "male",
    "profileUrl": "profile_image_url_if_exists",
    "about": "Software developer with 5 years of experience.",
    "skills": ["JavaScript", "Node.js", "MongoDB"]
  }
}
```

---

- **Error response (500)**

```json
{
  "message": "Internal Server Error"
}
```

---

### **Error Handling**

- **Validation Errors:** A `400` status is returned with a list of validation errors.
- **Missing Field or Server Issues** A `500` status is returned with an appropriate message.
- **Missing Fields or Server Issues:** A `500` status is returned with an appropriate message.

---

### **Behavior**

1. Validates the incoming request data using custom validation logic.

2. Checks if the user already exists in the database by email. If yes, it returns a conflict response.

3. Hashes the user's password securely using bcrypt.js.

4. If the user is new, saves the user details to the database and generates a JWT token.

5. Returns the user object (excluding the password) and the JWT token.

---

### **JWT Authentication**

Upon successful registration, a JWT token is generated and returned in a cookie to the client for further authentication in subsequent requests.

- **Cookie**: The token is saved in the `token` cookie with a lifespan of 8 hours.

---

## Login User -

### Overview

This API handles user login by verifying the provided email and password. If the credentials are correct, a JWT token is generated and returned in a cookie for session management.

---

### Endpoints

- ### URL: `/api/auth/login`
- ### Method: `POST`

---

### Request Body:

The request body must be in JSON format and include the following fields:

```json
{
  "email": "john.doe@example.com",
  "password": "Password123!"
}
```

---

### **Fields**

- **email**(string, required): The user's registered email address.

- **password**(string, required): A password (must be at least 8 characters long, must include an uppercase letter, a lowercase letter, a number, and a special character).

---

### Example Response:

- **Success Response (201 OK)**

```json
{
  "success": true,
  "message": "User logged in successfully."
}
```

---

### Error Responses

- **Validation Errors (400 Bad Request)**

  If the required fields (email or password) are missing, the following response is returned:

```json
{
  "success": false,
  "message": "All fields are required."
}
```

- **Invalid Credentials (401 Unauthorized)**

  If the email does not exist or the password is incorrect:

```json
{
  "success": false,
  "message": "Invalid credentials."
}
```

- **Internal Server Error (500 Internal Server Error)**

  In case of server-related issues:

```json
{
  "success": false,
  "message": "Internal Server Error."
}
```

---

### **Behavior**

1. ***Validates Input:*** Ensures that the email and password fields are provided

2. ***Checks User Existence:*** Looks up the user by email in the database. If the user is not found, it returns an unauthorized response.

3. ***Validates Password:*** Compares the provided password with the hashed password stored in the database. If the password is incorrect, it returns an unauthorized response.

4. ***Generates JWT Token:*** Upon successful authentication, generates a JWT token for the user.

5. ***Sets Cookie:*** The token is stored in a cookie for authentication in subsequent requests.

---

### **JWT Authentication**

Upon successful login, a JWT token is generated and saved as a cookie:

- **Cookie**: The token is saved in the `token` cookie with a lifespan of 8 hours.

---

## Logout User -

### Overview

This API handles user logout by clearing the authentication token from the cookies, effectively ending the user's session.

---

### Endpoints

- ### URL: `/api/auth/logout`
- ### Method: `POST`

---

### Headers:

The request must include the authentication token as either:

- A cookie named `token`.
- A Bearer token in the `Authorization` header.

---

### Example Request:

- **Headers**

```json
{
  "Authorization": "Bearer <JWT_TOKEN>"
}
```

- **Cookies**

```json
token=<JWT_TOKEN>
```

---

### Example Response:

- **Success Response (201 OK)**

If the logout is successful, the API returns the following response:

```json
{
  "success": true,
  "message": "User logged out successfully"
}

```

---

### Error Responses

- **Unauthorized (401 Unauthorized)**

 If the user is not authenticated or the token is invalid:

```json
{
  "success": false,
  "message": "Unauthorized."
}
```

- **Internal Server Error (500 Internal Server Error)**

  In case of server-related issues:

```json
{
  "success": false,
  "message": "Internal Server Error."
}
```

---

### **Behavior**

1. ***Verifies Token:***  Checks for a valid token in cookies or the Authorization header.

2. ***Clears Token:*** If the token is valid, it is cleared from the cookies.

3. ***Returns Success Response:*** Confirms that the user has been logged out successfully.
---

## **User Profile Section**

## View User Profile -

### Overview

This API allows an authenticated user to retrieve their profile details. The profile data includes information stored in the user's account.

---

### Endpoints

- ### URL: `/api/profile/view`
- ### Method: `GET`

---

### Headers:

The request must include the authentication token as either:

- A cookie named `token`.
- A Bearer token in the `Authorization` header.

---

### Example Request:

- **Headers**

```json
{
  "Authorization": "Bearer <JWT_TOKEN>"
}
```

- **Cookies**

```json
token=<JWT_TOKEN>
```

---

### Response:

- **Success Response (201 OK)**

If the profile is successfully retrieved, the API returns the following response:

```json
{
  "success": true,
  "data": {
    "_id": "64c1234abcd567ef9012gh34",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "age": 25,
    "gender": "male",
    "profileUrl": "profile_image_url_if_exists",
    "about": "Software developer with 5 years of experience.",
    "skills": ["JavaScript", "Node.js", "MongoDB"]
  },
  "message": "User profile retrieved successfully"
}
```

---

### Error Responses

- **Unauthorized (401 Unauthorized)**

 If the user is not authenticated or the token is invalid:

```json
{
  "success": false,
  "message": "Unauthorized."
}
```

- **Internal Server Error (500 Internal Server Error)**

  In case of server-related issues:

```json
{
  "success": false,
  "message": "Internal Server Error."
}
```

---

### **Behavior**

1. ***Authentication:*** Validates the JWT token provided in the request (either in cookies or the `Authorization` header).

2. ***Retrieve User Data:*** Fetches the authenticated user's details from the database.

3. ***Response:*** Returns the user's profile details along with a success message.
---

## Edit User Profile -

### Overview

This API allows authenticated users to update their profile details. Only specific fields can be updated, and each field is validated to ensure proper input.

---

### Endpoints

- ### URL: `/api/profile/edit`
- ### Method: `PATCH`
- ### Authentication Required: Yes (JWT Token)

---

### Headers:

The request must include the authentication token as either:

- A cookie named `token`.
- A Bearer token in the `Authorization` header.

---

### Request Body:

The body must contain the fields to be updated in JSON format. Only the following fields are allowed:

```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@example.com",
  "age": 28,
  "gender": "female",
  "profileUrl": "https://example.com/janedoe",
  "about": "Software engineer with expertise in full-stack development.",
  "skills": ["React", "Node.js", "MongoDB"]
}
```
---

### Fields and Validation Rules:

- ***firstName*** (string, optional): Min length: 2, Max length: 20.
- ***lastName*** (string, optional): Min length: 2, Max length: 20.
- ***email*** (string, optional): Must be a valid email address.
- ***age*** (number, optional): Must be an integer >= 13.
- ***gender*** (string, optional): Must be one of male, female, or others.
- ***profileUrl*** (string, optional): Must be a valid URL.
- ***about*** (string, optional): Max length: 300 characters.
- ***skills*** (array of strings, optional): Each skill should have a minimum length of 3 characters, and a maximum of 20 skills can be provided.

---

### Response:

- **Success Response (201 OK)**

```json
{
  "success": true,
  "message": "Jane, your profile is updated successfully."
}
```
---

### Error Responses

- **Unauthorized (401 Unauthorized)**

 If the user is not authenticated or the token is invalid:

```json
{
  "success": false,
  "message": "Unauthorized."
}
```

- **Error Response (400 Bad Request)**

 If the user is not authenticated or the token is invalid:

```json
{
  "success": false,
  "message": "Invalid edit request"
}
```

- **Internal Server Error (500 Internal Server Error)**

  In case of server-related issues:

```json
{
  "success": false,
  "message": "Internal Server Error."
}
```
---

### **Behavior**

1. ***Authentication:*** Validates the JWT token provided in the request (either in cookies or the Authorization header).
2. ***Validation:*** Ensures only allowed fields are updated and validates the values provided for each field.
3. ***Update Profile:*** Applies updates to the authenticated user's profile and saves them to the database.
4. ***Response:*** Returns a success message or an appropriate error.

---

## Forgot Password  -

### Overview

This API allows authenticated users to update their password details.

---

### Endpoints

- ### URL: `/api/profile/update-password`
- ### Method: `PATCH`
- ### Authentication Required: Yes (JWT Token)

---

### Headers:

The request must include the authentication token as either:

- A cookie named `token`.
- A Bearer token in the `Authorization` header.

---

### Request Body:

The body must contain the fields to be updated in JSON format. Only the following fields are allowed:

```json
{
  "oldPassword": "current_password",
  "newPassword": "new_secure_password"
}
```
---

### Fields and Validation Rules:

- ***oldPassword*** (string, required): The user’s current password.
- ***newPassword*** (string, required): The new password the user wants to set. Must meet the following criteria:
  - At least 8 characters long.
  - Includes at least one uppercase letter, one lowercase letter, one number, and one special character.
  - Must not be the same as the old password.

---

### Response:

- **Success Response (201 OK)**

```json
{
  "success": true,
  "message": "Your password has been updated successfully"
}
```
---

### Error Responses

- **Unauthorized (401 Unauthorized)**

 If the user is not authenticated or the token is invalid:

```json
{
  "success": false,
  "message": "Unauthorized."
}
```

- **Error Response (400 Bad Request)**

```json
{
  "success": false,
  "message": "New password cannot be the same as the old password"
}
```

- **Incorrect Old Password**

```json
{
  "success": false,
  "message": "The current password you entered is incorrect"
}
```

- **Internal Server Error (500 Internal Server Error)**

  In case of server-related issues:

```json
{
  "success": false,
  "message": "Internal Server Error."
}
```
---
---

## **Connection Request Section**

## Send Connection Request  -

### Overview

This API allows users to send connection request to each other.

---

### Endpoints

- ### URL: `/api/request/send/:status/:toUserId`
- ### Method: `POST`
- ### Authentication Required: Yes (JWT Token)

---

### Headers:

The request must include the authentication token as either:

- A cookie named `token`.
- A Bearer token in the `Authorization` header.

---

### Path Parameters:

| Parameter                | Type                     | Description                                   |
| ------------------------ | ------------------------ | ----------------------------------------------- |
| `status`                 | String                   | The status of the connection request. Allowed values are `"ignored"` or `"interested"`.                                 |
| `toUserId`               | String                   | The `ObjectId` of the user to whom the connection request is being sent.                                |

---

### Response:

- **Success Response (201 Created)**

```json
{
  "success": true,
  "data": {
    "_id": "64f1b28f4c3eab001cc8d4e5",
    "fromUserId": "64f1b28f4c3eab001cc8d4e4",
    "toUserId": "64f1b28f4c3eab001cc8d4e6",
    "status": "interested",
    "createdAt": "2025-01-21T08:00:00.000Z",
    "updatedAt": "2025-01-21T08:00:00.000Z"
  },
  "message": "Connection request sent successfully."
}
```
---

### Error Responses

- **Unauthorized (401 Unauthorized)**

 If the user is not authenticated or the token is invalid:

```json
{
  "success": false,
  "message": "Unauthorized."
}
```

- **Error Response (400 Bad Request)**

```json
{
  "success": false,
  "message": "You cannot send a connection request to yourself."
}
```

- **Error Response (404 Not Found)**

```json
{
  "success": false,
  "message": "The user you are trying to connect with does not exist."
}
```

- **Internal Server Error (500 Internal Server Error)**

  In case of server-related issues:

```json
{
  "success": false,
  "message": "Internal Server Error."
}
```
---

## Review Connection Request -

### Overview

This API allows review its connection request. it can be accepted or rejected.

---

### Endpoints

- ### URL: `/api/request/review/:requestId/:newStatus`
- ### Method: `PATCH`
- ### Authentication Required: Yes (JWT Token)

---

### Headers:

The request must include the authentication token as either:

- A cookie named `token`.
- A Bearer token in the `Authorization` header.

---

### Path Parameters:

| Parameter                | Type                     | Description                                   |
| ------------------------ | ------------------------ | ----------------------------------------------- |
| `status`                 | String                   | The new status of the connection request (`accepted` or `rejected`).                               |
| `requestId`               | String                   | The unique ObjectId of the connection request to review.                                |

---

### Response:

- **Success Response (200 OK)**

```json
{
  "success": true,
  "data": {
    "_id": "64f1b28f4c3eab001cc8d4e5",
    "fromUserId": "64f1b28f4c3eab001cc8d4e4",
    "toUserId": "64f1b28f4c3eab001cc8d4e6",
    "status": "accepted",
    "createdAt": "2025-01-21T08:00:00.000Z",
    "updatedAt": "2025-01-21T08:05:00.000Z"
  },
  "message": "Connection request has been accepted."
}
```
---

### Error Responses

- **Unauthorized (401 Unauthorized)**

 If the user is not authenticated or the token is invalid:

```json
{
  "success": false,
  "message": "Unauthorized."
}
```

- **Error Response (400 Bad Request)**

```json
{
  "success": false,
  "message": "Invalid review status. Allowed statuses are 'accepted' or 'rejected'."
}
```

- **Error Response (404 Not Found)**

```json
{
  "success": false,
  "message": "No pending connection request found for this user."
}
```

- **Internal Server Error (500 Internal Server Error)**

  In case of server-related issues:

```json
{
  "success": false,
  "message": "Internal Server Error."
}
```
---

## Get Received Connection Requests -

### Overview

This API allows users to get his all the connection requests that he received.

---

### Endpoints

- ### URL: `/api/user/connections/requests/received`
- ### Method: `GET`
- ### Authentication Required: Yes (JWT Token)

---

### Headers:

The request must include the authentication token as either:

- A cookie named `token`.
- A Bearer token in the `Authorization` header.

---

### Response:

- **Success Response (200 OK)**

```json
{
  "success": true,
  "data": [
    {
      "_id": "64f1b28f4c3eab001cc8d4e5",
      "fromUserId": {
        "_id": "64f1b28f4c3eab001cc8d4e4",
        "firstName": "John",
        "lastName": "Doe",
        "profileUrl": "https://geographyandyou.com/images/user-profile.png",
        "skills": ["JavaScript", "React", "Node.js"],
        "about": "Full-stack developer with 5 years of experience.",
      },
      "status": "interested",
      "createdAt": "2025-01-21T08:00:00.000Z",
      "updatedAt": "2025-01-21T08:05:00.000Z",
    },
  ],
  "message": "Connection requests retrieved successfully.",
}
```
---

### Error Responses

- **Unauthorized (401 Unauthorized)**

 If the user is not authenticated or the token is invalid:

```json
{
  "success": false,
  "message": "Unauthorized."
}
```

- **Internal Server Error (500 Internal Server Error)**

  In case of server-related issues:

```json
{
  "success": false,
  "message": "Failed to fetch connection requests. Please try again later."
}
```
---

## Get Connections Functionality -

### Overview

The "Get Connections" API endpoint retrieves all accepted connections for the authenticated user. Connections can either be initiated by the user or received from another user. The endpoint ensures the user can see their established connections in a paginated format for better performance and usability.

---

### Endpoints

- ### URL: `/api/user/connections`
- ### Method: `GET`
- ### Authentication Required: Yes (JWT Token)

---

### Headers:

The request must include the authentication token as either:

- A cookie named `token`.
- A Bearer token in the `Authorization` header.

---

### Response:

- **Success Response (200 OK)**

```json
{
  "success": true,
  "data": [
    {
      "_id": "64f1b28f4c3eab001cc8d4e4",
      "firstName": "Jane",
      "lastName": "Smith",
      "profileUrl": "https://geographyandyou.com/images/user-profile.png",
      "age": 28,
      "gender": "female",
      "about": "Frontend developer specializing in React.",
      "skills": ["React", "CSS", "HTML"]
    },
    {
      "_id": "64f1b28f4c3eab001cc8d4e5",
      "firstName": "John",
      "lastName": "Doe",
      "profileUrl": "https://geographyandyou.com/images/user-profile.png",
      "age": 30,
      "gender": "male",
      "about": "Software engineer with 8 years of experience.",
      "skills": ["JavaScript", "Node.js", "MongoDB"]
    }
  ],
  "message": "Connections fetched successfully."
}
```
---

### Error Responses

- **Unauthorized (401 Unauthorized)**

 If the user is not authenticated or the token is invalid:

```json
{
  "success": false,
  "message": "Unauthorized."
}
```

- **Internal Server Error (500 Internal Server Error)**

  In case of server-related issues:

```json
{
  "success": false,
  "message": "Failed to fetch connections. please try again later."
}
```
---
