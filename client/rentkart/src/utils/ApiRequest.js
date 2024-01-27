export const requestApi = async (method, path, body) => {
  try {
  const authToken = sessionStorage.getItem('user');
  const myHeaders = new Headers();
  if(authToken)
  myHeaders.append('Authorization', `Bearer ${JSON.parse(authToken)}`);
  myHeaders.append('Content-Type', 'application/json');
  const requestOptions = {
    method, headers: myHeaders,
  }
  if(body) {
  requestOptions.body = JSON.stringify(body);
  }

  const data =	await fetch(`http://localhost:3001/${path}`, requestOptions)
  const response = {
    data: await data.json(),
    status: data.status,
    error: data.error,
  }
		return response;
} catch(error) {
  return error;
}}
