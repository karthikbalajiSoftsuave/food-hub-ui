import BaseService from "./base.service";
import { APIENDPOINTS } from "../utils/endpoints";
import { IReviews } from "../interface/review.interface";

export const addReview = async (review: IReviews) => {
  try {
    const { data } = await BaseService.post(APIENDPOINTS.REVIEWS.CREATE, review);
    return data;
  } catch (err) {
    throw err;
  }
};

export const getReview = async (id: string) => {
  try {
    const { data } = await BaseService.get(APIENDPOINTS.REVIEWS.GET(id));
    return data;
  } catch (err) {
    throw err;
  }
};

export const updateReview = async (id: string, payload: IReviews) => {
  try {
    const res = await BaseService.put(APIENDPOINTS.REVIEWS.GET(id), payload);
    return res;
  } catch (err) {
    throw err;
  }
};

export const deleteReview = async (id: string) => {
  try {
    const res = await BaseService.put(APIENDPOINTS.REVIEWS.GET(id));
    return res;
  } catch (err) {
    throw err;
  }
};