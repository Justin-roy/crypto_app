import {
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Image,
  Select,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import { useParams } from "react-router-dom";
import axios from "axios";
import { base_URl } from "..";
import ProgressBar from "./ProgressBar";
import Chart from "./Chart";

function CoinDetails() {
  const [coin, setCoin] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const params = useParams();

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const btns = ["24h", "7d", "15d", "30d", "60d", "100d", "200d", "360d", "max"];

    const handleChange = (event) => {
      setCurrency(event.target.value);
    };

  const handleBTNDays = (value) => {
    setDays(value);
    setLoading(true);
  };

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(`${base_URl}/coins/${params.id}`);
        const { data: chartData } = await axios.get(
          `${base_URl}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        console.log(data);
        setChartData(chartData.prices);
        setCoin(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoins();
  }, [params.id, currency, days]);

  if (error)
    return <ErrorComponent message={"Error while fetching coin details"} />;
  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack p={"8"}>
            <Select value={currency} onChange={handleChange}>
              <option value={"inr"}>INR</option>
              <option value={"usd"}>USD</option>
              <option value={"eur"}>EURO</option>
            </Select>
          </HStack>

          <Box w={"full"} borderWidth={1}>
            <Chart arr={chartData} currency={currencySymbol} />
          </Box>

          <HStack p={"4"} overflowX={'auto'}>
            {btns.map((btn, index) => {
              return (
                <Button
                  key={index}
                  color={"grey"}
                  onClick={() => handleBTNDays(btn)}
                >
                  {btn}
                </Button>
              );
            })}
          </HStack>

          <VStack spacing={"4"} p="16" alignItems={"flex-start"}>
            <Text fontSize={"small"} alignSelf={"center"}>
              Last Updated On{" "}
              {Date(coin.market_data.last_updated).split("G")[0]}
            </Text>

            <Image
              src={coin.image.large}
              w={"16"}
              h={"16"}
              objectFit={"contain"}
            />

            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currencySymbol}
                {coin.market_data.current_price[currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    coin.market_data.price_change_percentage_24h > 0
                      ? "increase"
                      : "decrease"
                  }
                />
                {coin.market_data.price_change_percentage_24h}
              </StatHelpText>
            </Stat>

            <Badge fontSize={"2xl"} bgColor={"blackAlpha.800"} color={"white"}>
              {`#${coin.market_cap_rank}`}
            </Badge>

            <ProgressBar
              high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
              low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
            />

            <Box w={"full"} p={['0',"4"]}>
              <Items
                title={"Total Supply"}
                value={coin.market_data.total_supply}
              />
              <Items title={"Max Supply"} value={coin.market_data.max_supply} />
              <Items
                title={"Circulating Supply"}
                value={coin.market_data.circulating_supply}
              />
              <Items
                title={"Market Cap"}
                value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
              />
              <Items
                title={"Price Change 24H"}
                value={`${currencySymbol}${coin.market_data.price_change_24h}`}
              />
              <Items
                title={"All Time Low"}
                value={`${currencySymbol}${coin.market_data.atl[currency]}`}
              />
              <Items
                title={"All Time High"}
                value={`${currencySymbol}${coin.market_data.ath[currency]}`}
              />
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
}

const Items = ({ title, value }) => (
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text fontSize={['1xl',"2xl"]} fontFamily={"Anta"}>
      {title}
    </Text>
    <Text fontSize={['1xl',"2xl"]}>{value}</Text>
  </HStack>
);

export default CoinDetails;
