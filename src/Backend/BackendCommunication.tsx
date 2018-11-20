import { baseUrl, charactersUri } from "../Utils/Constants";

const api = {
  post: (url: string, body?: string) => {
    return fetch(url, {
      method: "POST",
      credentials: "same-origin",
      body: body
    })
      .then(response => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(res => ({ statusCode: res[0], jsonData: res[1] }));
  },
  get: (url: string, body?: string) => {
    return fetch(url, {
      method: "GET",
      credentials: "same-origin",
      body: body
    })
      .then(response => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(res => ({ statusCode: res[0], jsonData: res[1] }));
  }
};

export function getAllCharacters() {
  const fullUrl = baseUrl + charactersUri;
  return api.get(fullUrl, undefined);
}
