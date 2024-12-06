// /src/api/auth.js

export const loginUser = async (email, password) => {
  const response = await fetch("http://your-api-endpoint.com/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Failed to login");
  }
  
  return await response.json();
};
