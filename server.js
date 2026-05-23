const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();

app.use(cors());

app.get("/api/stream", (req, res) => {

  const q = req.query.q;

  if (!q) {
    return res.json({
      error: "Query required",
    });
  }

  exec(
    `yt-dlp --default-search ytsearch -f bestaudio -g "${q}"`,
    (err, stdout, stderr) => {

      if (err) {
        console.log(stderr);

        return res.json({
          error: "Failed to get audio",
        });
      }

      res.json({
        stream: stdout.trim(),
      });

    }
  );
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});
