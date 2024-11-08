import "./globals.css";

export const metadata = {
    title: "Password Storage Demo",
    description: "Very cool demo",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body>
        {children}
        </body>
        </html>
    );
}
