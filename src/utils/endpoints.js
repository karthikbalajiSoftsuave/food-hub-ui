export const APIENDPOINTS = {
  AUTH: {
    LOGIN: "login",
    REGISTER: "signup",
  },
  RECIPES: {
    CREATE: "recipe",
    GET: (id) => {
      return `recipe?page=${id}`;
    },
    EDIT: (id) => {
      return `recipe?id=${id}`;
    },
    DELETE: (id) => {
      return `recipe?id=${id}`;
    },
  },
};

export const UI_ENDPOINTS = {
  AUTH: "/auth",
  APP: "/app",
  RECIPES_LIST: "/app/recipes",
  CREATE_RECIPE: "/app/create-recipe",
};
