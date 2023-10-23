/**
 * @param {object} props
 * @param {string} props.icon
 * @param {string} props.label
 * @param {string} props.color
 * @param {React.CSSProperties} props.style
 */
export function IconButton({ icon, label, style }) {
  let element = "";
  if (label) element = <p>{label}</p>;

  return (
    <div
      className="IconButton"
      style={{
        display: "grid",
        placeItems: "center",
        cursor: "pointer",
        fontSize: ".85rem",
      }}>
      <span class="material-symbols-rounded" style={{ fontSize: "2rem" }}>
        {icon}
      </span>
      {element}
    </div>
  );
}
