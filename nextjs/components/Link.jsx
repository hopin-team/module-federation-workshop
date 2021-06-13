import React from "react";
import NextLink from "next/link";

export default function Link({ href, ...rest }) {
  // 👩‍🏫 notice we are using shallow https://nextjs.org/docs/routing/shallow-routing
  return <NextLink shallow href={href} {...rest} />;
}
