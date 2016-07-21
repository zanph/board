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
const BOARDS_FILE    = path.join(__dirname, 'boards.json');

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
  *  This API endpoint is used to get the comments for a given board
  */
  //retrieve the board name from the URL query
  const boardName = req.query.boardName;
  console.log(boardName);
  var boards;
  fs.readFile(BOARDS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    //parse boards from the BOARDS_FILE
    boards = JSON.parse(data);
    console.log(JSON.stringify(boards));
    //look for the board by name
    let found = false;
    for(let i=0; i < boards.length; ++i) {
      console.log(boards[i].name);
      if(boards[i].name === boardName) {
        found = true;
        console.log(boards[i].comments);
        //if we found the board, return its comments
        res.json(boards[i].comments);
      }
    }
  });
});

app.post('/api/comments', function(req, res) {
  let boards;
  const boardName = req.body.boardName;
  fs.readFile(BOARDS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    boards = JSON.parse(data);
    let found = false;
    var result;
    for(let i=0; i < boards.length; ++i){
      if(boards[i].name === boardName) {
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
        boards[i].comments.push(newComment);
        result = boards[i].comments;
      }
    }
    if(!found){
      tempBoard = {"id":Date.now(), "name":boardName, "comments":[newComment]};
      boards.push(tempBoard);
      fs.writeFile(BOARDS_FILE, JSON.stringify(boards, null, 4), function(err) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      res.json(tempBoard.comments);
      });
    }
    fs.writeFile(BOARDS_FILE, JSON.stringify(boards, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(result);
    });
  });
});

app.post('/api/board/new', function(req, res) {
  const board = req.body.board;
  console.log('new board request: ' + board);
  fs.readFile(BOARDS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    
    let boards = JSON.parse(data);
    for(let i = 0; i < boards.length; ++i) {
      if(boards[i].name === board) {
        return res.status(500).send('BOARD_EXISTS');
      }
    }
    let newBoard = {
      id: Date.now(),
      name: board,
      comments: []
    };
    boards.push(newBoard);
    fs.writeFile(BOARDS_FILE, JSON.stringify(boards, null, 4), function(err) { 
      /*write to file*/
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(boards);
    });
  });

});

app.get('/api/board', function(req,res) {
  const board = req.query.board;
  //return an error if no board is provided
  if(!board) {
    res.status(500);
    res.write('no board provided!');
  }
  else{
    fs.readFile(BOARDS_FILE, function(err, data) {
      //return an error if the file couldn't be read
      if (err) {
        console.error(err);
        res.status(500).json({error:'file error'});
      }
      else {
        //if we find the board, return its data
        var found = false;
        for(let i = 0; i < data.length; ++i) {
          if(data[i].name === board) {
            res.json(data[i]);
            found = true;
            break;
          }
          if(!found) {
            //return an error if we didn't find the board
            res.status(404);
          }
        }
      }
    });
  }
});


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
