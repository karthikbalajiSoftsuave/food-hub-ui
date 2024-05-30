import BaseService from "./base.service";
import { APIENDPOINTS } from "../utils/endpoints";
import { TRecipe } from "../interface/recipes.interface";

export const getRecipes = async (page: number, body?: any) => {
  try {
    const { data } = await BaseService.post(APIENDPOINTS.RECIPES.GET(page), body);
    return data;
  } catch (err) {
    throw err;
  }
};

export const getRecipesById = async (id: string) => {
  try {
    const { data } = await BaseService.get(APIENDPOINTS.RECIPES.GET_RECIPES_BY_ID(id));
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
    const res = await BaseService.delete(APIENDPOINTS.RECIPES.GET_RECIPES_BY_ID(id));
    return res;
  } catch (err) {
    throw err;
  }
};

export const searchRecipes = async (id: string) => {
  try {
    const res = await BaseService.get(APIENDPOINTS.RECIPES.SEARCH_RECIPES(id));
    return res;
  } catch (err) {
    throw err;
  }
};