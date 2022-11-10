# API Setup

This is a initializing starting point for making an API.

### Images Model
| Column Name | Data Type | Notes |
| --------------- | ------------- | ------------------------------ |
| _id | ObjectId | Made by MongoDB |
| profileImg | Buffer |  |
| __v | Number | Made by Mongoose |

## Images - Routes

| Method | Path | Location | Purpose |
| ------ | ---------------- | -------------- | ------------------- |
| GET | /images/ | images.js | Test route for images, returns all images |
| POST | /images/new | images.js | Create a new user and add to DB |
| POST | /images/login | images.js | Logs user in via credentials, returns user |
| GET | /images/profile | images.js | Protected route, need token to access |

### Journey Model
| Column Name | Data Type | Notes |
| --------------- | ------------- | ------------------------------ |
| _id | ObjectId | Made by MongoDB |
| origin | String | Required |
| date | String | Required |
| destination | String | Required |
| contribution | Number | Required |
| openSeats | Number | Required |
| driverUid | Array | Reference to User model |
| passengerUids | Array | Reference to User model |
| messages | Array | Reference to Message model |
| __v | Number | Made by Mongoose |

### Message Model
| Column Name | Data Type | Notes |
| --------------- | ------------- | ------------------------------ |
| _id | ObjectId | Made by MongoDB |
| title | String |  |
| content | String |  |
| replies | Array | Reference to Reply model |
| user | Array | Reference to User model |
| journey | Array | Reference to Journey model |
| __v | Number | Made by Mongoose |

### Reply Model
| Column Name | Data Type | Notes |
| --------------- | ------------- | ------------------------------ |
| _id | ObjectId | Made by MongoDB |
| content | String |  |
| user | Array | Reference to Journey model |
| __v | Number | Made by Mongoose |

### Reviews Model
| Column Name | Data Type | Notes |
| --------------- | ------------- | ------------------------------ |
| _id | ObjectId | Made by MongoDB |
| title | String | Optional in this case |
| replies | Array | Reference to Reply model |
| user | Array | Reference to User model |
| toUser | Array | Reference to User model |
| __v | Number | Made by Mongoose |

### User Model
| Column Name | Data Type | Notes |
| --------------- | ------------- | ------------------------------ |
| _id | String | Made by MongoDB |
| firstName | String | Required |
| lastName | String | Required |
| email | String | Required |
| date | Number | Required |
| birthdate | Number | Required |
| driver | Array | Reference to User model |
| vehicle | Array | Vehicle to User model |
| messages | Array | Reference to Message model |
| replies | Array | Reference to Reply model |
| journey | Array | Reference to Journey model |
| reviews | Array | Reference to Reviews model |
| photos | Array | Reference to Images model |
| __v | Number | Made by Mongoose |

### Vehicle Model
| Column Name | Data Type | Notes |
| --------------- | ------------- | ------------------------------ |
| _id | ObjectId | Made by MongoDB |
| make | String |  |
| model | String |  |
| year | Number |  |
| seats | Number |  |
| name | String |  |
| url | String |  |
| __v | Number | Made by Mongoose |


### Examples - Default Routes

| Method | Path | Location | Purpose |
| ------ | ---------------- | -------------- | ------------------- |
| GET | / | app.js | Welcome to API |
| GET | /examples | example.js | Get all examples |
| GET | /examples/:id | example.js | Get one example |
| POST | /examples | example.js | Create an example |
| PUT | /examples/:id | example.js | Update an example |
| DELETE | /examples/:id | example.js | Delete an example |

## Examples - Detailed Info

Detailed info for serialized examples
- Get all examples : GET /examples
- Get one example : GET /examples/:id
- Create a capsule : POST /examples
- Update a capsule : PUT /examples/:id
- Delete a capsule : DELETE /examples/:id


# Users - Detailed Info

Detailed info for serialized examples
- Test user routes : GET /users/test
- Create a user : POST /users/signup
- Login a user : POST /users/login
- Return user data (must login beforehand and use token) : GET /users/profile


# How to Use the Spotify API

- [ ] Install `axios`
```text
npm install axios
```

