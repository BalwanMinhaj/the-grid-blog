// You can use different API_KEYS if one is not working or the limit is exceeded

// const API_KEY = "07fba3c9b9d04030a6b9edbbdcf481ab";
const API_KEY = "dc8ecd9027954486a7b08ee484827974";
// const API_KEY = "81117ab89cda4ee28593cc2864305b7b";

// This function will fetch the Top Headlines from the API
export async function fetchTH() {
  try {
    const res = await fetch(
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=" + API_KEY
    );
    if (!res.ok) {
      return "Error fetching data";
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return "Error fetching data";
  }
}

// This function fetch data based on the category
export async function fetchCategoryNews(category, page = 1, pageSize = 10) {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`
    );
    if (!res.ok) {
      throw new Error("Error fetching data");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// This function is for searching the API and getting the results
export async function fetchSearchResults(query, page = 1, pageSize = 10) {
  const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
    query
  )}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    return [];
  }
}
