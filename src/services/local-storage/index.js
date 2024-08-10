export const persist = async (key, value) => {
  await localStorage.setItem(key, value);
};
export const fetch = (key) => {
  const item = localStorage.getItem(key);
  console.log(`${key}: ${item}`);
  return item;
};
export const remove = async (key) => {
  await localStorage.removeItem(key);
};
export const clear = async (key) => {
  localStorage.removeItem(key);
};
