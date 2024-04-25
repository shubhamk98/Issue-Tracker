import { Link as RadixLink } from "@radix-ui/themes";
import NextLink from "next/link";

interface Props {
  href: string;
  children: string;
}

const Link = ({ children, href }: Props) => {
  return (
    <div>
      <NextLink href={href} passHref legacyBehavior>
        <RadixLink weight='medium'>{children}</RadixLink>
      </NextLink>
    </div>
  );
};

export default Link;
