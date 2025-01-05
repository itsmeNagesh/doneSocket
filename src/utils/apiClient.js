
export async function callApi({ url, method = 'GET', data = null, customHeaders = {} }) {
    try {
      const headers = { ...customHeaders };
      const options = {
        method,
        headers,
      };
  
      if (data) {
        headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
      }
  
      const response = await fetch(url, options);
      console.log("respose",response)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP Error: ${response.status}`);
      }
  
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  }
  