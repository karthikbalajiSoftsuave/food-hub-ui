export const APIENDPOINTS = {
  AUTH: {
    LOGIN: "login",
    REGISTER: "signup",
  },
  RECIPES: {
    CREATE: "recipe",
    GET: (id) => {
      return `recipes?page=${id}`;
    },
    EDIT: (id) => {
      return `recipe/${id}`;
    },
    DELETE: (id) => {
      return `recipe?id=${id}`;
    },
    GET_RECIPES_BY_ID: (id) => {
      return `recipe/${id}`;
    },
    SEARCH_RECIPES: (search) => {
      return `search/${search}`;
    },
  },
  REVIEWS: {
    CREATE: "reviews",
    GET: (id) => {
      return `reviews/${id}`;
    },
  },
};

export const UI_ENDPOINTS = {
  AUTH: "/auth",
  APP: "/app",
  RECIPES_LIST: "/app/recipes",
  CREATE_RECIPE: "/app/create-recipe",
  EDIT_RECIPE: "/app/edit-recipe/:id",
  VIEW_RECIPE: "/app/view-recipe/:id",
  NAVIGATE_EDIT_RECIPE: (id) => {
    return `/app/edit-recipe/${id}`;
  },
  NAVIGATE_VIEW_RECIPE: (id) => {
    return `/app/view-recipe/${id}`;
  },
};
