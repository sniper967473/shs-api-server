Table of Contents
- [User entity](#user-entity)
- [AuthResponse entity](#authresponse-entity)
   

### User entity
| Property Name         | Type   | Description                                                 |
| --------------------- | ------ | ----------------------------------------------------------- |
| localId               | string | The uuid of the current user                                |
| username              | string | The username for the account.                               |
| displayName           | string | The display name for the account.                           |
| displayImageUrl       | string | The photo Url for the account.                              |
| birthdate             | number | the timestamp in seconds of the user birth date             |
| registrationTimestamp | number | The timestamp, in seconds, that the account was created at. |

<br>

### AuthResponse entity
| Property Name | Type   | Description                                          |
| ------------- | ------ | ---------------------------------------------------- |
| idToken       | string | Auth ID token for the authenticated user.            |
| refreshToken  | string | Auth refresh token for the authenticated user.       |
| localId       | number | The uid of the authenticated user.                   |
| expiresIn     | number | The number of seconds in which the ID token expires. |
| username      | string | The username for the authenticated user.             |

<br>
