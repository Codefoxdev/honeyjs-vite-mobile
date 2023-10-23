const ids = [];

export function deviceID() {
  const val = (Math.random() * 0.1).toString(36).substring(2);
  if (ids.includes(val)) return deviceID();
  ids.push(val);
  return val;
}