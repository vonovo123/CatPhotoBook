/* eslint-disable no-plusplus */
const statusErrorMessages = [
  false,
  'Redirects Error',
  'Client Error',
  'Server Error',
];
const getApiErrorStatusMessage = (status, name) => {
  const errorType = [300, 400, 500, 600];
  for (let i = 0; i < errorType.length; i++) {
    const type = errorType[i];
    if (status < type) {
      if (type === 300) return false;
    }
  }
  return `API request error : ${statusErrorMessages[i]} with status code ${status} from ${name}`;
};
const fetchData = async (url, name) => {
  const res = await fetch(`${url}`);
  const errorStatus = getApiErrorStatusMessage(res.status, name);
  if (errorStatus) {
    throw Error(errorStatus);
  }
  return res.json();
};

export default fetchData;
