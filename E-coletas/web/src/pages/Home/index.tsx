import { Logo } from "@/assets";
import { FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      id="page-home"
      className="h-screen bg-[url('/src/assets/home-background.svg')] bg-no-repeat"
      style={{ backgroundPosition: "700px bottom" }}
    >
      <div className="content w-full h-full max-w-[1100px] mx-auto px-[30px] flex flex-col items-start text-left">
        <header className="mt-[48px]">
          <img src={Logo} alt="Ecoleta" />
        </header>

        <main className="flex-1 max-w-[560px] flex flex-col justify-center">
          <h1 className="text-[54px] text-[var(--title-color)]">
            Seu marketplace de coleta de resíduos.
          </h1>

          <p className="text-[24px] mt-[24px] leading-[38px]">
            Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
          </p>

          <Link
            // href="#"
            to="/createPoint"
            className="w-full max-w-[360px] h-[72px] mt-[40px] bg-[var(--primary-color)] rounded-[8px] flex items-center overflow-hidden no-underline hover:bg-[#2fb86e]"
          >
            <span className="w-[72px] h-[72px] bg-black/10 flex items-center justify-center transition-colors duration-200">
              <FiLogIn className="text-white w-[20px] h-[20px]" />
            </span>

            <strong className="flex-1 text-center text-white">
              Cadastre um ponto de coleta
            </strong>
          </Link>
        </main>
      </div>
    </div>
  );
};

export default Home;
