import { apiKeyKey } from "./cookieKeys";
import { CookieService } from "./cookieService";

type EndpointData = {
  endpoint: string;
  method: "POST" | "GET" | "DELETE" | "PATCH";
};

export type NotesResponseType = {
  title: string;
  lesson: string;
  link: string;
  content: string;
  type: 1 | 2 | 3;
  id: number;
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
  endpoint: "/notes/",
  method: "GET",
};

export async function getNotes(login: string) {
  const res = await fetch(backendURL + getNotesEndpoint.endpoint + login, {
    method: getNotesEndpoint.method,
    headers: defaultHeaders,
  });

  return (await res.json()) as NotesResponseType[];
}

export const deleteNoteEndpoint: EndpointData = {
  endpoint: "/note/",
  method: "DELETE",
};

export async function deleteNote(id: number) {
  return await fetch(backendURL + deleteNoteEndpoint.endpoint + id, {
    method: deleteNoteEndpoint.method,
    headers: defaultHeaders,
  });
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
      headers: {
        ...defaultHeaders,
        Authorization: CookieService.getValue(apiKeyKey)!!!,
      },
    }
  );

  return (await res.json()) as ScheduleResponseType[];
}

type PatchScheduleParamsType = {
  period: number;
  day: number;
  time: number;
};

export const patchScheduleEndpoint: EndpointData = {
  endpoint: "/study",
  method: "PATCH",
};

export async function patchSchedule(
  params: PatchScheduleParamsType,
  apiKey: string,
  body: ScheduleResponseType
) {
  return await fetch(
    backendURL +
      patchScheduleEndpoint.endpoint +
      "?period=" +
      params.period +
      "&day=" +
      params.day +
      "&time=" +
      params.time,
    {
      method: patchScheduleEndpoint.method,
      headers: {
        ...defaultHeaders,
        Authorization: apiKey,
      },
      body: JSON.stringify(body),
    }
  );
}

export const deleteScheduleEndpoint: EndpointData = {
  endpoint: "/study",
  method: "DELETE",
};

export async function deleteSchedule(
  params: PatchScheduleParamsType,
  apiKey: string
) {
  return await fetch(
    backendURL +
      deleteScheduleEndpoint.endpoint +
      "?period=" +
      params.period +
      "&day=" +
      params.day +
      "&time=" +
      params.time,
    {
      method: deleteScheduleEndpoint.method,
      headers: {
        ...defaultHeaders,
        Authorization: apiKey,
      },
    }
  );
}

export const defaultHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};
