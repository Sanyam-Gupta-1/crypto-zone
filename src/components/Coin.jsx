import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../main";
import { Button, Container, HStack, Radio, RadioGroup } from "@chakra-ui/react";
import Loader from "./Loader";
import Error from "./Error";
import CoinCard from "./CoinCard";
const Coin = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [page, setPage] = useState(1);

  let currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        setLoading(false);
      } catch {
        setLoading(false);
        setError(true);
      }
    };

    fetchCoins();
  }, [page , currency]);

  const prevPage = () => {
    setPage(prevPage => prevPage - 1);
    setLoading(true);
  }

  const nextPage = () => {
    setPage(prevPage => prevPage + 1);
    setLoading(true);
  }

  if (error) return <Error msg={"Error while fetching Data"} />;
  
  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
        <RadioGroup value={currency} onChange={(setCurrency)} p={'2'}>
          <HStack spacing={'4'} justifyContent={'center'}>
            <Radio value="inr">INR</Radio>
            <Radio value="usd">USD</Radio>
            <Radio value="eur">EUR</Radio>
          </HStack>
        </RadioGroup>
          <HStack wrap="wrap" marginTop={"2"} justifyContent={"center"}>
            {coins.map((i) => (
              <CoinCard
                key={i.id}
                data={i}
                currencySymbol={currencySymbol}
              ></CoinCard>
            ))}
          </HStack >
          <HStack justifyContent={'space-between'} marginBottom={'5'}>
            <Button colorScheme={'teal'} onClick={prevPage}>Prev</Button>
            <Button colorScheme={'teal'}  onClick={nextPage}>Next</Button>
          </HStack>
        </>
      )}
    </Container>
  );
};
export default Coin;
