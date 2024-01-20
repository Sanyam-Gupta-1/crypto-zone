import { VStack, Image, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const CoinCard = ({ data, currencySymbol }) => {
  const { id, name, image, symbol } = data;
  const price = data.current_price;
  console.log(id);
  return (
    <Link to={`/coins/${id}`}>
      <VStack
        bgColor={"whiteAlpha.100 "}
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
          {symbol}
        </Heading>
        <Text noOfLines={1}>{name}</Text>
        <Text noOfLines={1}>{`${currencySymbol}${price}`}</Text>
      </VStack>
    </Link>
  );
};

export default CoinCard;
