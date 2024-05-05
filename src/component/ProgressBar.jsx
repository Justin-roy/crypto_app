import { Badge, HStack, Progress, Text, VStack } from "@chakra-ui/react"

const ProgressBar = ({high,low}) =>(
    <VStack w={'full'} >
      <Progress value={50} colorScheme={"teal"} w={'full'}/>
      <HStack justifyContent={'space-between'} w={'full'}>
        <Badge children={low} colorScheme="red" />
        <Text fontSize={'sm'} >24H Range</Text>
        <Badge children={high} colorScheme="green" />
      </HStack>
    </VStack>
);

export default ProgressBar;