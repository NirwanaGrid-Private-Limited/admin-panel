import installtionimg from "../assets/houseinstall.png";
function Houseinstall() {
  return <section className="bg-[#08111F8A] py-16 text-center relative overflow-hidden">
      <div className="container mx-auto px-4 z-10 relative">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 drop-shadow-md">
          Explore how automation can redefine your space
        </h2>
      </div>
      <div className="w-full overflow-hidden">
          <img
    src={installtionimg}
    alt="Isometric Smart Home View"
    className="w-full h-auto object-cover"
  />
      </div>
    </section>;
}
export {
  Houseinstall
};
