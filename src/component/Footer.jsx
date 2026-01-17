import imgLogo1 from "../assets/nirwanagridlogo.png";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
function Footer() {
  return <footer className="w-full">
      {
    /* Main Footer Section */
  }
      <div className="bg-[rgba(67,69,71,0.32)] rounded-t-[25px] pt-16 pb-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {
    /* Brand Column */
  }
            <div className="space-y-6">
              <img src={imgLogo1} alt="NirwanaGrid" className="h-[153px]  object-contain" />
              <p className="text-2xl font-semibold text-white opacity-90 leading-normal">
                Zero Effort. Peaceful Living.
              </p>
              
              {
    /* Socials */
  }
              <div className="flex gap-4 mt-8">
                <a href="#" className="w-[42px] h-[46px] bg-[#313131] opacity-60 rounded flex items-center justify-center text-white hover:opacity-100 transition-opacity">
                  <Facebook size={20} fill="white" className="text-transparent" />
                </a>
                <a href="#" className="w-[42px] h-[46px] bg-[#313131] opacity-60 rounded flex items-center justify-center text-white hover:opacity-100 transition-opacity">
                  <Twitter size={20} fill="white" className="text-transparent" />
                </a>
                <a href="#" className="w-[42px] h-[46px] bg-[#313131] opacity-60 rounded flex items-center justify-center text-white hover:opacity-100 transition-opacity">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-[42px] h-[46px] bg-[#313131] opacity-60 rounded flex items-center justify-center text-white hover:opacity-100 transition-opacity">
                  <Linkedin size={20} fill="white" className="text-transparent" />
                </a>
              </div>
            </div>

            {
    /* Company Links */
  }
            <div>
              <h4 className="text-2xl font-semibold text-[#1a202a] mb-6 font-['Inter']">Company</h4>
              <ul className="space-y-4 text-[#1a202a] font-medium text-[22px] font-['Inter']">
                <li><a href="#" className="hover:text-[#3ba8ff]">About NirwanaGrid</a></li>
                <li><a href="#" className="hover:text-[#3ba8ff]">Our Vision</a></li>
                <li><a href="#" className="hover:text-[#3ba8ff]">Our Mission ,Values</a></li>
                <li><a href="#" className="hover:text-[#3ba8ff]">Our Milestones</a></li>
              </ul>
            </div>

            {
    /* Resources Links */
  }
            <div>
              <h4 className="text-2xl font-semibold text-[#1a202a] mb-6 font-['Inter']">Resources</h4>
              <ul className="space-y-4 text-[#1a202a] font-medium text-[22px] font-['Inter']">
                <li><a href="#" className="hover:text-[#3ba8ff]">Media & Press</a></li>
                <li><a href="#" className="hover:text-[#3ba8ff]">Blogs & Insights</a></li>
                <li><a href="#" className="hover:text-[#3ba8ff]">Careers</a></li>
                <li><a href="#" className="hover:text-[#3ba8ff]">Partner With Us</a></li>
              </ul>
            </div>

            {
    /* Contact */
  }
            <div>
              <h4 className="text-2xl font-semibold text-[#1a202a] mb-6 font-['Inter']">Contact</h4>
              <ul className="space-y-4 text-[#1a202a] font-medium text-[22px] font-['Inter']">
                <li>support@nirwanagrid.com</li>
                <li>Greater Noida, India</li>
                <li className="pt-4 leading-[105%]">We respect your privacy. No spam, ever.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {
    /* Bottom Bar */
  }
      <div className="bg-[#434547] py-8">
        <div className="container mx-auto px-4 md:px-8 flex flex-col lg:flex-row justify-between items-center text-[#d1d1d1]">
          <p className="text-[18px] font-medium font-['Inter']">©copyright 2025 Nirwana Grid. All Rights Reserved</p>
          <div className="flex flex-col md:flex-row gap-8 mt-4 lg:mt-0 text-[22px] font-medium font-['Inter']">
            <a href="#" className="hover:text-white">Terms And Conditions</a>
            <a href="#" className="hover:text-white">Disclamer</a>
            <a href="#" className="hover:text-white">privacy policy</a>
          </div>
        </div>
      </div>
    </footer>;
}
export {
  Footer
};
