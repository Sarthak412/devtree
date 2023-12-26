export const metadata = {
  title: "Devtree",
  description: "Showcase your projects",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
