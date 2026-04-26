const BASE_URL = "https://fresse-api.onrender.com/api";

const getToken = () => localStorage.getItem("token");

export async function getBowls(typeId?: number) {
  const token = getToken();

  const url = typeId
    ? `${BASE_URL}/bowls?type_id=${typeId}`
    : `${BASE_URL}/bowls`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch bowls");
  }

  return res.json();
}


export async function getCategories(typeId?: number) {
  const token = getToken();

  const url = typeId
    ? `${BASE_URL}/categories?type_id=${typeId}`
    : `${BASE_URL}/categories`;

  const res = await fetch(url, {
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

  const res = await fetch(`${BASE_URL}/ingredients`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch ingredients");
  }

  return res.json();
}

export async function getBaseIngredients() {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/baseingredients`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch base ingredients");
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

export async function saveRecipe(token: string, recipeData: any) {
  const res = await fetch(`${BASE_URL}/recipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(recipeData),
  });

  if (!res.ok) {
    throw new Error("Failed to save recipe");
  }

  return await res.json();
}