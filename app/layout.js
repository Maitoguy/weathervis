import "./globals.css";

// Metadata for the component
export const metadata = {
  title: "WeatherVis",
  description: "Get Past Weather data",
};

// Rendering component
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className=''>
        {children}
      </body>
    </html>
  );
}
