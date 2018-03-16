# Headless Wordpress App with GraphQL

This repository shows how to create a Wordpress Single Page Application with React & Apollo Client. In order to
connect to WP data, it uses the WPGraphQL plugin. 

## Setup

Change the configuration file in `src/Config.js` to poing to your Wordpress instance using the property: `wordpressUrl`.

```
const Config = {
  wordpressUrl: 'http://localhost:5010/',
  graphqlEndpoint: 'graphql'
};
```

Make sure your Wordpress instance has the lastest version of the **WPGraphQL plugin installed and activated**. 

Run the front-end app:

```
npm install
npm run serve
```