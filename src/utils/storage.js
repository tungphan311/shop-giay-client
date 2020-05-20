export function setStorage(key, value) {
  localStorage.setItem(key, value);
}

export function getItemFromStorage(key) {
  return localStorage.getItem(key);
}
