# Social Network Api

<div style="position: absolute; top: 22px; right: 50px">

![licence: MIT](https://img.shields.io/badge/license-MIT-blue)
</div>

## Description

- Social Network API is a lightweight Node.js backend for a social media application.
- It's built using the NoSQL database ```MongoDB``` and uses the ODM, ```Mongoose```.
- Feel free to clone this repo and add whatever other models and routes you may need!

<hr />

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
  - [Models](#models)
  - [Api Routes](#api%20routes)
- [Questions](#questions)
- [License](#license)

<hr />

## Installation
  - Clone this repository to your machine
  - Make sure you have installed ```Node.js``` and ```MongoDB```
  - Installation guides here: [Node](https://nodejs.org/en/download/) + [Mongo](https://docs.mongodb.com/manual/installation/)
  - Run the command ```npm i``` to install ```express``` and ```mongoose``` npm packages.

<hr />

## Usage
Navigate to the route directory in your terminal and run the command ```npm start```. If you have already installed ```MongoDB``` your database should be automatically connected and your server should be running on PORT 3001.

In production, make sure to add the environmental variable ```MONGODB_URI``` to connect to your database. Look into [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/lp/try2?utm_source=google&utm_campaign=gs_americas_united_states_search_core_brand_atlas_desktop&utm_term=atlas%20mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624338&gclid=Cj0KCQjw1PSDBhDbARIsAPeTqrfV0-9GQjpkFTsXoGPEzLUJUixVa9aCPVX6sY49t9NCMgrr31cfTkQaAhtyEALw_wcB) for a production database solution.

Lastly, Check out this ```Demo Video``` to see the API Routes tested in ```Insomnia Core```


### Models

#### User
- ```username```
  - String
  - Unique
  - Required
  - Trimmed
- ```email```
  - String
  - Required
  - Unique
  - Must match a valid email address
- ```thoughts```
  - Array of ```_id``` values referencing the Thought model
- ```friends```
  - Array of ```_id``` values referencing the User model (self-reference)
- ```friendCount``` (virtual)
- ```thoughtCount``` (virtual)

<hr />

#### Thought

- ```thoughtText```
  - String
  - Required
  - Must be between 1 and 280 characters
- ```createdAt```
  - Date
  - default value to the current timestamp
- ```username``` (The user that created this thought)
  - String
  - Required
- ```reactions``` (These are like replies)
  - Array of nested documents created with the reactionSchema
- ```reactionCount``` (virtual)

#### Reaction (Subdocument for Thought's ```reactions``` field)
<hr />

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

<hr />

### API Routes
#### ```/api/users```

- ```GET``` all users

- ```GET``` a single user by its ```_id``` and populated thought and friend data

- ```POST``` a new user:
```
// example data
{
  "username": "mg",
  "email": "mg@gmail.com"
}
```

- ```PUT``` to update a user by its ```_id```

- ```DELETE``` to remove user by its ```_id```

  - Remove a user's associated thoughts when deleted.

<hr />

#### ```/api/users/:userId/friends/:friendId```

- ```POST``` to add a new friend to a user's friend list

- ```DELETE``` to remove a friend from a user's friend list

<hr />

#### ```/api/thoughts```

- ```GET``` to get all thoughts

- ```GET``` to get a single thought by its ```_id```

- ```POST``` to create a new thought and push the created thought's ```_id``` to the associated user's ```thoughts``` array field

```
// example data
{
  "thoughtText": "Here's a thought...",
  "username": "mg",
  "userId": "5edff358a0fcb779aa7b118b"
}
```

- ```PUT``` to update a thought by its ```_id```

- ```DELETE``` to remove a thought by its ```_id```

<hr />

### ```/api/thoughts/:thoughtId/reactions```

- ```POST``` to create a reaction stored in a single thought's reactions array field

### ```/api/thoughts/:thoughtId/reactions/reactionId```

- ```DELETE``` to pull and remove a reaction by the reaction's ```reactionId``` value

## Questions
- Feel free to reach out with any question
  - GitHub: [matt-gross-27](https://www.github.com/matt-gross-27)
  - Email: [mbgross111@gmail.com](mailto:mbgross111@gmail.com)

## License
- MIT
