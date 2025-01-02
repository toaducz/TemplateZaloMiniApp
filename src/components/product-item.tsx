import React, { useState, useEffect } from "react";
import { Box, Text, useNavigate, Grid, Button, Icon, ZBox } from "zmp-ui";
import { Flower } from "../type";
import flowers_data from "../mock/flowers.json";


const ProductItem: React.FunctionComponent = () => {
  const [flowers] = useState<Flower[]>(flowers_data);
  const navigate = useNavigate();
  const [temp,setTemp] = useState(2)

  // lấy 6 item mới nhất
  const latestFlowers = flowers
    .slice() 
    .sort((a, b) => b.id - a.id) 
    .slice(0, 6); 

  const checkWidth = () => {
    if(window.innerWidth <= 299){
      setTemp(1);
    }else{
      setTemp(2);
    }
  };

  
  useEffect(() => {
        checkWidth();
  },[]) 
    
  return (
   
      <Box className="section-container-no-colors">
        <Grid columnSpace="1rem" columnCount={temp}  >
        {latestFlowers.map((flower) => (
        
          <Box className="section-container"
            key={flower.id}
            onClick={() => navigate(`/product/${flower.id}`)}
            style={{
              borderRadius: "8px",
              padding: "8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              style={{
                width: "9em",
                height: "9em",
                backgroundImage: `url(${flower.source})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "8px",
                marginBottom: "8px",
              }}
            ></Box>
            <Box>
                    <Text
                    size="normal"
                    bold
                    style={{
                        textAlign: "center",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        width: "100%",
                    }}
                    >
                    {flower.name}
                    </Text>
                </Box>
            <Grid columnCount={2} columnSpace="1rem" 
              style={{ 
                marginTop: "0.5rem",
                marginLeft: "0.2rem"
               }}
            >
                <Box
                  style={{ 
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                   }}
                >
                  {flower.price.toLocaleString() + "đ"}
                </Box>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "flex-end", 
                  }}
                >
                    <Button 
                        size="small" 
                        icon={<Icon icon="zi-plus-circle"/>}
                        // onClick={}
                        
                        >
                
                    </Button>
                </Box>
            </Grid>
          </Box>
        ))}
        </Grid>
      </Box>
  
  );
};

export default ProductItem;
