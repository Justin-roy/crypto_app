import React, { useEffect, useState } from "react";
import axios from "axios";
import { base_URl } from "../index";
import {
  Container,
  HStack,
  VStack,
  Image,
  Heading,
  Button,
  Select,
} from "@chakra-ui/react";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import { Link } from "react-router-dom";
import CoinCard from "./CoinCard";

function Coin() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");
  const pageChangeButton = new Array(132).fill(1);
  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";
  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };
  const handleChange = (event) => {
    setCurrency(event.target.value)
  }
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${base_URl}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        console.log(data);
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency, page]);

  if (error) return <ErrorComponent message={"Error while fetching coins"} />;

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack p={"8"}>
            <Select
              value={currency}
              onChange={handleChange}
            >
              <option value={"inr"}>INR</option>
              <option value={"usd"}>USD</option>
              <option value={"eur"}>EURO</option>
            </Select>
          </HStack>
          <HStack wrap={"wrap"} justifyContent={'space-evenly'}>
            {coins.map((stock) => {
              return (
                <CoinCard
                  id={stock.id}
                  name={stock.name}
                  image={stock.image}
                  price={stock.current_price}
                  symbol={stock.symbol}
                  currSym={currencySymbol}
                />
              );
            })}
          </HStack>
          <HStack w={"full"} overflowX={"auto"} p={"8"}>
            {pageChangeButton.map((btn, index) => {
              return (
                <Button key={index} color={"black"} onClick={() => changePage(index + 1)}>
                  {index + 1}
                </Button>
              );
            })}
          </HStack>
        </>
      )}
    </Container>
  );
}
export default Coin;
