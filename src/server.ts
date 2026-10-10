import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const routes: Record<string, { file: string; contentType: string }> = {
  "/": { file: "index.html", contentType: "text/html; charset=utf-8" },
  "/styles.css": { file: "styles.css", contentType: "text/css; charset=utf-8" },
  "/client.js": { file: "dist/client.js", contentType: "text/javascript; charset=utf-8" },
  "/assets/forest.jpg": { file: "assets/forest.jpg", contentType: "image/jpeg" },
  "/assets/hippogriff-reference.jpg": { file: "assets/hippogriff-reference.jpg", contentType: "image/jpeg" },
  "/assets/niffler-reference.jpg": { file: "assets/niffler-reference.jpg", contentType: "image/jpeg" },
  "/assets/phoenix-reference.jpg": { file: "assets/phoenix-reference.jpg", contentType: "image/jpeg" },
  "/assets/forbidden-forest.jpg": { file: "assets/forbidden-forest.jpg", contentType: "image/jpeg" }
};

const server = createServer(async (request, response) => {
  const pathname = new URL(request.url ?? "/", "http://localhost").pathname;
  const route = routes[pathname];

  if (!route || request.method !== "GET") {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("No encontrado");
    return;
  }

  try {
    const content = await readFile(resolve(projectRoot, route.file));
    response.writeHead(200, {
      "Content-Type": route.contentType,
      "X-Content-Type-Options": "nosniff"
    });
    response.end(content);
  } catch {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("No se pudo cargar el recurso");
  }
});

const port = Number(process.env.PORT ?? 3000);
server.listen(port, "0.0.0.0", () => {
  console.log(`Mundo de criaturas mágicas disponible en http://localhost:${port}`);
});
