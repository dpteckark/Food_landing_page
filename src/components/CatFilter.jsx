import React from "react";
import { FaTag } from "react-icons/fa6";
import { initialProducts } from "../data/product";

const categories = [
  "All",
  ...new Set(initialProducts.map((item) => item.category)),
];

const CatFilter = ({ selectedCategory, setselectedCategory }) => {
  return (
    <>
      <div className="flex flex-wrap gap-3 border-b Oborder-gray-800 pb-6">
        <FaTag className="w-5 h-5 text-orange-500 mt-2 mr-2 hidden sm:block" />
        {categories.map((category, index) => {
          return (
            <button
              key={category}
              onClick={() => setselectedCategory(category)}
              className={`px-5 py-2 text-sm font-bold rounded-full transition duration-200 shadow-md ${
                selectedCategory === category
                  ? "bg-orange-600 text-white shadow-orange-800/50"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-orange-400 border border-gray-700 cursor-pointer"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default CatFilter;
