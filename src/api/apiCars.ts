import supabase from "./supabase";

export type FormValuesApi = {
  id?: number;
  name: string;
  price: number;
  capacity: number;
  modelName: string;
  image: File | string;
  type: string;
  litres: number;
};

export const getCars = async () => {
  const { data: cars, error } = await supabase.from("cars").select("*");

  if (error) {
    console.error("Cars cant be loaded");
    throw new Error("Cars cant be loaded");
  }

  return cars;
};

export const deleteCars = async (id: number) => {
  const { data: cars, error } = await supabase.from("cars").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Car could not be delete");
  }

  return cars;
};

export const createNewCar = async (car?: FormValuesApi, id?: number) => {
  let imageName;
  let hasImagePath;

  if (typeof car?.image === "string") {
    hasImagePath = car.image?.startsWith?.(import.meta.env.VITE_SUPABASE_URL);
  }

  if (typeof car?.image !== "string") {
    imageName = `${Math.random()}-${car?.image.name}`.replaceAll("/", "");
  }

  const imagePath = hasImagePath
    ? car?.image
    : `${
        import.meta.env.VITE_SUPABASE_URL
      }/storage/v1/object/public/car-images/${imageName}`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let query = supabase.from("cars") as any;

  if (!id) {
    query = query.insert([{ ...car, image: imagePath }]);
  }

  if (id) {
    query = query.update({ ...car, image: imagePath }).eq("id", id);
  }
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Car could not be created");
  }

  if (hasImagePath) return data;

  const { error: imageError } = await supabase.storage
    .from("car-images")
    .upload(imageName as string, car?.image as string);

  if (imageError) {
    await supabase.from("cars").delete().eq("id", data.id);
    throw new Error("Car image couldn't be uploaded");
  }

  return data;
};
