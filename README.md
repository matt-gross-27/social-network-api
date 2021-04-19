# Social Network Api

## User Story

```
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## GIVEN a social network API

```
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database

WHEN I open API GET routes in Insomnia Core for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON

WHEN I test API POST, PUT, and DELETE routes in Insomnia Core
THEN I am able to successfully create, update, and delete users and thoughts in my database

WHEN I test API POST and DELETE routes in Insomnia Core
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```


## Models

### User
- ```username```
  - String
  - Unique
  - Required
  - Trimmed
- ```email```
  - String
  - Required
  - Unique
  - Must match a valid email address (look into Mongoose's matching validation)
- ```thoughts```
  - Array of _id values referencing the Thought model
- ```friends```
  - Array of _id values referencing the User model (self-reference)
- Schema Settings
  - Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

<hr />

### Thought

- ```thoughtText```
  - String
  - Required
  - Must be between 1 and 280 characters
- ```createdAt```
  - Date
  - Set default value to the current timestamp
  - Use a getter method to format the timestamp on query
- ```username``` (The user that created this thought)
  - String
  - Required
- ```reactions``` (These are like replies)
  - Array of nested documents created with the reactionSchema

- Schema Settings
  - Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

### Reaction (SCHEMA ONLY)

- ```reactionId```
  - Use Mongoose's ObjectId data type
  - Default value is set to a new ObjectId
- ```reactionBody```
  - String
  - Required
  - 280 character maximum
- ```username```
  - String
  - Required
- ```createdAt```
  - Date
  - Set default value to the current timestamp
  - Use a getter method to format the timestamp on query
- Schema Settings
  - This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.