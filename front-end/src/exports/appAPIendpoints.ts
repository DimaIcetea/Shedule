type EndpointData = {
  endpoint: string;
  method: "POST" | "GET" | "DELETE" | "PATCH";
};

export const backendURL = "http://127.0.0.1:8080";
export const registrationEndpoint: EndpointData = {
  endpoint: "/register",
  method: "POST",
};
export const loginEndpoint: EndpointData = {
  endpoint: "/login",
  method: "POST",
};

export const createNoteEndpoint: EndpointData = {
  endpoint: "/note",
  method: "POST"
}

export const defaultHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};
