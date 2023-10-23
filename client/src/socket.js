const wsProtocol = window.location.protocol == "http:" ? "ws" : "wss";
const wsURI = `${wsProtocol}://${window.location.host}/`;
const ws = new WebSocket(wsURI, 'vite-hmr');

console.log(ws);

ws.onopen = () => {
  console.log("open");
  ws.addEventListener("message", (ev) => {
    console.log(ev);
    // DO something with data
  });
}