import { dogs } from "@/db";
import PanelCard from "@/components/dogs/PanelCard";
import { FaHeart, FaHandHoldingHeart, FaUsers } from "react-icons/fa";

const SponsoredDogs = () => {
  // Split dogs into two categories (you'll need to add sponsorship data to your dogs array)
  const sponsoredByUser = dogs.filter((dog) => dog.sponsoredBy === "user");
  const sponsoredByOthers = dogs.filter((dog) => dog.sponsoredBy === "others");

  return (
    <div className="w-full min-h-screen }py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-rose-900 mb-4 flex items-center justify-center gap-3">
            {/* <FaHeart className="text-rose-600 animate-pulse" /> */}
            Patitas Patrocinadas
            <FaHandHoldingHeart className="text-rose-600 animate-pulse" />
          </h1>
          <p className="text-lg text-rose-800">
            ¡Comparte el amor y apoya a los perritos que más lo necesitan!
          </p>
        </div>
        <div className="space-y-16">
          {/* Your Sponsorships */}
          <section className="bg-white rounded-2xl p-8 shadow-lg border border-rose-50">
            <div className="flex items-center gap-4 mb-8">
              <FaHandHoldingHeart className="text-rose-700 text-3xl" />
              <h2 className="text-2xl font-semibold text-rose-900">
                Perritos ayudados ({sponsoredByUser.length})
              </h2>
            </div>
            {sponsoredByUser.length > 0 ? (
              <PanelCard
                data={sponsoredByUser}
                cols={4}
                cardStyle="hover:transform hover:scale-105 transition-all duration-300"
              />
            ) : (
              <div className="text-center py-12 bg-rose-50 rounded-xl">
                <p className="text-rose-800 text-lg">
                  ¡Aún no has patrocinado a ningún perrito!{" "}
                  <span className="block">
                    ¡Comienza a ayudar a los que más lo necesitan!
                  </span>
                </p>
              </div>
            )}
          </section>

          {/* Sponsored by Others */}
          <section className="bg-white rounded-2xl p-8 shadow-lg border border-rose-50">
            <div className="flex items-center gap-4 mb-8">
              <FaUsers className="text-rose-700 text-3xl" />
              <h2 className="text-2xl font-semibold text-rose-900">
                Tus perritos patrocinados por otros ({sponsoredByOthers.length})
              </h2>
            </div>
            {sponsoredByOthers.length > 0 ? (
              <PanelCard
                data={sponsoredByOthers}
                cols={4}
                cardStyle="hover:transform hover:scale-105 transition-all duration-300"
              />
            ) : (
              <div className="text-center py-12 bg-rose-50 rounded-xl">
                <p className="text-rose-800 text-lg">
                    ¡Aún no tienes perritos patrocinados por otros!{" "}
                    <span className="block">
                    Trata de compartir tus perritos en adopción para que otros puedan ayudarlos.
                    </span>
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default SponsoredDogs;
