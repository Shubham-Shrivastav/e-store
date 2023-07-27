import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/cartContext";
import { formatNumber } from "../utils";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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
        <Box sx={{ maxWidth: "600px", mx: "auto" }}>
            <Typography variant="h4" sx={{ mt: 2 }}>Shopping Basket</Typography>
            <Card sx={{ mt: 2 }}>
                <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography variant="h5">Item</Typography>
                        <Typography variant="h5">Quantity</Typography>
                        <Typography variant="h5">Price</Typography>
                    </Box>
                    <hr style={{ margin: "10px 0", border: "1px solid gray" }} />
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        {renderCart()}
                    </Box>
                </CardContent>
                <CardActions>
                    <Button variant="contained" size="medium" onClick={() => navigate("/checkout")}>
                        Checkout
                    </Button>
                    <Button variant="contained" size="medium" onClick={() => setCartItems(clearBasket())}>
                        Clear
                    </Button>
                </CardActions>
            </Card>
            <Typography variant="h4" sx={{ mt: 2 }} align="end">
                Total: {formatNumber(renderTotal())}
            </Typography>
        </Box>
    );
};

export default Basket;
