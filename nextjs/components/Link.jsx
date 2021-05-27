import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";

export default function Link({ href, ...rest }) {
  const router = useRouter();

  // disable links to the current page otherwise nextjs mounts the remote again and shows loading component
  // why does nextjs shows the loading comp if the remote is already downloaded when revisting page?
  return router.pathname !== href ? (
    <NextLink shallow href={href} {...rest} />
  ) : (
    <a href="#" {...rest}></a>
  );
}
