  import React, { useState, useEffect, startTransition } from "react";
  import { Box, Text, useNavigate, Grid } from "zmp-ui";
  import { Category } from "../type";
  import category_data from "../mock/categories.json";


  const CategoreisItem: React.FunctionComponent = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate();
    const [temp, setTemp] = useState(2);

    const headers = new Headers({
      'Authorization': 'Bearer 1|CVPgFpL9i1kYdzGUrz02ySMn76kBoseALxXHHDL713f60738',
      'apikey': '9cdfc6b4-2b4b-44b5-b427-b27c0dc32dfa',
      'apiconnection': 'appmobile',
      
    });

    const checkWidth = () => {
      if (window.innerWidth <= 299) {
        setTemp(1);
      } else {
        setTemp(2);
      }
    };

    useEffect(() => {
      checkWidth();
      const fetchCategories = async () => {
        try {
          const response = await fetch(
            'https://staging-shop.fado.vn/api/admin/categories?page[number]=1',
            {
              method: 'GET',
              headers: headers,
            }
            
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };
      

      fetchCategories();
    }, []);

    const searching = (data: string) => {
      startTransition(() =>
        navigate(`/search-results?query=${encodeURIComponent(data)}`)
      );
    };

    if (loading) {
      return <Text>Đang tải dữ liệu...</Text>;
    }

    return (
      <Box className="section-container-no-colors">
        <Grid columnSpace="0.4rem" columnCount={temp}>
          {categories.map((cate) => (
            <Box
              className="section-container-no-colors"
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
            </Box>
          ))}
        </Grid>
      </Box>
    );
  };

  export default CategoreisItem;
