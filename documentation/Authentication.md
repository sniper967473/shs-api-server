
Table of Contents
- [Overview](#overview)
- [Sign up with username / password](#sign-up-with-username--password)
  - [Request Body Payload](#request-body-payload)
  - [Response Body Payload](#response-body-payload)
  - [Error Codes](#error-codes)
- [Sign in with username / password](#sign-in-with-username--password)
  - [Request Body Payload](#request-body-payload-1)
  - [Response Body Payload](#response-body-payload-1)
  - [Error Codes](#error-codes-1)
- [Exchange refresh token with an ID token](#exchange-refresh-token-with-an-id-token)
  - [Request Body Payload](#request-body-payload-2)
  - [Response Body Payload](#response-body-payload-2)
  - [Error Codes](#error-codes-2)
- [Get user data](#get-user-data)
  - [Request Body Payload](#request-body-payload-3)
  - [Response Body Payload](#response-body-payload-3)
  - [Error Codes](#error-codes-3)
- [Delete account](#delete-account)
  - [Request Body Payload](#request-body-payload-4)
  - [Error Codes](#error-codes-4)


### Overview
The authentication is done using JWT encoded id tokens, the token is sent with each request in the header `Authorization: Bearer <ACCESS_TOKEN>`. 
Any request to an endpoint that requires authentication will fail if the id token is not specified, expired or invalid and the response will have `401 UNAUTHORIZED` HTTP status code.

<br>

### Sign up with username / password

You can create a new email and password user by issuing an HTTP POST request to the following endpoint

**Method** POST

**Content-Type** application/json

**Endpoint**
```
http/[HOST]/api/auth/accounts:signUp
```

#### Request Body Payload
| Property Name | Type   | Description                       |
| ------------- | ------ | --------------------------------- |
| password      | string | The password for the account.     |
| username      | string | The username for the account.     |
| displayName   | string | The display name for the account. |

#### Response Body Payload
[`AuthResponse`](Entities#AuthResponse-entity) 

A successful request is indicated by a `201 CREATED` HTTP status code.

#### Error Codes
| Code                    | Description                                |
| ----------------------- | ------------------------------------------ |
| EMAIL_ALREADY_EXISTS    | Indicates that the email already exists    |
| USERNAME_ALREADY_EXISTS | Indicates that the username already exists |
| WEAK_PASSWORD           | Indicates that the password is very weak   |

<br>

### Sign in with username / password

You can sign in a user with an email and password by issuing an HTTP POST request to the following endpoint.

**Method** POST

**Content-Type** application/json

**Endpoint**
```
http/[HOST]/api/auth/accounts:signInWithPassword
```

#### Request Body Payload
| Property Name | Type   | Description                           |
| ------------- | ------ | ------------------------------------- |
| username      | string | The username the user signing in with |
| password      | string | The password for the account.         |

#### Response Body Payload
[`AuthResponse`](Entities#AuthResponse-entity) 

A successful request is indicated by a `200 OK` HTTP status code.

#### Error Codes
| Code              | Description                                   |
| ----------------- | --------------------------------------------- |
| WRONG_CREDENTIALS | Indicates that email or password is incorrect |

<br>

### Exchange refresh token with an ID token

You can refresh an ID token by issuing an HTTP POST request to the following endpoint.

**Method** POST

**Content-Type** application/json

**Endpoint**
```
http/[HOST]/api/auth/token:refresh
```

#### Request Body Payload
| Property Name | Type   | Description         |
| ------------- | ------ | ------------------- |
| refreshToken  | string | Auth refresh token. |

#### Response Body Payload
[`AuthResponse`](Entities#AuthResponse-entity)

A successful request is indicated by a `200 OK` HTTP status code.

#### Error Codes
| Code                  | Description                                |
| --------------------- | ------------------------------------------ |
| EXPIRED_REFRESH_TOKEN | Indicates that the user must sign in again |

<br>

### Get user data

You can get a user's data by issuing an HTTP POST request to the following endpoint.

**Method** POST

**Content-Type** application/json

**Endpoint**
```
http/[HOST]/api/auth/accounts:lookup
```

#### Request Body Payload
| Property Name | Type   | Description                  |
| ------------- | ------ | ---------------------------- |
| idToken       | string | The ID token of the account. |

#### Response Body Payload
[`User`](Entities#User-entity) 

A successful request is indicated by a `200 OK` HTTP status code. The response will contain all the user information associated with the account.

#### Error Codes
| Code             | Description                                       |
| ---------------- | ------------------------------------------------- |
| EXPIRED_ID_TOKEN | Indicates that the id token needs to be refreshed |
| INVALID_ID_TOKEN | Indicates that the id is invalid.                 |

<br>

### Delete account

You can delete a current user by issuing an HTTP POST request to the following endpoint

**Method** POST

**Content-Type** application/json

**Endpoint**
```
http/[HOST]/api/auth/accounts:delete
```

#### Request Body Payload
| Property Name | Type   | Description                         |
| ------------- | ------ | ----------------------------------- |
| idToken       | string | The ID token of the user to delete. |


A successful request is indicated by a `204 NO CONTENT` HTTP status code.

#### Error Codes
| Code             | Description                                       |
| ---------------- | ------------------------------------------------- |
| EXPIRED_ID_TOKEN | Indicates that the id token needs to be refreshed |
| INVALID_ID_TOKEN | Indicates that the id is invalid.                 |