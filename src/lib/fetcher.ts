const fetcher = async<T>(url: string, headers = {}, method = "GET", values: any = {}): Promise<Response | T | null> => {
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
    console.log(response.body)
    return response

  } catch (e) {
    return null;
  }
};

export default fetcher;
