import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../fetcher";
import CategoryProduct from "./categoryProduct";
import { Paper } from '@mui/material';

// import axios from 'axios';

const Category = () => {
    const [products, setProducts] = useState({
        errorMessage: "",
        data: [],
    });
    const { categoryId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const responseObject = await getProducts(categoryId);
            // const response = await axios.get(`/products?catId=${categoryId}`); // Use Axios
            setProducts(responseObject);
        };
        fetchData();
    }, [categoryId]);

    const renderProducts = () => {
        return products.data.map((p) => (
            <CategoryProduct key={p.id} {...p}>
                {p.title}
            </CategoryProduct>
        ));
    };

    return (
        <div>
            {products.errorMessage && <div>Error: {products.errorMessage}</div>}

            {products.data && renderProducts()}
        </div>
    );
};

export default Category;