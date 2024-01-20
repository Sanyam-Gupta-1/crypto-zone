import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../main";
import {
  Container,
  HStack,
  VStack,
  Image,
  Heading,
  Text,
} from "@chakra-ui/react";
import Loader from "./Loader";
import Error from "./Error";

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {

    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        console.log(data);
        setExchanges(data);
        setLoading(false);
      } catch {
        setLoading(false);
        setError(true);
      }
    };

    fetchExchanges();
  }, []);

  if (error) return <Error msg={'Error while fetching Data'}/>
  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <HStack wrap="wrap" marginTop={"2"} justifyContent={"center"}>
          {exchanges.map((i) => (
            <ExchangeCard key={i.id} data={i}></ExchangeCard>
          ))}
        </HStack>
      )}
    </Container>
  );
};

const ExchangeCard = ({ data }) => {
  const { name, url, image } = data;
  const rank = data.trust_score_rank;
  return (
    <a href={url} target="blank">
      <VStack bgColor={'whiteAlpha.100 '}
        w="52"
        shadow={"lg"}
        p="8"
        borderRadius={"lg"}
        m="6"
        transition={"all 0.3s"}
        css={{
          "&:hover": { transform: "scale(1.2)" },
        }}
      >
        <Image
          src={image}
          h="10"
          w={"10"}
          objectFit={"contain"}
          alt="Exchange"
        ></Image>
        <Heading size={"md"} noOfLines={1}>
          {rank}
        </Heading>
        <Text noOfLines={1}>{name}</Text>
      </VStack>
    </a>
  );
};

export default Exchanges;
