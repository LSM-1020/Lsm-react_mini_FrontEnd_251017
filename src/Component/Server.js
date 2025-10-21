// server.js
import express from "express";
import bodyParser from "body-parser";
import { VM } from "vm2";
import { exec } from "child_process";
import fs from "fs";

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

// JS 코드 실행
app.post("/api/run-js", (req, res) => {
  const { code } = req.body;
  const vm = new VM({ timeout: 1000, sandbox: {} });

  try {
    const output = vm.run(code);
    res.json({ success: true, output: String(output) });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

// Java 코드 실행
app.post("/api/run-java", async (req, res) => {
  const { code } = req.body;

  // Main.java로 저장
  fs.writeFileSync("Main.java", code);

  exec("javac Main.java && java Main", (err, stdout, stderr) => {
    if (err) {
      res.json({ success: false, error: stderr });
    } else {
      res.json({ success: true, output: stdout });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Code runner server running on http://localhost:${PORT}`);
});
