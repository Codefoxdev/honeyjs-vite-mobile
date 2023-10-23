import { Client } from "./client.js";

const clients = [];

/**
 * @param {import("vite").ViteDevServer} server 
 * @param {import("../types/index.d.ts").Options} options
 */
export function initServer(server, options) {
  server.ws.on("honeyjs-vite-mobile:connect", (data, ws) => {
    const client = new Client(data, ws, options);
    clients.push(client);
    client.send("honeyjs-vite-mobile:deviceid", client);
  });

  setTimeout(() => {
    server.ws.send("honeyjs-vite-mobile:global");
  }, 10000);
}