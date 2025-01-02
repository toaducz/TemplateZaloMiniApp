import React, {useState, useEffect} from "react";
import {Button, Sheet, Switch, Box, Text, Stack, Center} from "zmp-ui";
import { getLocation,getAccessToken } from "zmp-sdk/apis";
import axios from 'axios'

const Location: React.FunctionComponent = () => {
    const [location, setLocation] = useState(false);
    const [sheetVisible, setSheetVisible] = useState(false);
    const [popupVisible,setPopupVisible] = useState(false);
    const storedLocation = localStorage.getItem("location");
    
    useEffect(() => {
        if (storedLocation) {
          setLocation(storedLocation === "true");
        }
      }, []);

    const handleSwitchChange = (value:boolean) => {
        if(value && storedLocation === "false"){
            setSheetVisible(true);
        }else{
            setLocation(false);   
            localStorage.setItem("location", "false"); 
        }
         
    };
    
    var temp //secret key

    const allowLocation =  () => {
        
        try{
            getLocation({
                success: async  (data) => {
                    let { token } = data;
                    console.log("Received token:", token);

                    setLocation(true);
                    localStorage.setItem("location", "true");
                    
                    const accessToken = await getAccessToken({});
                    console.log("Access token:", accessToken);

                    const endpoint = "https://graph.zalo.me/v2.0/me/info";
                    temp = "5t0n3c2oQmmUTpCCQhbj1HHvDW9deML3Kpz08YE8TKaKALmS7fH2M2ik6JDOcqPLVHj1Aq6zR55g9ZymTOGsDGCXQJKils150HX25mYfO6mzF7in3hzGDIeYQ7vRct0XP2WeNbIn61f-Qa5YMQXz86SMVK58q20IVnSCStI03WvG4oPIBgegC2LeSN9NrbCp9rP1JGpI7n4ZNaTL9CzS2YKA3beHnJiCCqCLPJxpC69EGnGvJ-8xMK9RPqLfnb8-NbDMRYsLMJiqEm970laZ02X62biutp1IEqq53mtlM4a0QtuzBV5_TG4rPoi0b7qt5n9wImESMHGX3K1VBOuP1om9E5elXpeq7nuyPpYB6YGE5JTvVe0j9NL6zcenPQXf3W"
                    const userAccessToken = accessToken; // Cập nhật token hợp lệ
                    const secretKey = "SnDf7NUV6vXRHv5RO7j4"; // Cập nhật secret key hợp lệ

                    const options = {
                        headers: {
                        access_token: userAccessToken,
                        code: token,
                        secret_key: secretKey,
                        },
                    };
                    try {
                        const response = await axios.get(endpoint, options);
                        console.log("User Info:", response.data);
                        setLocation(true);
                        localStorage.setItem("location", "true");
                      } catch (error) {
                        console.error("Error fetching location info:", error);
                        alert("Không thể truy xuất thông tin vị trí.");
                      }
                },
                fail: (error) => {
                    console.log(error);
                }
            },
        )}
        catch(error){
            console.error("Unexpected error:", error); 
        }finally{
            setSheetVisible(false);
        }  
    }

    const denyLocation = () => {
        setLocation(false);
        setSheetVisible(false);
        localStorage.setItem("location", "false");
    }

    // const print =() => {
    //     return(
    //         console.log(temp)
    //     )
    // }

    return(
        <div>
            <Switch 
                checked={location}
                onChange={handleSwitchChange}
            >

            </Switch>
            <Sheet
                visible = {sheetVisible}
                onClose={() => setSheetVisible(false)}
                autoHeight
            >
                <Box my = {4}>
                    <Text.Title>
                        Location Allow?
                    </Text.Title>
                </Box>
                <Box my = {4}>
                    Cho phép chúng tôi sử dụng vị trí để bla bla...
                </Box>
                <Box flex flexDirection="row" my = {2}>
                    <Center gutters="2rem">
                        <Stack space="1rem">
                            <Box >
                                <Button
                                    fullWidth
                                    variant="secondary"
                                    onClick={denyLocation}
                                >
                                    Để sau
                                </Button>
                            </Box>
                            <Box>
                                <Button
                                    fullWidth
                                    onClick={
                                        allowLocation                                
                                    }
                                >
                                    Cho phép
                                </Button>
                            </Box>
                        </Stack>
                    </Center>
                </Box>

            </Sheet>
        </div>
    );
}

export default Location;