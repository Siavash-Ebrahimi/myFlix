const http = require('http');
const url = require('url');
const fs = require('fs');
let lonNum = 0;

// Creat a Server by using http module.
http.createServer((request, response) => {
  let addr = request.url;
  let q = url.parse(addr, true);
  let pathFile = '';

  lonNum += 1;

// Add any request URL that recived to the Server by using fs module.
  fs.appendFile('log.txt', lonNum + '- ' + 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n' + '------------------------------------------------------------------' + '\n\n', (err) => {
    if (err){
      console.log(err);
    } else {
      console.log('A new log added to log.txt');
    }
  });

// Check the client request (url) if it is matched with the argument in includs() function.
  if (q.pathname.includes('documentation')) {
    pathFile = (__dirname + '/documentation.html');
  } else {
    pathFile = 'index.html';
  }

  fs.readFile(pathFile,(err, data) => {
    if (err){
      throw err;
    }

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(data);
    response.end();

  });

}).listen(8080);
console.log("myFlix server is running on Port 8080 ...");
