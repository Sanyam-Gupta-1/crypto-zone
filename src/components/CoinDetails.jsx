import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { server } from "../main.jsx";
import axios from "axios";
import {
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Image,
  Progress,
  Radio,
  RadioGroup,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import Loader from "./Loader.jsx";
import Chart from "./Chart.jsx";

const CoinDetails = () => {
  const param = useParams();
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);
  let currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "365d", "max"];

  const switchChartStats = (key) => {
    setDays(key);
    setLoading(true);
  };

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${param.id}`);
        const { data: chartData } = await axios.get(
          `${server}/coins/${param.id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        console.log(chartData.prices);
        setChartArray(chartData.prices);
        setCoin(data);
        setLoading(false);
      } catch {
        setLoading(false);
        setError(true);
      }
    };

    fetchCoins();
  }, [param.id, days]);

  if (error) return <Error msg={"Error while fetching Coin"} />;

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box w="full" borderWidth={1} height={{ base: "40vh", md: "60vh", lg: "100vh" }} width={'100%'}>
            <Chart arr={chartArray} currency={currencySymbol} days={days} />
          </Box>

          <HStack p="4" flexWrap={'wrap'}>
            {btns.map((i) => (
              <Button key={i} onClick={() => switchChartStats(i)}>
                {i}
              </Button>
            ))}
          </HStack>

          <RadioGroup value={currency} onChange={setCurrency} p={"2"}>
            <HStack spacing={"4"} justifyContent={"center"}>
              <Radio value="inr">INR</Radio>
              <Radio value="usd">USD</Radio>
              <Radio value="eur">EUR</Radio>
            </HStack>
          </RadioGroup>

          <VStack spacing={4} alignItems={"flex-start"} p={{ base: "5px", md: "10px", lg: "15px" }}>
            <Text alignSelf={"center"} opacity={0.7}>
              Last Updated On{" "}
              {Date(coin.market_data.last_updated).split("G")[0]}
            </Text>

            <Image src={coin.image.large} w="16" h="16" objectFit={"contain"} />

            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currencySymbol}
                {coin.market_data.current_price[currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    coin.market_data.price_change_percentage_24h_in_currency[
                      currency
                    ] > 0
                      ? "increase"
                      : "decrease"
                  }
                ></StatArrow>
                {
                  coin.market_data.price_change_percentage_24h_in_currency[
                    currency
                  ]
                }
              </StatHelpText>
            </Stat>

            <Badge fontSize={"2xl"}>{`#${coin.market_cap_rank}`}</Badge>

            <CustomBar
              high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
              low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
            />

            <Box w="full" p="4">
              <Item title={"Max Supply "} value={coin.market_data.max_supply} />
              <Item
                title={"Circulating Supply"}
                value={coin.market_data.circulating_supply}
              />
              <Item
                title={"Market Capital"}
                value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
              ></Item>
              <Item
                title={"All Time Low"}
                value={`${currencySymbol}${coin.market_data.atl[currency]}`}
              ></Item>
              <Item
                title={"All Time High"}
                value={`${currencySymbol}${coin.market_data.ath[currency]}`}
              ></Item>
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
};

const CustomBar = ({ high, low }) => {
  return (
    <VStack w="full">
      <Progress w="full" colorScheme="teal" value={50}></Progress>
      <HStack>
        <Badge colorScheme="red">{low}</Badge>
        <Text fontSize={"small"}>24H RANGE</Text>
        <Badge colorScheme="green">{high}</Badge>
      </HStack>
    </VStack>
  );
};

const Item = ({ title, value }) => {
  return (
    <HStack justifyContent={"space-between"} my=" 4" w="full">
      <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
        {title}
      </Text>
      <Text>{value}</Text>
    </HStack>
  );
};

export default CoinDetails;
