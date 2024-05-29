import BaseService from "./base.service";
import { APIENDPOINTS } from "../utils/endpoints";
import { TRecipe } from "../interface/recipes.interface";

export const getRecipes = async (page: number) => {
  try {
    const { data } = await BaseService.get(APIENDPOINTS.RECIPES.GET(page));
    return data;
  } catch (err) {
    throw err;
  }
};

export const createRecipes = async (payload: TRecipe) => {
  try {
    const res = await BaseService.post(APIENDPOINTS.RECIPES.CREATE, payload);
    return res;
  } catch (err) {
    throw err;
  }
};

export const editRecipes = async (id: string, payload: TRecipe) => {
  try {
    const res = await BaseService.put(APIENDPOINTS.RECIPES.EDIT(id), payload);
    return res;
  } catch (err) {
    throw err;
  }
};

export const deleteRecipes = async (id: string) => {
  try {
    const res = await BaseService.delete(APIENDPOINTS.RECIPES.DELETE(id));
    return res;
  } catch (err) {
    throw err;
  }
};
