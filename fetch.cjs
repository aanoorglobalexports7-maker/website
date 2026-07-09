const https = require('https');

https.get('https://shipyon.in/', (resp) => {
  let data = '';
  resp.on('data', (chunk) => { data += chunk; });
  resp.on('end', () => {
    const regex = /href="([^"]+\.css[^"]*)"/gi;
    let match;
    while ((match = regex.exec(data)) !== null) {
      console.log(match[1]);
    }
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
