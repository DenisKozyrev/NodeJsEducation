// server callback without express

// const fs = require('fs');

// const requestHandler = (req, res) => {
//   const url = req.url;
//   const method = req.method;

//   res.setHeader('Content-Type', 'text/html');

//   if (url === '/') {
//     res.write('<html><head><body><h1>Hello</h1>§</body></head></html>');
//     return res.end();
//   }

//   if (url === '/message' && method === 'POST') {

//     const body = [];

//     req.on('data', (chunk) => {
//       body.push(chunk);
//     });
    
//     return req.on('end', () => {
//       const parsedBody = Buffer.concat(body).toString();
//       const message = parsedBody.split('=')[1];
//       fs.writeFile('message.txt', message, (err) => {
//         console.log(err);
//         if (!err) {
//           res.statusCode = 302;
//           res.setHeader('Location', '/');
//           return res.end();
//         } else {
//           throw new Error(err);
//         }
//       });
//     })
//   }

//   res.write('<html><head><body><h1>Hello</h1></body></head></html>');
//   res.end();
// };

// module.exports = requestHandler;