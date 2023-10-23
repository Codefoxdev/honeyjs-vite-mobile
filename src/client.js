// @honeyjs/vite-mobile/client
// The script to be imported on the (mobile) devices that you want to inspect

import "./assets/overlay.css";

import Logo from "../client/src/assets/favicon.svg";

(function () {
  if (!import.meta.hot) return;

  let client = {};
  console.log(`[vite-mobile] Registering...`)

  import.meta.hot.send("honeyjs-vite-mobile:connect", {
    userAgent: navigator.userAgent,
    timestamp: Date.now()
  })

  import.meta.hot.on("honeyjs-vite-mobile:deviceid", (data) => {
    client.id = data.id;
    client.timestamp = data.timestamp;
    console.log(`[vite-mobile] Registered device with id: ${client.id}`);
    injectOverlay(client);
  });

  import.meta.hot.on("honeyjs-vite-mobile:identify", () => {
    const overlay = document.querySelector(".__honey_mobile_overlay");
    overlay.classList.remove("hidden");
  });
})()

function injectOverlay(data) {
  if (document.querySelector(".__honey_mobile_overlay")) {
    document.body.removeChild(document.querySelector(".__honey_mobile_overlay"));
  }

  const overlay = document.createElement("div");
  overlay.className = "__honey_mobile_overlay hidden";
  document.body.appendChild(overlay);

  overlay.appendChild(Logo());

  overlay.innerHTML += /*html*/`
    <h1>Identify</h1>
    <p>This is a test called by <code>@honeyjs/vite-mobile</code> to identify a certain device, here is some relevant info for this device</p>
    <div class="list">
      <span>
        Device ID: <code>${data.id}</code>
      </span>
      <span>
        Device lifespan: <code>${Date.now() - data.timestamp}</code>
      </span>
      <span>
        User Agent: <code>${navigator.userAgent}</code>
      </span>
    </div>
    <div class="button" id="__honey_mobile_overlay_button">
      Click to hide this overlay
    </div>
  `;

  document.querySelector("#__honey_mobile_overlay_button")
    ?.addEventListener("click", () => {
      overlay.classList.toggle("hidden");
    })
}