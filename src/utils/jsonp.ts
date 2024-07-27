interface JsonpOptions {
  url: string;
  callbackParam?: string;
  timeout?: number;
}

export function jsonp(options: JsonpOptions): Promise<any> {
  const { url, callbackParam = 'callback', timeout = 5000 } = options;

  let timeoutId: NodeJS.Timeout;

  return new Promise((resolve, reject) => {
    const callbackName = `jsonp_${Date.now()}`;

    // Attach the callback function to the global object
    (window as any)[callbackName] = (responseData: any) => {
      clearTimeout(timeoutId);
      delete (window as any)[callbackName];
      document.body.removeChild(script);
      resolve(responseData);
    };

    // Create the script element and set its source
    const script = document.createElement('script');
    const fullUrl = `${url}${
      url.includes('?') ? '&' : '?'
    }${callbackParam}=${callbackName}`;

    script.src = fullUrl;
    document.body.appendChild(script);

    // Set up a timeout to handle errors
    timeoutId = setTimeout(() => {
      delete (window as any)[callbackName];
      document.body.removeChild(script);
      reject(new Error('JSONP request timed out'));
    }, timeout);
  });
}
