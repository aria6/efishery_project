type Option = {
  requestInit?: RequestInit;
  query?: ObjectKey;
  body?: ObjectKey;
};

let fetchAPI = async (path: string, option: Option = {}) => {
  let { requestInit, body } = option;
  let response = await fetch(path, {
    ...requestInit,
    body: body && JSON.stringify(body),
  });

  if (!response.ok) {
    // TODO : hanlde error
  }

  if (response.headers.get('Content-Type')?.includes('application/json')) {
    return response.json();
  }

  return response;
};

export default fetchAPI;
