"use client"

import { useSession } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import PanelCard from "@/components/dogs/PanelCard";
import { FaHandHoldingHeart, FaUsers } from "react-icons/fa";

const SponsoredDogs = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  // Fetch sponsorship requests made by the logged-in user
  const {
    data: userRequests,
    isLoading: loadingUser,
    error: errorUser,
  } = useQuery({
    queryKey: ["requestsUser", userId],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3001/requests/users/${userId}`);
      if (!res.ok) throw new Error("Error al cargar solicitudes del usuario");
      return res.json();
    },
    enabled: !!userId,
  });

  // Fetch sponsorship requests where the logged-in user is the owner of the dog(s)
  const {
    data: ownerRequests,
    isLoading: loadingOwner,
    error: errorOwner,
  } = useQuery({
    queryKey: ["requestsOwner", userId],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3001/requests/owner/${userId}`);
      if (!res.ok) throw new Error("Error al cargar solicitudes para tus perros");
      return res.json();
    },
    enabled: !!userId,
  });

  // Filter requests: only approved sponsorships, then map to the associated dog
  const sponsoredByUser = userRequests
    ? userRequests.filter((r) => r.status === "approved" && r.type === "sponsor")
    : [];
  const sponsoredByUserDogs = sponsoredByUser.map((r) => r.dog);

  const sponsoredByOthers = ownerRequests
    ? ownerRequests.filter((r) => r.status === "approved" && r.type === "sponsor")
    : [];
  const sponsoredByOthersDogs = sponsoredByOthers.map((r) => r.dog);

  if (loadingUser || loadingOwner) {
    return <div>Cargando...</div>;
  }
  if (errorUser || errorOwner) {
    return <div>Error al cargar solicitudes</div>;
  }

  return (
    <div className="w-full min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-rose-900 mb-4 flex items-center justify-center gap-3">
            Patitas Patrocinadas
            <FaHandHoldingHeart className="text-rose-600 animate-pulse" />
          </h1>
          <p className="text-lg text-rose-800">
            ¡Comparte el amor y apoya a los perritos que más lo necesitan!
          </p>
        </div>
        <div className="space-y-16">
          {/* Sponsorships made by the user */}
          <section className="bg-white rounded-2xl p-8 shadow-lg border border-rose-50">
            <div className="flex items-center gap-4 mb-8">
              <FaHandHoldingHeart className="text-rose-700 text-3xl" />
              <h2 className="text-2xl font-semibold text-rose-900">
                Perritos ayudados ({sponsoredByUserDogs.length})
              </h2>
            </div>
            {sponsoredByUserDogs.length > 0 ? (
              <PanelCard
                data={sponsoredByUserDogs}
                cols={4}
                cardStyle="hover:transform hover:scale-105 transition-all duration-300"
              />
            ) : (
              <div className="text-center py-12 bg-rose-50 rounded-xl">
                <p className="text-rose-800 text-lg">
                  ¡Aún no has patrocinado a ningún perrito!
                  <span className="block">
                    ¡Comienza a ayudar a los que más lo necesitan!
                  </span>
                </p>
              </div>
            )}
          </section>
          {/* Sponsorships received for your dogs */}
          <section className="bg-white rounded-2xl p-8 shadow-lg border border-rose-50">
            <div className="flex items-center gap-4 mb-8">
              <FaUsers className="text-rose-700 text-3xl" />
              <h2 className="text-2xl font-semibold text-rose-900">
                Tus perritos patrocinados por otros ({sponsoredByOthersDogs.length})
              </h2>
            </div>
            {sponsoredByOthersDogs.length > 0 ? (
              <PanelCard
                data={sponsoredByOthersDogs}
                cols={4}
                cardStyle="hover:transform hover:scale-105 transition-all duration-300"
              />
            ) : (
              <div className="text-center py-12 bg-rose-50 rounded-xl">
                <p className="text-rose-800 text-lg">
                  ¡Aún no tienes perritos patrocinados por otros!
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
