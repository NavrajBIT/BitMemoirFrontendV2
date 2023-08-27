const http = require("http");
const { exec } = require("child_process");
const { createHmac } = require("crypto");
const crypto = require("crypto");

const secretToken = "";

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/deployclient") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      // Verify the GitHub secret token
      const githubSignature = req.headers["x-hub-signature-256"];
      if (!validateSignature(githubSignature, body, secretToken)) {
        console.error("Invalid GitHub signature");
        res.statusCode = 403;
        res.end("Forbidden");
        return;
      }

      // Execute the deployment script when a POST request to /deploy is received
      exec(
        "sh /home/ec2-user/webhooks/client_deploy.sh",
        (error, stdout, stderr) => {
          if (error) {
            console.error(`Error: ${error}`);
            res.statusCode = 500;
            res.end("Internal Server Error");
          } else {
            console.log(`Deployment Output: ${stdout}`);
            res.statusCode = 200;
            res.end("Deployment Successful");
          }
        }
      );
    });
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
});

server.listen(4000, "127.0.0.1", () => {
  console.log("Deployment server listening on http://127.0.0.1:4000");
});

function validateSignature(signature, data, secret) {
  const computedSignature = `sha256=${crypto
    .createHmac("sha256", secret)
    .update(data)
    .digest("hex")}`;
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(computedSignature)
  );
}
