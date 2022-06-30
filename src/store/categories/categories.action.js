import CATEGORIES_ACTION_TYPES from "./categories.types";
import { createAction } from "../../utils/reducer/reducer.utilis";
//import { getcategoryAndDocument } from "../../utils/firebase/firebase.utils";

export const fetchCategoryStart = () =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategorySuccess = (categories) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories);

export const fetchCategoryfail = (error) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

// export const fetchCategoryAsync = () => async (dispatch) => {
//   dispatch(fetchCategoryStart());

//   try {
//     const categoriesArray = await getcategoryAndDocument();
//     dispatch(fetchCategorySuccess(categoriesArray));
//   } catch (error) {
//     dispatch(fetchCategoryfail(error));
//   }
// };
