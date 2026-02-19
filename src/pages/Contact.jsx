import React from "react";
import Nav from "../component/Nev.jsx";
import Hero from "../component/ContactHero.jsx";
import { Footer } from "../component/Footer.jsx";
import ContactForm from "../component/contactForm.jsx";
import Mapsec from "../component/Mapsec.jsx";
import DownloadApp from "../component/DownloadApp.jsx";


export default function Contact() {
	return (
		<div className="min-h-screen flex flex-col">
			
			<main className="flex-1">
				<Hero />
                <ContactForm />
                <Mapsec />
                <DownloadApp />
				

			</main>
			<Footer />
		</div>
	);
}
