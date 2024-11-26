const BASE_URL = "http://your-backend-url.com/api";

export const fetchItems = async () => {
  const response = await fetch(`${BASE_URL}/items`);
  return response.json();
};

export const uploadItems = async (data) => {
  const response = await fetch(`${BASE_URL}/items/upload`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const validateItem = async (item) => {
  const response = await fetch(`${BASE_URL}/items/validate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  return response.json();
};

// Add other API endpoints as needed
