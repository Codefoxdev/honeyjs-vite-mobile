import { createSignal, createEffect } from "@honeyjs/core";

const [path, setPath] = createSignal(window.location.hash.replace("#", ""));
const paths = [];

const base = window.location.pathname.endsWith("/") ? window.location.pathname : `${window.location.pathname}/`;

export function Router(props) {
  return (
    <div className="__Router" style={{
      minHeight: "calc(100vh - 5rem)"
    }}>
      {props.children}
    </div>
  );
}

/**
 * @param {object} props 
 * @param {string} props.path
 * @param {Function | HTMLElement} props.component
 * @param {boolean} props.default
 */
export function Route(props) {
  if (props.default) paths.unshift({
    path: props.path,
    component: props.component
  });
  else paths.push({
    path: props.path,
    component: props.component
  });

  return (
    <div className="__Route" style={{
      display: () => path() == props.path ? "unset" : "none",
      width: "100%",
      height: "100%"
    }} data-path={props.path}>
      {props.component}
    </div>
  );
}

/**
 * @param {object} props
 * @param {string} props.href
 * @param {string} props.className
 * @param {object} props.style
 */
export function A(props) {
  return <a href={props.href} onClick={(e) => {
    e.preventDefault();
    setPath(props.href);
    history.pushState({}, "", `${base}#${props.href}`);
  }} style={props.style ?? ""} className={props.className ?? ""}>{props.children}</a>
}