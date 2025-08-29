import react from "react";
import BackgroundImage from "../assets/background.png";
import Header from "../Components/Header";
import Categories from "../Components/Categories";

const getBackgroundStyle = () => ({
  background: `url(${BackgroundImage}) center center / cover no-repeat`,
});

export default function Home() {
  return (
    <div>
      <div style={getBackgroundStyle()} className="h-[1500px]">
      <section
        className="flex justify-center "
        
      >
        <div className="flex justify-between w-[1180px] mt-5">
          <aside className="w-[200px] h-[400px] bg-gray-200 border-gray-200 rounded">
            <Categories/>
          </aside>
          <div className="w-[700px] h-[400px] border-none rounded bg-gray-800"></div>
          <div className="w-[250px] h-[400px]">
            <div className="w-full h-[190px] border-none rounded-2xl bg-green-500"></div>
            <div className="w-full h-[190px] border-none rounded-2xl bg-red-500 mt-5"></div>
          </div>
        </div>
      </section>
      <section className="flex justify-center ">
        <div className="w-[1180px] ">
            <div className="w-full bg-blue-200 h-[250px] mt-5">

            </div>
             <div className="w-full bg-blue-200 h-[250px] mt-5">

            </div>
             <div className="w-full bg-blue-200 h-[250px] mt-5">

            </div>
        </div>
      </section>
      </div>
    </div>
  );
}
