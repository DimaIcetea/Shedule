type EndpointData = {
  endpoint: string;
  method: "POST" | "GET" | "DELETE" | "PATCH";
};

type NotesResponseType = {
  title: string;
  lesson: string;
  link: string;
  content: string;
  type: string;
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
  method: "POST",
};

export const getNotesEndpoint: EndpointData = {
  endpoint: "/note/notesByType",
  method: "GET",
};

export async function getNotes(type: 1 | 2 | 3) {
  const res = await fetch(
    backendURL + getNotesEndpoint.endpoint + `?title=${type}`,
    {
      method: getNotesEndpoint.method,
      headers: defaultHeaders,
    }
  );

  return (await res.json()) as NotesResponseType;
}

export const defaultHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};
