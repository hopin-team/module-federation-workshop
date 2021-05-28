import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";

export default function Link({ href, ...rest }) {
  return <NextLink shallow href={href} {...rest} />;
}
