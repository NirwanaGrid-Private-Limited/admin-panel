import React from "react";
import Nav from "../component/Nev.jsx";
import Hero from "../component/ContactHero.jsx";
import { Footer } from "../component/Footer.jsx";

export default function Contact() {
	return (
		<div className="min-h-screen flex flex-col">
			
			<main className="flex-1">
				<Hero />
			</main>
			<Footer />
		</div>
	);
}
