import { Button, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <HStack p="6" bgColor={"blackAlpha.900"}>
      <Button variant={"link"} color={"white"}>
        <Link to={"/"}>Home</Link>
      </Button>
      <Button variant={"link"} color={"white"}>
        <Link to={"/exchanges"}>Exchanges</Link>
      </Button>
      <Button variant={"link"} color={"white"}>
        <Link to={"/coins"}>Coins</Link>
      </Button>
    </HStack>
  );
};

export default Header;
