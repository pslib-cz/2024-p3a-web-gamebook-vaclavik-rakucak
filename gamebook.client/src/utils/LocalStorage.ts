export const saveDataToLocalStorage = (key: string, data: unknown): void => {
  localStorage.setItem(key, JSON.stringify(data));
};
 
export const getDataFromLocalStorage = <T>(key: string): T | null => {
  const data = localStorage.getItem(key);
  return data ? (JSON.parse(data) as T) : null;
};