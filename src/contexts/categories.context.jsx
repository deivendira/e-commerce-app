import { createContext, useState, useEffect } from "react";
import SHOP_DATA from "../shop-data";
import { getcategoryAndDocument } from "../utils/firebase/firebase.utils.js";
export const CategoriesContext = createContext({
  categoriesMap: {},
});
export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setcategoriesMap] = useState({});

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getcategoryAndDocument();
      console.log(categoryMap);
      setcategoriesMap(categoryMap);
    };
    getCategoriesMap();
  }, []);

  console.log(categoriesMap);
  const value = { categoriesMap };
  console.log(SHOP_DATA);
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
