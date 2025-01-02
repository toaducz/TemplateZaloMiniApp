import React, { useState, useEffect,startTransition } from "react";
import { Box, Text, useNavigate, Grid, Button, Icon, ZBox } from "zmp-ui";
import { Category } from "../type";
import category_data from "../mock/categories.json";


const CategoreisItem: React.FunctionComponent = () => {
  const [categories] = useState<Category[]>(category_data);
  const navigate = useNavigate();
  const [temp,setTemp] = useState(2);

  const latestCategories = category_data
    .slice() 
    .sort((a, b) => a.title.localeCompare(b.title)) 

  const checkWidth = () => {
    if(window.innerWidth <= 299){
      setTemp(1);
    }else{
      setTemp(2);
    }
  };

  useEffect(() => {
    checkWidth();
  });

  const searching = (data:string) =>{
      startTransition(() => navigate(`/search-results?query=${encodeURIComponent(data)}`))
  };
    
  return (
   
      <Box className="section-container-no-colors">
        <Grid columnSpace="0.4rem" columnCount={temp} >
        {latestCategories.map((cate) => (
        
          <Box className="section-container-no-colors"
            key={cate.id}
            onClick={() => searching(cate.title)}
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
                backgroundImage: `url(${cate.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "100px",
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
                    {cate.title}
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
                
                </Box>
            </Grid>
          </Box>
        ))}
        </Grid>
      </Box>
  
  );
};

export default CategoreisItem;
