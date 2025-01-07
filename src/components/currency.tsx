import React, { useState, useContext, useEffect,createContext } from "react";
import { Switch } from "zmp-ui";

export const CurrencyContext = React.createContext<any>(1);

const Currency: React.FunctionComponent = () => {
    const [currencies,setCurrencies] = useState<any>();
    const [temp,setTemp] = useState<any>();
    const [exchangeRate, setExchangeRate] = useState<any>()

    const fado = "https://staging-shop.fado.vn/"

    const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 1|CVPgFpL9i1kYdzGUrz02ySMn76kBoseALxXHHDL713f60738',
        'apikey': '9cdfc6b4-2b4b-44b5-b427-b27c0dc32dfa',
        'apiconnection': 'appmobile',

    });

    useEffect(() => {
        const fetchCurrency = async () => {
            try {
                const response = await fetch(
                    '/api/admin/currencies',
                    {
                        method: 'GET',  
                        headers: headers,
                    }

                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                // data.data.map(cate => {
                //   console.log(cate.descriptions[0].title)
                // })

                setTemp([...data.data]);
                if (data.data && data.data.length > 1) {
                    setCurrencies(data.data[1]); 
                    setExchangeRate(data.data[1].exchange_rate)
                }

                // console.log(currencies)

            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };


        fetchCurrency();
    }, []);

    const changeCurrency = () => {
        if(currencies.id === 2){
            setCurrencies(temp[0])
            setExchangeRate(temp[0].exchange_rate)
        }else{
            setCurrencies(temp[1])
            setExchangeRate(temp[1].exchange_rate)
        }
        
    
    };
    useEffect(() => {
        console.log("Exchange rate in Currency:", exchangeRate);
      }, [exchangeRate]);



    return (
        <CurrencyContext.Provider value={{ exchangeRate }}> 
            <Switch onChange={changeCurrency}></Switch>
        </CurrencyContext.Provider>
    )
};

export default Currency;