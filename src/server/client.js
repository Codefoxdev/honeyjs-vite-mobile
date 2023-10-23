import { deviceID } from "./helper.js";

export class Client {
  #options;
  #ws;

  /**
   * @param {import("vite").WebSocketClient} client 
   * @param {import("../types/index.d.ts").Options} options
   */
  constructor(data, client, options) {
    this.id = deviceID();
    this.userAgent = data.userAgent;
    this.timestamp = data.timestamp;

    this.#ws = client;
    this.#options = options;

    if (options.logging == "verbose") console.log("[vite-mobile]", `Client (id: ${this.id}) connected`);

    this.#ws.socket.on("close", () => this.close());
  }
  /**
   * @param {string} event 
   * @param {any} data 
   */
  send(event, data) {
    this.#ws.send(event, data ?? null);
  }

  close() {
    if (this.#options.logging == "verbose") console.log("[vite-mobile]", `Client (id: ${this.id}) disconnected`);
  }
}