import React from "react";
import AboutUshero from "../component/AboutUshero.jsx";
import PreventiveSystems from "../component/PreventiveSystems";
import OurApproach from "../component/OurApproach";
import WhatMakesUsDifferent from "../component/WhatMakesUsDifferent";
import OurStory from "../component/OurStory";
import MeetFounders from "../component/MeetFounders";
import Leadership from "../component/LeaderShip";
import Achievements from "../component/Achievements";
import { Footer } from "../component/Footer";


const AboutUs = () => {
	return (
		<div>
			<AboutUshero />
			<PreventiveSystems />
			<OurApproach />
			<WhatMakesUsDifferent />
			<OurStory />
			<MeetFounders />
			<Leadership />
			<Achievements />
			<Footer />
		</div>
	);
};

export default AboutUs;
