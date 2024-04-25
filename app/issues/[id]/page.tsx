import IssueStatusBadge from "@/app/Components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import Markdown from "react-markdown";
import DeleteButton from "./DeleteButton";

interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params: { id } }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) notFound();

  return (
    <div>
      <Flex justify="between">
        <Flex gap="3" className="items-center ">
          <Heading>{issue.title}</Heading>
          <IssueStatusBadge status={issue.status} />
        </Flex>
        <Flex gap="3">
          <Link href={`/issues/${issue.id}/edit`}>
            <Button className="hover:cursor-pointer">
              <Pencil2Icon />
            </Button>
          </Link>
          <DeleteButton />
        </Flex>
      </Flex>
      <div className="my-4 flex flex-col gap-3 ">
        <Text size="2" weight="medium">
          Last updated on {issue.updatedAt.toDateString()}
        </Text>
        <Text size="2" weight="medium">
          Created at {issue.createdAt.toDateString()}
        </Text>
      </div>
      <Card className="prose">
        <Markdown>{issue.description}</Markdown>
      </Card>
    </div>
  );
};

export default IssueDetailsPage;
