import Head from 'next/head';

export default function Seo({
  title = 'KontaktFinder',
  description = 'Wyszukiwarka publicznie dostępnych danych kontaktowych firm.',
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="/images/twitter-card.png" />
      <meta name="theme-color" content="#0f172a" />
      <meta name="robots" content="noindex,nofollow" />
    </Head>
  )
}