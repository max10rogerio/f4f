import Head from "next/head";
import type { PropsWithChildren } from "react";

export type HeadHTMLProps = {
  title?: string;
  description?: string;
};

export const HeadHTML = (props: PropsWithChildren<HeadHTMLProps>) => {
  const title = props.title ? `F4F | ${props.title}` : "Feed4Function";
  const description = props.description || "Feed4Function";

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
