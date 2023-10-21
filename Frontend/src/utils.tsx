export function saveToLocalStorage(key: string, value: any): void {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Error saving to local storage:", error);
  }
}

export function getFromLocalStorage(key: string): any | null {
  try {
    const serializedValue = localStorage.getItem(key);

    if (serializedValue === null) {
      return null;
    }

    return JSON.parse(serializedValue);
  } catch (error) {
    console.error("Error retrieving from local storage:", error);
    return null;
  }
}

export const postData = async (apiUrl: string, dataToSend: any)  => {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      return data
    } catch (err) {
        throw err
    }
  };

  
export async function fetchData(url: string): Promise<any> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error for the caller to handle, if needed
  }
}
