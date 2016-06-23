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
* `jquery` (to be removed)

Detailed instructions for development environment will follow

## To-Do
###Near Future:
-----
* *Migrating to single-server setup*
* Styling
  * input forms (comments, tabs)
  * sidebar and tabs
* Better handling of text entry (especially for markdown)
  * option to use textbox and turn on syntax highlighting in text area


###Roadmap:
------
* ~~Tabs/labeled group chats/etc~~
* implement tabbing logic (kinda done)
  * use of react routes
  * how tabs/comments will be related in terms of json/db schema
* User accounts?
  * Database
