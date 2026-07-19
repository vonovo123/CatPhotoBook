import { ApiError } from './mockData';

const statusErrorMessages = [
  false,
  'Redirects Error',
  'Client Error',
  'Server Error',
] as const;

const getApiErrorStatusMessage = (status: number, name: string): string | false => {
  const errorType = [300, 400, 500, 600];
  for (let i = 0; i < errorType.length; i += 1) {
    const type = errorType[i];
    if (status < type) {
      if (type === 300) return false;
      return `API request error : ${statusErrorMessages[i]} with status code ${status} from ${name}`;
    }
  }
  return `API request error : Unknown with status code ${status} from ${name}`;
};

const fetchData = async <T = unknown>(url: string, name: string): Promise<T> => {
  const res = await fetch(url);
  const errorStatus = getApiErrorStatusMessage(res.status, name);
  if (errorStatus) {
    throw new ApiError(errorStatus, res.status);
  }
  return res.json() as Promise<T>;
};

export default fetchData;
