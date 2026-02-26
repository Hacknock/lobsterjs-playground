import { createServer } from "http";
import { readFile } from "fs/promises";
import { extname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const PORT = 3000;

const mime = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".md": "text/plain; charset=utf-8",
};

createServer(async (req, res) => {
  const filePath = join(__dirname, req.url === "/" ? "index.html" : req.url);
  try {
    const data = await readFile(filePath);
    res.writeHead(200, { "Content-Type": mime[extname(filePath)] ?? "application/octet-stream" });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
}).listen(PORT, () => console.log(`http://localhost:${PORT}`));
