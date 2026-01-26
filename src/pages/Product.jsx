import Nav from '../component/Nev';
import Producthero from '../component/Producthero';
import {Footer} from '../component/Footer';
import HomeProduct from '../component/Homeproduct';
import IndustrialProducts from '../component/IndustrialProducts';
import CTA from '../component/CTA';


export default function Product() {
	return (
		<>
			<Nav />
			<Producthero />
            <HomeProduct />
            <IndustrialProducts />
            <CTA />
			<Footer />
		</>
	);
}
