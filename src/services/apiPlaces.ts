import supabase from "./supabase";

type FormValues = {
  name: string;
  maxPeople: number;
  price: number;
  discountPrice: number;
  description: string;
  image: File;
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

export const createPlace = async (place: FormValues) => {
  // https://edqnukrdncmpiykalqyu.supabase.co/storage/v1/object/public/place-images/cabin-001.jpg

  const imageName = `${Math.random()}-${place?.image.name}`.replaceAll("/", "");

  const imagePath = `${
    import.meta.env.VITE_SUPABASE_URL
  }/storage/v1/object/public/place-images/${imageName}`;

  const { data: places, error } = await supabase
    .from("places")
    .insert([{ ...place, image: imagePath }]);

  if (error) {
    console.error(error);
    throw new Error("Place could not be created");
  }

  const { error: imageError } = await supabase.storage
    .from("place-images")
    .upload(imageName, place.image);

  if (imageError) {
    await supabase.from("places").delete().eq("id", places?.["id"]);
    throw new Error("Place image couldn't be uploaded");
  }

  return places;
};
