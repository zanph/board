/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

const COMMENTS_FILE = path.join(__dirname, 'comments.json');
const TABS_FILE     = path.join(__dirname, 'tabs.json');

app.set('port', (process.env.PORT || 3001));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/comments', function(req, res) {
  /*
  *  This API endpoint is used to get the comments for a given tab
  */
  //retrieve the tab name from the URL query
  const tabName = req.query.tabName;
  console.log(tabName);
  var tabs;
  fs.readFile(TABS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    //parse tabs from the TABS_FILE
    tabs = JSON.parse(data);
    console.log(JSON.stringify(tabs));
    //look for the tab by name
    let found = false;
    for(let i=0; i < tabs.length; ++i) {
      console.log(tabs[i].name);
      if(tabs[i].name === tabName) {
        found = true;
        console.log(tabs[i].comments);
        //if we found the tab, return its comments
        res.json(tabs[i].comments);
      }
    }
    if (!found) {
      //if we didnt find the tab (usually when opening for the first time), create it
      //with no comments
      console.log('tab not found');
      //initialize a new tab
      tempTab = {"id":Date.now(), "name":tabName, "comments":[]};
      //add it to the current tab list
      tabs.push(tempTab);
      console.log('new tabs: \n');
      console.log(JSON.stringify(tabs));
      //write the new tabs to TABS_FILE
      fs.writeFile(TABS_FILE, JSON.stringify(tabs, null, 4), function(err) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        //return an empty list object (the new comment list), equivalent to
        //res.json(tabs[tabs.length].comments)
        res.json([]);
      });
    }
  });
});

app.post('/api/comments', function(req, res) {
  let tabs;
  const tabName = req.body.tabName;
  fs.readFile(TABS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    tabs = JSON.parse(data);
    let found = false;
    var result;
    for(let i=0; i < tabs.length; ++i){
      if(tabs[i].name === tabName) {
        found = true;
        // NOTE: In a real implementation, we would likely rely on a database or
        // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
        // treat Date.now() as unique-enough for our purposes.
        var newComment = {
          id: Date.now(),
          author: req.body.comment.author,
          text: req.body.comment.text,
          isCode: req.body.comment.isCode
        };
        tabs[i].comments.push(newComment);
        result = tabs[i].comments;
      }
    }
    if(!found){
      tempTab = {"id":Date.now(), "name":tabName, "comments":[comment]};
      tabs.push(tempTab);
      fs.writeFile(TABS_FILE, JSON.stringify(tabs, null, 4), function(err) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      res.json(tempTab.comments);
      });
    }
    fs.writeFile(TABS_FILE, JSON.stringify(tabs, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(result);
    });
  });
});

app.get('/api/tabs', function(req, res) {
  fs.readFile(TABS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/tabs', function(req, res) {
  fs.readFile(TABS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    let tabs = JSON.parse(data);
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    let newTab = {
      id: Date.now(),
      name: req.body.name,
      comments: []
    };
    tabs.push(newTab);
    fs.writeFile(TABS_FILE, JSON.stringify(tabs, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(tabs);
    });
  });
});


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
