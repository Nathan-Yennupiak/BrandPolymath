
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config, icon } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;


export const metadata = {
  title: "Nathan Portfolio",
  description: "Portfolio website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

        {children}
      </body>
    </html>
  );
}


// import Head from "next/head";
// import "../styles/globals.css"; // Assuming this contains global styles

// export const metadata = {
//   title: "Nathan Portfolio",
//   description: "Portfolio website",
// };

// export default function RootLayout({ children }) {
//   return (
//     <>
//       <Head>
//         <link rel="icon" href="/favicon.ico" />
//         <link
//           rel="stylesheet"
//           href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
//           integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
//           crossOrigin="anonymous"
//           referrerPolicy="no-referrer"
//         />
//         {/* Other meta tags can be added here */}
//         <title>{metadata.title}</title>
//         <meta name="description" content={metadata.description} />
//       </Head>

//       {children}
//     </>
//   );
// }
