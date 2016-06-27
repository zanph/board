# board
Collaborative, markdown-enabled chat in the browser, built with React.

## Getting Started
Requires `node` (and `npm`).
To run, `npm install` and then `node server.js` and `npm start` (will combine `express` and `react-router`
in a single server soon).
### Dependencies
* `classnames`
* `react`
* `react-router`
* `react-dom`
* `jquery` (to maybe be removed)
* `react-bootstrap` for styling and layout

Detailed instructions for development environment will follow

## To-Do
###Near Future:
-----
* TravisCI or some other automatic testing for pull requests
* *Migrating to single-server setup* -- (just need to integrate express.js server)
* Styling (partly done)
  * ~~input forms (comments, tabs)~~
  * sidebar and tabs
* Better handling of text entry (especially for markdown)
  * option to use textbox and turn on syntax highlighting in text area
    * button is in place, just need to implement in react


###Roadmap:
------
* ~~Tabs/labeled group chats/etc~~
* implement tabbing logic (kinda done)
  * use of react routes
  * how tabs/comments will be related in terms of json/db schema
* User accounts?
  * Database
