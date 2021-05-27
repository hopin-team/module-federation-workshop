import React from "react";
import NextLink from "next/link";

export default function Link(props) {
  return <NextLink shallow {...props} />;
}
