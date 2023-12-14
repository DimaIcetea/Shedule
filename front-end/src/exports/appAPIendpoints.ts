type EndpointData = {
  endpoint: string;
  method: "POST" | "GET" | "DELETE" | "PATCH";
};

export type NotesResponseType = {
  title: string;
  lesson: string;
  link: string;
  content: string;
  type: string;
};

export type ScheduleResponseType = {
  lesson: string;
  teacher: string;
  period: number;
  link: string;
  group: string;
  time: number;
  day: number;
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
  const res = await fetch(backendURL + getNotesEndpoint.endpoint + `?type=1`, {
    method: getNotesEndpoint.method,
    headers: defaultHeaders,
  });

  return (await res.json()) as NotesResponseType[];
}

export const getScheduleEndpoint: EndpointData = {
  endpoint: "/study/lessonsByGroup",
  method: "GET",
};

export async function getSchedule(group: string) {
  const res = await fetch(
    backendURL + getScheduleEndpoint.endpoint + `?group=${group}`,
    {
      method: getScheduleEndpoint.method,
      headers: defaultHeaders,
    }
  );

  return (await res.json()) as ScheduleResponseType[];
}

export const patchScheduleEndpoint: EndpointData = {
  endpoint: "/study/",
  method: "PATCH",
};

export async function patchSchedule(id: number, apiKey: string) {
  const res = await fetch(backendURL + patchScheduleEndpoint.endpoint + id, {
    method: patchScheduleEndpoint.method,
    headers: {
      ...defaultHeaders,
      Authorization: apiKey,
    },
  });

  return (await res.json()) as any;
}

export const postScheduleEndpoint: EndpointData = {
  endpoint: "/study",
  method: "POST",
}

export const defaultHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};
