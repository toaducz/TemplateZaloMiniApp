import React, { useState, useEffect } from "react";
import { Box, Text, Button, Grid, Icon } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { Flower } from "../type";

const Cart: React.FunctionComponent = () => {
  const [cart, setCart] = useState<Flower[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const removeFromCart = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart"); 
  };

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <Box className="cart-container">
      <Text size="xLarge" bold>
        Giỏ hàng
      </Text>
      {cart.length === 0 ? (
        <Text>Giỏ hàng của bạn hiện tại chưa có sản phẩm nào.</Text>
      ) : (
        <>
          <Grid columnCount={1} columnSpace="1rem">
            {cart.map((item) => (
              <Box key={item.id} style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
                <Grid columnCount={2} columnSpace="1rem">
                  <Box style={{ flex: 1 }}>
                    <Text>{item.name}</Text>
                    <Text>{item.price.toLocaleString()}đ</Text>
                  </Box>
                  <Box style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      size="small"
                      onClick={() => removeFromCart(item.id)} 
                    >
                      Xoá
                    </Button>
                  </Box>
                </Grid>
              </Box>
            ))}
          </Grid>
          <Box style={{ marginTop: "16px", textAlign: "center" }}>
            <Text size="large" bold>
              Tổng cộng: {totalPrice.toLocaleString()}đ
            </Text>
          </Box>
          <Box style={{ marginTop: "16px" }}>
            <Button onClick={() => navigate("/checkout")} fullWidth>
              Tiến hành thanh toán
            </Button>
            <Button onClick={clearCart} fullWidth style={{ marginTop: "8px" }}>
              Xoá tất cả
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Cart;
