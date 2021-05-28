import React from "react";
import NextLink from "next/link";

export default function Link({ href, ...rest }) {
  return <NextLink shallow href={href} {...rest} />;
}
