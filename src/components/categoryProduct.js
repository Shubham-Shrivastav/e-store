// import React, { useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import styled from 'styled-components';
// import { CartContext } from "../contexts/cartContext";

// const CategoryProduct = ({
//     id,
//     title,
//     image,
//     specs,
//     features,
//     price,
//     stock,
// }) => {
//     const navigate = useNavigate();
//     const { addProduct } = useContext(CartContext);

//     return (
//         <ProductInfoArticle>
//             <ProductTitle>
//                 <Link to={`/products/${id}`}>{title}</Link>
//             </ProductTitle>

//             <figure>
//                 <ProductImageContainer>
//                     <ProductImage src={`/assets/${image}`} alt={title} />
//                 </ProductImageContainer>
//             </figure>

//             <aside>
//                 <ProductInfo>
//                     <ProductInfoHeader>Dimensions</ProductInfoHeader>
//                     <label>{specs.dimensions}</label>
//                 </ProductInfo>

//                 {specs.capacity && (
//                     <ProductInfo>
//                         <ProductInfoHeader>Capacity</ProductInfoHeader>
//                         <label>{specs.capacity}</label>
//                     </ProductInfo>
//                 )}

//                 <ProductInfo>
//                     <ProductInfoHeader>Features</ProductInfoHeader>
//                     <ul>
//                         {features?.map((f, i) => {
//                             return <ProductInfoListItem key={`feature${i}`}>{f}</ProductInfoListItem>;
//                         })}
//                     </ul>
//                 </ProductInfo>
//             </aside>

//             <aside>
//                 <ProductInfoFinancePrice>
//                     &#x20b9; {price}
//                 </ProductInfoFinancePrice>

//                 <ProductInfoStock>
//                     <ProductInfoStockLabel>Stock Level: {stock}</ProductInfoStockLabel>
//                     <ProductInfoStockLabel>FREE Delivery</ProductInfoStockLabel>
//                 </ProductInfoStock>

//                 <ProductInfoAction>
//                     <ProductInfoActionButton onClick={() => navigate(`/products/${id}`)}>
//                         View Product
//                     </ProductInfoActionButton>
//                     <ProductInfoActionButton onClick={() => addProduct({ id, title, price })}>Add to Basket</ProductInfoActionButton>
//                 </ProductInfoAction>
//             </aside>
//         </ProductInfoArticle>
//     );
// };

// export default CategoryProduct;

// const ProductInfoArticle = styled.article`
//     display: grid;
//     grid-template-columns: 1fr 1fr 1fr;
//     grid-template-rows: 0.25fr 1fr 0.25fr;
//     column-gap: 20px;
// `;

// const ProductTitle = styled.div`
//         grid-column: 1 / span 3;
//         color: darkslategray;
//         font-weight: bold;
//         font-size: 1.5em;
//         padding-left: 10px;
//     `;

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

//_______________________________________________________________________________

import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { CartContext } from "../contexts/cartContext";

const CategoryProduct = ({
    id,
    title,
    image,
    specs,
    features,
    price,
    stock,
}) => {
    const navigate = useNavigate();
    const { addProduct } = useContext(CartContext);

    return (
        <Paper sx={{ p: 2, mb: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3} container alignItems="center" justifyContent="center">
                    <img src={`/assets/${image}`} alt={title} style={{ maxWidth: "100%", maxHeight: "150px" }} />
                </Grid>

                <Grid item xs={12} md={9} container direction="column">
                    <Grid item>
                        <Typography variant="h6" gutterBottom>
                            <Link to={`/products/${id}`}>{title}</Link>
                        </Typography>
                        <Typography variant="subtitle1">Dimensions: {specs.dimensions}</Typography>
                        {specs.capacity && (
                            <Typography variant="subtitle1">Capacity: {specs.capacity}</Typography>
                        )}
                        <Typography variant="subtitle1">Features:</Typography>
                        <ul>
                            {features?.map((f, i) => (
                                <li key={`feature${i}`}>
                                    <Typography>{f}</Typography>
                                </li>
                            ))}
                        </ul>
                    </Grid>
                    <Grid item container justifyContent="space-between" alignItems="center" mt={2}>
                        <Grid item>
                            <Typography variant="h6">&#x20b9; {price}</Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" onClick={() => navigate(`/products/${id}`)}>
                                View Product
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => addProduct({ id, title, price })}
                                sx={{ ml: 1 }}
                            >
                                Add to Basket
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item container justifyContent="space-between" alignItems="center" mt={2}>
                        <Grid item>
                            <Paper sx={{ p: 2 }} elevation={2}>
                                <Typography variant="subtitle1">Stock Level: {stock}</Typography>
                                <Typography variant="subtitle1">FREE Delivery</Typography>
                            </Paper>
                        </Grid>
                        <Grid item>
                            {/* Here you can add any other product-specific information if needed */}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default CategoryProduct;