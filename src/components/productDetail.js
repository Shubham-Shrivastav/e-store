// import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import styled from "styled-components";
// import { CartContext } from "../contexts/cartContext";
// import { getProductById } from "../fetcher";

// const ProductDetail = () => {
//     const { addProduct } = useContext(CartContext);;
//     const [product, setProduct] = useState({
//         errorMessage: "",
//         data: {},
//     });
//     const { productId } = useParams();

//     useEffect(() => {
//         const fetchData = async () => {
//             const responseObject = await getProductById(productId);
//             setProduct(responseObject);
//         };
//         fetchData();
//     }, [productId]);

//     const createMarkup = () => {
//         return { __html: product.data?.description };
//     };

//     return (
//         <ProductInfoArticle>
//             <ProductTitle>{product.data.title}</ProductTitle>

//             <figure>
//                 <ProductImageContainer>
//                     <ProductImage
//                         src={`/assets/${product.data.image}`}
//                         alt={product.data.title}
//                     />
//                 </ProductImageContainer>
//             </figure>

//             <aside>
//                 <ProductInfo>
//                     <ProductInfoHeader>Dimensions</ProductInfoHeader>
//                     <label>{product.data.specs?.dimensions}</label>
//                 </ProductInfo>

//                 {product.data.specs?.capacity && (
//                     <ProductInfo>
//                         <ProductInfoHeader>Capacity</ProductInfoHeader>
//                         <label>{product.data.specs?.capacity}</label>
//                     </ProductInfo>
//                 )}

//                 <ProductInfo>
//                     <ProductInfoHeader>Features</ProductInfoHeader>
//                     <ul>
//                         {product.data.features?.map((f, i) => {
//                             return (
//                                 <ProductInfoListItem key={`feature${i}`}>
//                                     {f}
//                                 </ProductInfoListItem>
//                             );
//                         })}
//                     </ul>
//                 </ProductInfo>
//             </aside>

//             <aside>
//                 <ProductInfoFinancePrice>
//                     &#x20b9; {product.data.price}
//                 </ProductInfoFinancePrice>

//                 <ProductInfoStock>
//                     <ProductInfoStockLabel>
//                         Stock Level: {product.data.stock}
//                     </ProductInfoStockLabel>
//                     <ProductInfoStockLabel>FREE Delivery</ProductInfoStockLabel>
//                 </ProductInfoStock>

//                 <ProductInfoAction>
//                     <ProductInfoActionButton
//                         onClick={() =>
//                             addProduct({
//                                 id: product.data.id,
//                                 title: product.data.title,
//                                 price: product.data.price,
//                             })
//                         }
//                     >
//                         Add to Basket
//                     </ProductInfoActionButton>
//                 </ProductInfoAction>
//             </aside>

//             <ProductInfoDescription
//                 dangerouslySetInnerHTML={createMarkup()}
//             ></ProductInfoDescription>
//         </ProductInfoArticle>
//     );
// };

// export default ProductDetail;

// const ProductInfoArticle = styled.article`
//     display: grid;
//     grid-template-columns: 1fr 1fr 1fr;
//     grid-template-rows: 0.25fr 1fr 0.25fr;
//     column-gap: 20px;
// `;

// const ProductInfoDescription = styled.div`
//     grid-column: 1 / span 3;
// `;

// const ProductTitle = styled.div`
//     grid-column: 1 / span 3;
//     color: darkslategray;
//     font-weight: bold;
//     font-size: 1.5em;
//     padding-left: 10px;
// `;

// const ProductImageContainer = styled.div`
//     padding: 10px;
//     width: 60%;
// `;

// const ProductImage = styled.img`
//     width: 100%;
//     height: 100%;
// `;

// const ProductInfo = styled.div`
//     display: flex;
//     flex-direction: column;
// `;

// const ProductInfoHeader = styled.h3`
//     color: darkslategray;
//     font-size: 1em;
//     font-weight: bold;
//     padding-top: 10px;
//     padding-bottom: 5px;
// `;

// const ProductInfoListItem = styled.li`
//     padding-top: 5px;
// `;

// const ProductInfoStock = styled.div`
//     padding-left: 10px;
//     margin-top: 20px;
//     padding-top: 10px;
//     background-color: lightgrey;
//     height: 20%;
//     width: 30%;
//     border-radius: 5px;
//     font-weight: bold;
//     display: flex;
//     flex-direction: column;
// `;

// const ProductInfoStockLabel = styled.label`
//     padding-bottom: 5px;
// `;

// const ProductInfoAction = styled.div`
//     display: flex;
//     flex-direction: column;
// `;

// const ProductInfoActionButton = styled.button`
//     width: 160px;
//     height: 30px;
//     border-radius: 10px;
//     margin-top: 20px;
//     background-color: lightgray;
//     border: solid 1px slategrey;
//     font-weight: bold;
// `;

// const ProductInfoFinancePrice = styled.div`
//     color: darkslategray;
//     font-size: 2em;
//     font-weight: bold;
//     padding-top: 10px;
// `;

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../contexts/cartContext";
import { getProductById } from "../fetcher";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const ProductDetail = () => {
    const { addProduct } = useContext(CartContext);
    const [product, setProduct] = useState({
        errorMessage: "",
        data: {},
    });
    const { productId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const responseObject = await getProductById(productId);
            setProduct(responseObject);
        };
        fetchData();
    }, [productId]);

    const createMarkup = () => {
        return { __html: product.data?.description };
    };

    const handleAddToBasket = () => {
        addProduct({ id: product.data.id, title: product.data.title, price: product.data.price });
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4" gutterBottom>
                    {product.data.title}
                </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
                <img src={`/assets/${product.data.image}`} alt={product.data.title} style={{ width: "100%", height: "auto" }} />
            </Grid>

            <Grid item xs={12} md={6}>
                {product.data.specs?.dimensions && (
                    <React.Fragment>
                        <Typography variant="h6" gutterBottom>
                            Dimensions
                        </Typography>
                        <Typography>{product.data.specs?.dimensions}</Typography>
                    </React.Fragment>
                )}

                {product.data.specs?.capacity && (
                    <React.Fragment>
                        <Typography variant="h6" gutterBottom>
                            Capacity
                        </Typography>
                        <Typography>{product.data.specs?.capacity}</Typography>
                    </React.Fragment>
                )}

                {product.data.features?.length > 0 && (
                    <React.Fragment>
                        <Typography variant="h6" gutterBottom>
                            Features
                        </Typography>
                        <ul>
                            {product.data.features.map((f, i) => (
                                <li key={`feature${i}`}>
                                    <Typography>{f}</Typography>
                                </li>
                            ))}
                        </ul>
                    </React.Fragment>
                )}
            </Grid>

            <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                    &#x20b9; {product.data.price}
                </Typography>

                <div>
                    <Typography variant="subtitle1">Stock Level: {product.data.stock}</Typography>
                    <Typography variant="subtitle1">FREE Delivery</Typography>
                </div>

                <div>
                    <Button variant="outlined" onClick={handleAddToBasket}>
                        Add to Basket
                    </Button>
                </div>
            </Grid>

            <Grid item xs={12}>
                <div dangerouslySetInnerHTML={createMarkup()} style={{ marginTop: "20px" }} />
            </Grid>
        </Grid>
    );
};

export default ProductDetail;