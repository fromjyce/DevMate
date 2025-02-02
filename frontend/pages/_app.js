import "../app/globals.css";

export const metadata = {
    title: "DevMate",
    description: "AI Code Editor",
  };

function MyApp({ Component, pageProps }) {
    return (
        <div className="antialiased">
          <main>
            <Component {...pageProps} />
          </main>
        </div>
      );
}

export default MyApp;