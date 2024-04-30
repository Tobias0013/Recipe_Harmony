import React from "react";

import Header from "../../component/header/header";
import "./home.css";
import Banner from "./banner";

export default function Home(prop: { info: string }) {
    return (
        <>
            <Header loggedIn={false} />

            <main>
                <section className="home-banner">
                    <Banner
                        image={"https://cdn.dummyjson.com/recipe-images/1.webp"}
                        title={"Classic Margherita Pizza"}
                        firstName={"Humberto"}
                        lastName={"Botsford"}
                    />
                </section>
            </main>
        </>
    );
}
