import React, { useState, useEffect,startTransition } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Page, Box, Text, Button, Stack, Center } from "zmp-ui";
import { Flower } from "../type";
import flowers_data from "../mock/flowers.json";
import Header_product from "../header/product-header";

const ProductDetail: React.FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [cart, setCart] = useState<Flower[]>([]);
  const [flowers] = useState<Flower[]>(flowers_data);
  const product = flowers_data.find((flower) => flower.id === Number(id));

  if (!product) {
    return <Text>Lỗi</Text>;
  }

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

  const addToCart = () => {
    setCart((prev) => {
      const updatedCart = [...prev, product];
      return updatedCart;
    });
    startTransition(() => navigate("/cart"));
  };

  const checkAvailable = () => {
    if (product.available === true) {
      return "Còn hàng";
    }
    return "Hết hàng";
  };

  return (
    <Page hideScrollbar={true}>
      <Header_product title={product.name} />
      <Page className="page">
        <Stack>
          <Center className="section-container-product-detail">
            <Box
              className="section-container"
              style={{
                width: "20rem",
                height: "20em",
                backgroundImage: `url(${product.source})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "8px",
                marginBottom: "8px",
              }}
            ></Box>
          </Center>
          <Stack className="section-container-product-detail" space="1rem">
            <Text size="xLarge" bold>
              {product.name}
            </Text>
            <Text size="normal" color="primary">
              {product.price.toLocaleString() + "đ"}
            </Text>
          </Stack>
          <Box className="section-container-product-detail">
            <Button onClick={addToCart} fullWidth>
              Thêm vào giỏ hàng
            </Button>
          </Box>
        </Stack>

        <Stack>
          <Box className="section-container-product-detail">
            <Text size="normal">Trạng thái còn hàng: {checkAvailable()}</Text>
            <Text size="normal">Danh mục: {product.category}</Text>
          </Box>
        </Stack>
      </Page>
    </Page>
  );
};

export default ProductDetail;
