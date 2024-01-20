import { Box, Spinner, VStack } from "@chakra-ui/react";
import React from "react";

const Loader = () => {
  return (
    <VStack h={"calc(100vh - 69px)"} justifyContent={"center"}>
      <Box transform={"scale(3)"}>
        <Spinner
          thickness="4px"
          speed="1s"  
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Box>
    </VStack>
  );
};

export default Loader;
