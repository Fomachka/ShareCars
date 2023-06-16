import { useQuery } from "@tanstack/react-query";
import { getPlaces } from "../../services/apiPlaces";
import { Loading } from "../../ui/Loading";
import { CabinRow } from "./CabinRow";

export const CabinTable = () => {
  const {
    isLoading,
    data: places,
    error,
  } = useQuery({
    queryKey: ["places"],
    queryFn: getPlaces,
  });

  if (isLoading) return <Loading />;

  return (
    <div
      className="border border-gray-400 text-2xl bg-white rounded-lg overflow-hidden"
      role="table"
    >
      <header
        className="grid grid-cols-[0.6fr_1.8fr_2.2fr_1fr_1fr_1fr] gap-10 items-center bg-gray-50 border-b-1 border-gray-100 uppercase tracking-wide font-semibold text-gray-600 py-6 px-10"
        role="row"
      >
        <div></div>
        <div>Place</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </header>
      {places?.map((place, index) => (
        <CabinRow key={index} place={place} />
      ))}
    </div>
  );
};
