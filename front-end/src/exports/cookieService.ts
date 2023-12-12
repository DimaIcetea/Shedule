type JSONtype = {
  [x: string]: string;
};

export class CookieService {
  static getValue(key: string) {
    const json: JSONtype = JSON.parse(document.cookie);
    return json[key];
  }

  static setValue(key: string, value: string) {
    const json: JSONtype = JSON.parse(document.cookie);
    json[key] = value;
    document.cookie = JSON.stringify(json);
  }

  static clear() {
    document.cookie = ""; 
  }
}

function parseCookie() {
    
}