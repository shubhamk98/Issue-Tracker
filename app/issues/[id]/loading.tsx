import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const IssueDetailsPage = async () => {
  return (
    <Box>
      <Flex gap="3" className="items-center">
        <Skeleton width="20rem" />
        <Skeleton width="3rem" />
      </Flex>
      <div className="my-4 flex flex-col gap-3 ">
        <Text size="2" weight="medium">
          <Skeleton width="14rem" />
        </Text>
        <Text size="2" weight="medium">
          <Skeleton width="14rem" />
        </Text>
      </div>
      <Card className="prose">
        <Skeleton count={4} />
      </Card>
    </Box>
  );
};

export default IssueDetailsPage;
