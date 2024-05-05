import { Button, HStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <HStack p={"4"} shadow={"base"} bgColor={"blackAlpha.800"}>
      <HStack>
      <Button variant={"unstyled"} color={"white"}>
        <Link to={"/"}>Home</Link>
      </Button>
      <Button variant={"unstyled"} color={"white"}>
        <Link to={"/coin"}>Coin</Link>
      </Button>
      <Button variant={"unstyled"} color={"white"}>
        <Link to={"/exchanges"}>Exchanges</Link>
      </Button>
      </HStack>
      <Button variant={"unstyled"} color={"white"}>
        
      </Button>
    </HStack>
  );
}

export default Header;
