# redis-lookups
Experimenting with redis storing and retrieving JSONs

## Requirements
* A running redis daemon

## Usage
* `npm install`
* `npm start`
* Lookup users on the route `/api/people/<ID>`
* For example: `http://localhost:3000/api/people/1` for the user with ID `1`
* View a history of the last 20 users looked up on the route `/api/people/history`
