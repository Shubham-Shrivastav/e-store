// import React, { useContext, useState, useEffect } from "react";
// import styled from "styled-components";
// import { useNavigate, Link } from "react-router-dom";
// import { CartContext } from "../contexts/cartContext";
// import { TrashIcon, UpIcon, DownIcon } from "./icons";
// import { formatNumber } from "../utils";

// const Basket = () => {
//     const [cartItems, setCartItems] = useState([]);
//     const navigate = useNavigate();
//     const { getCartItems, removeProduct, increaseQuantity, decreaseQuantity, clearBasket } = useContext(CartContext);

//     useEffect(() => {
//         setCartItems(getCartItems());
//     }, [getCartItems]);

//     const renderCart = () => {
//         if (cartItems.length > 0) {
//             return cartItems.map((p) => (
//                 <React.Fragment key={p.id}>
//                     <div>
//                         <Link to={`/products/${p.id}`}>{p.title}</Link>
//                     </div>
//                     <BasketQty>
//                         {p.quantity}

//                             <UpIcon width={20} onClick={() => setCartItems(increaseQuantity({id: p.id}))}></UpIcon>
//                             <DownIcon width={20} onClick={() => setCartItems(decreaseQuantity({id: p.id}))}></DownIcon>
//                             <TrashIcon
//                                 width={20}
//                                 onClick={() => setCartItems(removeProduct({ id: p.id }))}
//                             ></TrashIcon>

//                     </BasketQty>
//                     <BasketPrice>{formatNumber(p.price)}</BasketPrice>
//                 </React.Fragment>
//             ));
//         } else {
//             return <div>The basket is currently empty</div>;
//         }
//     };

//     const renderTotal = () => {
//         const cartItems = getCartItems();
//         const total = cartItems.reduce(
//             (total, item) => (total += item.price * item.quantity),
//             0
//         );
//         return total;
//     };

//     return (
//         <BasketContainer>
//             <BasketTitle>Shopping Basket</BasketTitle>
//             <BasketButton onClick={() => navigate("/checkout")}>Checkout</BasketButton>

//             <BasketTable>
//                 <BasketHeader>
//                     <h4>Item</h4>
//                     <h4>Quantity</h4>
//                     <h4>Price</h4>
//                 </BasketHeader>
//                 <BasketHeaderLine />
//                 <BasketHeader>{renderCart()}</BasketHeader>
//                 <BasketHeaderLine />
//             </BasketTable>

//           <BasketButton onClick={() => setCartItems(clearBasket())}>Clear</BasketButton>
//             <BasketTotal>Total: {formatNumber(renderTotal())}</BasketTotal>
//         </BasketContainer>
//     );
// };

// export default Basket;

// const BasketContainer = styled.div`
//     display: grid;
//     padding: 20px;
//     grid-template-rows: 0.25fr 1fr 0.25fr;
//     grid-template-columns: 0.1fr 1fr 0.1fr;
// `;

// const BasketTable = styled.div`
//     grid-column: 1 / span 3;

//     grid-template-rows: 0.25fr 1fr 0.25fr 0.25fr;
//     column-gap: 20px;
//     padding-left: 10px;
// `;

// const BasketHeader = styled.div`
//     display: grid;
//     grid-template-columns: 1fr 0.5fr 0.5fr;
// `;

// const BasketHeaderLine = styled.hr`
//     margin-bottom: 20px;
//     border: 1px solid gray;
// `;

// const BasketTitle = styled.h2`
//   grid-column: 1 / span 2;
//   padding-bottom: 20px;
// `;

// const BasketQty = styled.h3`
//     font-size: 18px;
//     font-weight: bold;
//     display: grid;
//     grid-template-columns: 0.1fr 0.05fr 0.1fr 0.1fr;
// `;

// const BasketPrice = styled.h3`
//     font-size: 20px;
//     font-weight: bold;
// `;

// const BasketTotal = styled.h2`
//     justify-self: end;
// `;

// const BasketButton = styled.button`
//   border-radius: 8px;
//   height: 40px;
// `;

import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/cartContext";
import { formatNumber } from "../utils";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Paper, Card, CardContent, CardActions } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Box from "@mui/material/Box";

const Basket = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();
    const { getCartItems, removeProduct, increaseQuantity, decreaseQuantity, clearBasket } = useContext(CartContext);

    useEffect(() => {
        setCartItems(getCartItems());
    }, [getCartItems]);

    const handleIncreaseQuantity = (product) => {
        setCartItems(increaseQuantity({ id: product.id }));
    };

    const handleDecreaseQuantity = (product) => {
        setCartItems(decreaseQuantity({ id: product.id }));
    };

    const handleRemoveProduct = (product) => {
        setCartItems(removeProduct({ id: product.id }));
    };

    const renderCart = () => {
        if (cartItems.length > 0) {
            return cartItems.map((p) => (
                <Card key={p.id} sx={{ mb: 2 }}>
                    <CardContent sx={{ display: "flex", alignItems: "center" }}>
                        <Link to={`/products/${p.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                            {p.title}
                        </Link>
                        <Box sx={{ ml: "auto" }}>
                            <IconButton onClick={() => handleIncreaseQuantity(p)}>
                                <AddIcon />
                            </IconButton>
                            <Typography component="span">{p.quantity}</Typography>
                            <IconButton onClick={() => handleDecreaseQuantity(p)}>
                                <RemoveIcon />
                            </IconButton>
                            <IconButton onClick={() => handleRemoveProduct(p)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                        <Typography sx={{ ml: 2 }}>{formatNumber(p.price)}</Typography>
                    </CardContent>
                </Card>
            ));
        } else {
            return <div>The basket is currently empty</div>;
        }
    };

    const renderTotal = () => {
        const total = cartItems.reduce((total, item) => (total += item.price * item.quantity), 0);
        return total;
    };

    return (
        <Grid container spacing={2} direction="column">
            {/* <Typography variant="h4">Shopping Basket</Typography> */}


            <CardContent>
                <Grid container direction="column" spacing={2}>
                    <Grid container item justifyContent="space-between">
                        <Typography variant="h5">Item</Typography>
                        <Typography variant="h5">Quantity</Typography>
                        <Typography variant="h5">Price</Typography>
                    </Grid>
                    <hr style={{ margin: "10px 0", border: "1px solid gray" }} />
                    <Grid item container direction="column">
                        {renderCart()}
                    </Grid>
                </Grid>
            </CardContent>

            <Typography variant="h4" align="end" sx={{ mt: 2 }}>
                Total: {formatNumber(renderTotal())}
            </Typography>
            <CardActions>
                <Button variant="contained" size="medium" onClick={() => navigate("/checkout")}>
                    Checkout
                </Button>
                <Button variant="contained" size="medium" onClick={() => setCartItems(clearBasket())}>
                    Clear
                </Button>
            </CardActions>
        </Grid>
    );
};

export default Basket;
