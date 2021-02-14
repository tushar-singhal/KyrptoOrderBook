const domain = 'https://my-json-server.typicode.com/tushar-singhal/testdata/';

export const getListingAPI = async () => {
  const url = domain + 'listings';
  const response = await fetch(url);
  const responseJson = await response.json();
  if (responseJson.errors && responseJson.errors.length > 0) {
    throw new Error(responseJson.errors[0].message ? responseJson.errors[0].message : 'Error');
  }
  return responseJson;
};
