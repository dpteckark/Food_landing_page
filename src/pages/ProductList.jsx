import React, { useContext, useState } from "react";
import SearchFilter from "../components/SearchFilter";
import CatFilter from "../components/CatFilter";
import { CartContext } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

const ProductList = () => {
  const { products } = useContext(CartContext);
  const [searchTerm, setsearchTerm] = useState("");
  const [selectedCategory, setselectedCategory] = useState("All");

  const filterProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  //   console.log(products);

  return (
    <>
      <div className="container mx-auto px-4 md:px-8 pt-8">
        <SearchFilter searchTerm={searchTerm} setsearchTerm={setsearchTerm} />
        <CatFilter
          selectedCategory={selectedCategory}
          setselectedCategory={setselectedCategory}
        />
        <h2 className="text-2xl font-extrabold mx-auto px-4 md:px-4 pt-4">
          Featured Gear ({products.length} Items)
        </h2>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-center items-center">
          {filterProducts.map((product, index) => {
            return <ProductCard key={index} product={product} />;
          })}
        </div>
      </div>
    </>
  );
};

export default ProductList;
