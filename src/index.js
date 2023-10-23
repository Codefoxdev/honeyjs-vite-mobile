import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { initServer } from "./server/index.js";

const dir = resolve(dirname(fileURLToPath(import.meta.url)), "./client");

/**
 * @type {import("./types/index").default}
 */
export default function (_options = {}) {
  /** @type {import("vite").ResolvedConfig | null} */
  let config = null;
  let scripts = [];
  let options = _options;
  // Default values
  options.url ??= "__mobile";
  options.logging ??= true;
  options.shouldInject ??= true;
  options.regex ??= {};
  options.regex.script ??= /<script[\s\S]*?>[\s\S]*?<\/script>/gi;
  options.regex.src ??= /<script.{1,}?src="([a-z\.\/@]*)"/i;
  options.regex.query ??= /\/\/\s*@([a-z]*?)\s*(".*?")/i;

  return {
    name: "@honeyjs/vite-mobile",
    enforce: "pre",

    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },

    configureServer(server) {
      return () => {
        const path = formatUrl(options.url);
        const _print = server.printUrls;
        server.printUrls = () => {
          let host = `${config.server.https ? "https" : "http"}://localhost:${config.server.port ?? 80}`;
          _print();
          if (options.logging == false) return;
          console.log(`  \x1b[32m➜  \x1b[0mMobile:  \x1b[32m${host}${path}/\x1b[0m`);
        }

        server.middlewares.use((req, res, next) => {
          if (req.originalUrl.startsWith(path)) {
            const resolvedURL = req.originalUrl.replace(path, ".");
            const [src, filepath] = getStatic(resolvedURL);
            const contentType = getHeader(filepath);
            if (contentType) res.setHeader("Content-Type", contentType);
            res.end(src);
          } else next();
        });

        initServer(server, options);
      }
    },
    // TODO: Determine entry point of project
    transformIndexHtml(src) {
      if (options.shouldInject == false) return;
      const matches = execAll(src, options.scriptRegex);
      matches.forEach(e => scripts.push(options.srcRegex.exec(e[0])));
    },

    transform(src, id) {
      if (options.shouldInject == false) {
        const matches = options.regex.query.exec(src);
        if (!matches) return;
        return {
          code: src.replace(options.regex.query, `import "@honeyjs/vite-mobile/client";`)
        }
      }
      // TODO: Inject if main module
    }
  }
}

/** @param {string} url */
function formatUrl(url) {
  const start = url.startsWith("/") ? url : `/${url}`;
  return start.endsWith("/") ? start.substring(0, start.length - 2) : start;
}

function execAll(src, regex) {
  const matches = [];
  let m;
  while ((m = regex.exec(src)) !== null) matches.push(m);
  return matches;
}

function getStatic(url) {
  if (url == "./") url = "./index.html";
  const resolvedPath = resolve(dir, url)
  const isStatic = existsSync(resolvedPath);
  if (!isStatic) return;
  return [readFileSync(resolvedPath, "utf-8"), resolvedPath];
}

function getHeader(path) {
  if (path.match(/\.(tsx|ts|jsx|js)$/)) return "text/javascript";
  if (path.match(/\.(svg)$/)) return "image/svg+xml";
  if (path.match(/\.(css)$/)) return "text/css";
  if (path.match(/\.(png)$/)) return "image/png";
  if (path.match(/\.(jpg|jpeg)$/)) return "image/jpeg";
}