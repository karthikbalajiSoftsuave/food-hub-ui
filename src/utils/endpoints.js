export const APIENDPOINTS = {
  AUTH: {
    LOGIN: "login",
    REGISTER: "signup",
  },
  RECIPES: {
    CREATE: "recipe",
    GET: "recipe",
    EDIT: (id) => {
      return `recipe?id=${id}`;
    },
    DELETE: (id) => {
      return `recipe?id=${id}`;
    },
  },
};
