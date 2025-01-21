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
