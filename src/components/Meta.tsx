import Head from "next/head";

export default function Meta() {
  return (
    <Head>
      <title>lyrist</title>
      <link rel="icon" href="https://fmj.asrvd.me/🎶"></link>
      <meta
        name="description"
        content="simple yet powerful RESTful lyrics API"
      />
      <meta name="theme-color" content="#fce7f3" />
      <meta property="og:site_name" content="lyrist" />
      <meta property="og:title" content="lyrist" />
      <meta property="og:type" content="website" />
      <meta
        property="og:description"
        content="simple yet powerful RESTful lyrics API"
      />
      <meta property="twitter:title" content="lyrist" />
      <meta
        property="twitter:description"
        content="simple yet powerful RESTful lyrics API"
      />
      <meta property="og:image" content="/img/og-image.png" />
      <meta property="twitter:image" content="/img/og-image.png" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:site" content="@asheeshh_" />
    </Head>
  );
}
