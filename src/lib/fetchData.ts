function getFolder(path: string): string {
  const pathArray = path.split('/');
  pathArray.pop();
  return pathArray.join('/');
}

export default async function fetchData<ReturnType>(
  cacheKey: string,
  callableFunction: () => Promise<ReturnType>
) {
  if (process.env.NODE_ENV !== 'development') {
    return await callableFunction();
  }

  const fs = require('fs');

  const path = getFolder(cacheKey);
  if (!fs.existsSync(`api-cache/${path}`)) {
    fs.mkdirSync(`api-cache/${path}`, { recursive: true });
  }

  if (fs.existsSync(`api-cache/${cacheKey}.json`)) {
    return JSON.parse(fs.readFileSync(`api-cache/${cacheKey}.json`, 'utf8'));
  }

  const data = await callableFunction();

  fs.writeFileSync(`api-cache/${cacheKey}.json`, JSON.stringify(data));

  return data;
}
