const fetcher = async(url: string, headers = {}, method = "GET", values: any = {}): Promise<Response | null> => {
  if(!values) values = null
  try {
    const response = await fetch(url, {
  method,
  headers: {
    ...headers,
    "Content-Type": "application/json",
  },
      credentials: "include",
  body: JSON.stringify(values)
    });
    return response

  } catch (e) {
    return null;
  }
};

export default fetcher;
