import { Box, Image, Text } from "@chakra-ui/react";
import btc from "../assets/btc.png";
import { motion } from "framer-motion";
const Home = () => {
  return (
    <Box bgColor={"blackAlpha.900"} w="full" h="95vh">
      <motion.div
        style={{ height: "85vh" }}
        animate={{ translateY: "-20px" }}
        transition={{ repeat: Infinity, duration: 2, repeatType : 'reverse' }}
      >
        <Image w="full" h="full" src={btc} objectFit={"contain"} filter={'grayScale(1)'}></Image>
      </motion.div>
      <Text
        fontSize={"6xl"}
        color={"white"}
        marginTop={"-65px"}
        textAlign={"center"}
        fontFamily={"Bebas Neue"}
        letterSpacing={"widest"}
      >
        CRYPTO ZONE
      </Text>
    </Box>
  );
};

export default Home;
