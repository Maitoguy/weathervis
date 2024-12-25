import "./globals.css";

export const metadata = {
  title: "WeatherVis",
  description: "Get Past Weather data",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className=''>
        {children}
      </body>
    </html>
  );
}
