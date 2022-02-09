Table of Contents
- [Overview](#overview)
- [Error Response Body Payload](#error-response-body-payload)
### Overview
Anytime an error is returned from the server the response body will have the following properties.

### Error Response Body Payload
| Property Name | Type   | Description                                                            |
| ------------- | ------ | ---------------------------------------------------------------------- |
| code          | string | What is referenced as 'code' in all the error tables eg POST_NOT_FOUND |
| message       | string | a message that briefly describes the error                             |
| meta          | object | Meta data object related to this error                                 |
