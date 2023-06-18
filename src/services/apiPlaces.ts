import supabase from "./supabase";

export type FormValuesApi = {
  id?: number;
  name: string;
  maxPeople: number;
  price: number;
  discountPrice: number;
  description: string;
  image: File | string;
};

export const getPlaces = async () => {
  const { data: places, error } = await supabase.from("places").select("*");

  if (error) {
    console.error("Places cant be loaded");
    throw new Error("Places cant be loaded");
  }

  return places;
};

export const deletePlaces = async (id: number) => {
  const { data: places, error } = await supabase.from("places").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Place could not be delete");
  }

  return places;
};

export const createNewPlace = async (place?: FormValuesApi, id?: number) => {
  console.log(place, id);

  let imageName;
  let hasImagePath;

  if (typeof place?.image === "string") {
    hasImagePath = place.image?.startsWith?.(import.meta.env.VITE_SUPABASE_URL);
  }

  if (typeof place?.image !== "string") {
    imageName = `${Math.random()}-${place?.image.name}`.replaceAll("/", "");
  }

  const imagePath = hasImagePath
    ? place?.image
    : `${
        import.meta.env.VITE_SUPABASE_URL
      }/storage/v1/object/public/place-images/${imageName}`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let query = supabase.from("places") as any;

  if (!id) {
    query = query.insert([{ ...place, image: imagePath }]);
  }

  if (id) {
    query = query.update({ ...place, image: imagePath }).eq("id", id);
  }
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Place could not be created");
  }

  if (hasImagePath) return data;

  const { error: imageError } = await supabase.storage
    .from("place-images")
    .upload(imageName as string, place?.image as string);

  if (imageError) {
    await supabase.from("places").delete().eq("id", data.id);
    throw new Error("Place image couldn't be uploaded");
  }

  return data;
};
