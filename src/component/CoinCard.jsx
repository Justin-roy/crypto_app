import { Heading, Image, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const  CoinCard = ({ id, name, image, symbol, price, currSym }) => (
    <Link to={`/coin/${id}`}>
      <VStack
        w={"60"}
        shadow={"lg"}
        p={"10"}
        borderRadius={"lg"}
        transition={"all 0.3s"}
        m={"8"}
        css={{
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <Image src={image} w={"40"} h={"40"} objectFit={"contain"} alt={name} />
        <Heading size={"md"} noOfLines={1}>
          {name}
        </Heading>
        <Heading size={"md"} noOfLines={1}>
          {currSym}
          {price ?? "NA"}
        </Heading>
        <Heading size={"md"} noOfLines={1}>
          {symbol}
        </Heading>
      </VStack>
    </Link>
  );

  export default CoinCard;