const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>DevOps Geek Zone</title>
    <style>
      body {
        margin: 0;
        font-family: "Courier New", monospace;
        background: #0f172a;
        color: #00ffcc;
      }

      header {
        background: #020617;
        padding: 20px;
        text-align: center;
        border-bottom: 1px solid #00ffcc;
      }

      header h1 {
        margin: 0;
        font-size: 2.5rem;
        text-shadow: 0 0 10px #00ffcc;
      }

      .container {
        padding: 30px;
      }

      .card {
        background: #020617;
        border: 1px solid #00ffcc;
        border-radius: 10px;
        padding: 20px;
        margin: 20px 0;
        box-shadow: 0 0 10px #00ffcc33;
      }

      .terminal {
        background: black;
        padding: 15px;
        border-radius: 8px;
        color: #00ff00;
        font-size: 14px;
      }

      .cursor {
        display: inline-block;
        width: 10px;
        background: #00ff00;
        animation: blink 1s infinite;
      }

      @keyframes blink {
        0%, 50%, 100% { opacity: 1; }
        25%, 75% { opacity: 0; }
      }

      .btn {
        padding: 10px 20px;
        background: #00ffcc;
        color: black;
        border: none;
        cursor: pointer;
        border-radius: 5px;
        font-weight: bold;
      }

      .btn:hover {
        background: #00ccaa;
      }

      footer {
        text-align: center;
        padding: 10px;
        border-top: 1px solid #00ffcc;
        margin-top: 30px;
      }
    </style>
  </head>
  <body>

    <header>
      <h1>⚡ DevOps Geek Zone ⚡</h1>
      <p>Automate. Scale. Dominate.</p>
    </header>

    <div class="container">

      <div class="card">
        <h2>👨‍💻 About Me</h2>
        <p>I love Kubernetes, CI/CD pipelines, Terraform, and breaking production (just to fix it better).</p>
      </div>

      <div class="card">
        <h2>🛠 Tech Stack</h2>
        <ul>
          <li>AWS | Docker | Kubernetes</li>
          <li>Terraform | GitHub Actions</li>
          <li>Node.js | Python</li>
        </ul>
      </div>

      <div class="card">
        <h2>💻 Terminal</h2>
        <div class="terminal">
          user@devops:~$ kubectl get pods <br/>
          NAME           STATUS    <br/>
          node-app       Running   <br/>
          db-service     Running   <br/>
          <br/>
          user@devops:~$ <span class="cursor"></span>
        </div>
      </div>

      <div class="card">
        <h2>🚀 Deploy Something</h2>
        <button class="btn" onclick="deploy()">Run CI/CD</button>
      </div>

    </div>

    <footer>
      ⚙️ Built with Node.js + Express | Stay Geeky ⚙️
    </footer>

    <script>
      function deploy() {
        alert("🚀 Deployment triggered! CI/CD pipeline running...");
      }
    </script>

  </body>
  </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
