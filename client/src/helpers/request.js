const { REACT_APP_API_ENDPOINT } = process.env;

export const request = async (url, method = 'GET', body) => {
  return await fetch(`${REACT_APP_API_ENDPOINT}/${url}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(body)
  })
}