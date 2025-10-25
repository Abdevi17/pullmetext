import CleanerClient from "./CleanerClient";

export const metadata = {
  title: "Unicode Cleaner – Remove Invisible Characters | PullMeText",
  description:
    "Free Unicode Cleaner to remove zero-width spaces, hidden characters, and invisible formatting. Make your text detector-friendly and ready to post.",
  openGraph: {
    title: "Unicode Cleaner – Remove Invisible Characters",
    description:
      "Remove invisible spaces, zero-width characters, and hidden formatting from AI or copied text. Free forever with PullMeText.",
    url: "https://pullmetext.com/cleaner",
    siteName: "PullMeText",
    images: [
      {
        url: "/opengraph-cleaner.jpg",
        width: 1200,
        height: 630,
        alt: "PullMeText Unicode Cleaner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Unicode Cleaner | PullMeText",
    description:
      "Clean hidden Unicode and invisible characters instantly. Free online tool by PullMeText.",
    images: ["/opengraph-cleaner.jpg"],
  },
};

export default function Page() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Unicode Cleaner",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    url: "https://pullmetext.com/cleaner",
    description:
      "Free online tool that removes hidden Unicode characters, zero-width spaces, and invisible formatting from text.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      category: "Free",
    },
    creator: {
      "@type": "Organization",
      name: "PullMeText",
      url: "https://pullmetext.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <CleanerClient />
    </>
  );
}
