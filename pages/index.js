import Head from "next/head";

import MainPage from "../components/Pages/Main";

export default function Home() {

    return (
        <>
        <Head>
            <title>Cornhole - Scoreboard</title>
            <meta
                name="description"
                content="A simple cornhole scoreboard."
            />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <MainPage />
        </>
    );
}
