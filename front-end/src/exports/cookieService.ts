export class CookieService {
  static getValue(key: string) {
    const cookieCopy = document.cookie; //key=value;
    const map = parseCookie(cookieCopy);
    return map.get(key);
  }

  static setValue(key: string, value: string) {
    document.cookie = `${key}=${value};Max-Age=${Date.now() + 34560000000}`     
  }

  static removeValue(key: string) {}

  static clear() {
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
  }
}

function parseCookie(cookie: string) {
  const map = new Map<string, string>();
  const keyValuePairs = cookie.split("; ").map((val) => val.split("="));
  keyValuePairs.forEach((val) => {
    map.set(val[0], val[1]);
  });
  return map;
}