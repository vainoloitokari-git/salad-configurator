const BASE_URL = "https://fresse-api.onrender.com/api";

const getToken = () => localStorage.getItem("token");

export async function getBowls() {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/bowls`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch bowls");
  }

  return res.json();
}

export async function getCategories() {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/Categories`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}

export async function getIngredients() {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/Ingredients`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Ingredients");
  }

  return res.json();
}

export async function login(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Invalid credentials");
  }

  return res.json();
}

export async function getPrices(token: string) {
  const res = await fetch(`${BASE_URL}/prices`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch prices");
  }

  return res.json();
}
