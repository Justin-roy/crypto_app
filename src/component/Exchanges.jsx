import React, { useEffect, useState } from "react";
import axios from "axios";
import { base_URl } from "../index";
import { Container, HStack, VStack, Image, Heading } from "@chakra-ui/react";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
function Exchanges() {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${base_URl}/exchanges`);
        setExchanges(data);
        setLoading(false);  
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchExchanges();
  }, [loading]);
 
   if(error) return <ErrorComponent message={"Error while fetching coins exchange"}/>

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
        <HStack wrap={"wrap"} justifyContent={'space-evenly'}>
        {exchanges.map((stock) => {
          return (
            <ExchangeCard
              name={stock.name}
              url={stock.url}
              image={stock.image}
              rank={stock.trust_score_rank}
              country={stock.country}
              year={stock.year_established}
            />
          );
        })}
        </HStack>
        </>
      )}
    </Container>
  );
}
const ExchangeCard = ({ name, url, image, rank,country,year }) => (
 
    <a href={url} target="blank">
    <VStack
      w={"52"}
      shadow={"lg"}
      p={"8"}
      borderRadius={"lg"}
      transition={"all 0.3s"}
      m={"4"}
      css={{
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}

      background={'rgba( 255, 255, 255, 0.25 )'}
      boxShadow={'0 8px 32px 0 rgba( 31, 38, 135, 0.37 )'}
    >
      
      <Image src={image} w={"10"} h={"10"} objectFit={"contain"} alt={name} />
      <Heading size={"md"} noOfLines={1}>
        {rank}
      </Heading>
      <Heading size={"md"} noOfLines={1}>
        {name}
      </Heading>
      <HStack p={"4px"} m={"auto"}>
      <Heading fontSize={"10px"} noOfLines={1}>
        {country}
      </Heading>
      <Heading fontSize={"10px"} noOfLines={1}>
        {year}
      </Heading>
      </HStack>
    </VStack>
  </a>

);
export default Exchanges;
