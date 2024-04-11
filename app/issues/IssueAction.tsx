import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const IssueAction = () => {
  return (
    <div>
      <div>
        <Button>
          <Link href="/issues/new">New issue</Link>
        </Button>
      </div>
    </div>
  );
};

export default IssueAction;
