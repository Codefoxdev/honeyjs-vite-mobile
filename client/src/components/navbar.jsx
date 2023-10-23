import "../css/navbar.css";
import { createSignal, createEffect, createRef } from "@honeyjs/core";
import { A } from "./router";

import Logo from "../assets/favicon.svg";
import { IconButton } from "./buttons";

export default function () {
  return (
    <nav style={{
      height: "5rem",
      width: "100vw",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "1rem",
    }}>
      <div className="left">
        <A href="/" style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Logo />
        </A>
      </div>
      <div className="right links">
        <A href="/devices" className="link">Devices</A>
      </div>
    </nav>
  )
}