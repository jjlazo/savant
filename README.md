# Savant

## About Savant:
Savant is a poetry hosting and annotating platform where users can discover a new poem every day or search for their favorites and bookmark them for future reference.

Site: https://savant-oxvn.onrender.com/

## Technologies Used:
- Flask
- SQLAlchemy
- PostgreSQL
- React
- Redux
- OAuth2

This project uses flask as the backend, react and redux for the frontend rendering and data. Data is stored in a postgres database, and the backend interfaces with it through sqlalchemy. Authentication is handled with a csrf token, so once users sign in, they can remain signed in until that auth expires. Alternative authentication is handled through Google OAuth 2.0 which uses Access Tokens to grant users permissions on the Breadit application without having to create a new account.

## Features

### Authors
Users can search and create Authors. When a user creates an author they will be given the ability to delete the author and poems that belong to that author.

### Poems
 Users can share, bookmark, and even search poems. Users can read all poems, poems of a specific author, a single poem, poems they've bookmarked, and the poems they have posted on the user home page. They can edit and delete their own poems from the poem's detail page and from the user home.

### Comments
Users can read and create comments on poems. They can edit and delete their own comments, which will indicate that they have been edited with an 'Edited' tag.

### Bookmarks
Users can save their favorite poems by bookmarking them, or remove them from that list by unbookmarking them.

### OAuth
Users can register and log in with their Google account.

## Future Features

### Annotations
Users can share historical context or other notes on specific lines in a poem, which the community can up or down vote according to how correct or useful the annotation is.

### Up-Votes/Down-Votes
Users will be able to up-vote or down-vote an annotation, to indicate to the community if it is a credible annotation or should be taken with a grain of salt.

### Uploading audio recordings
Users will be able to upload recordings of poems.
