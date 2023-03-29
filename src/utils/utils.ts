
/**
 *  sessionStorage对象
 */
export const SessionStorage = {
  setKey(obj:any) {
    for (const name in obj) {
        if (name) {
            window.sessionStorage.setItem(name, obj[name]);
        }
    }
  },
  getKey(name:string) {
    return window.sessionStorage.getItem(name);
  },
  remove(name:string) {
    window.sessionStorage.removeItem(name);
  },
  clear() {
    window.sessionStorage.clear();
    },
};
