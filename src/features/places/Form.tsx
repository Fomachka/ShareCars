import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { FormValuesApi, createNewPlace } from "../../services/apiPlaces";
import { PlaceProps } from "./CabinRow";

type FormValues = {
  name: string;
  maxPeople: number;
  price: number;
  discountPrice: number;
  description: string;
  image: FileList | string;
};

// eslint-disable-next-line react/prop-types
const Form = ({ editPlace = {} }) => {
  const { id: editId, ...editValues } = editPlace;
  const isEditSession = Boolean(editId);
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, getValues, formState } = useForm<FormValues>({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { mutate: createPlace, isLoading: isCreating } = useMutation({
    mutationFn: createNewPlace,
    onSuccess: () => {
      toast.success("New place successfully created");
      queryClient.invalidateQueries({
        queryKey: ["places"],
      });
      reset();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const { mutate: newPlace, isLoading: isEditing } = useMutation({
    mutationFn: ({ newPlaceData, id }: { newPlaceData: FormValuesApi; id: number }) =>
      createNewPlace(newPlaceData, id),
    onSuccess: () => {
      toast.success("Place successfully created");
      queryClient.invalidateQueries({
        queryKey: ["places"],
      });
      reset();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const isWorking = isCreating || isEditing;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      newPlace({
        newPlaceData: {
          ...data,
          image,
        },
        id: editId,
      });
    } else {
      createPlace({ ...data, image: image });
    }
  };

  return (
    <form className="bg-white py-8 px-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
          Name{" "}
          <span className="float-right text-red-700 ">
            {errors?.name?.message && errors.name.message}
          </span>
        </label>
        <input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
        />
      </div>
      <div>
        <label
          htmlFor="capacity"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Maximum capacity
          <span className="float-right text-red-700 ">
            {errors?.maxPeople?.message && errors.maxPeople.message}
          </span>
        </label>
        <input
          type="number"
          id="capacity"
          disabled={isWorking}
          {...register("maxPeople", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Amount should be at least 1",
            },
          })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
        />
      </div>
      <div>
        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 ">
          Regular price
          <span className="float-right text-red-700 ">
            {errors?.price?.message && errors.price.message}
          </span>
        </label>
        <input
          type="number"
          id="price"
          disabled={isWorking}
          {...register("price", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
        />
      </div>

      <div>
        <label
          htmlFor="discount"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Discount
          <span className="float-right text-red-700 ">
            {errors?.discountPrice?.message && errors.discountPrice.message}
          </span>
        </label>
        <input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discountPrice", {
            required: "This field is required",

            validate: (value: number) => {
              if (+value <= +getValues().price && value >= 0) return true;
              if (+value < 0) return "Discount can't be less than 0";
              if (+value > +getValues().price) {
                return "Discount can't exceed the price";
              }
            },
          })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Description of a place
          <span className="float-right text-red-700 ">
            {errors?.description?.message && errors.description.message}
          </span>
        </label>
        <textarea
          id="description"
          rows={4}
          {...register("description", {
            required: "This field is required",
          })}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Write your thoughts here..."
        ></textarea>
      </div>
      <div>
        <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 ">
          Image
          <span className="float-right text-red-700 ">
            {errors?.image?.message && errors.image.message}
          </span>
        </label>
        <input
          id="image"
          type="file"
          disabled={isWorking}
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
        />
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-6 py-3 text-center flex-1"
        disabled={isWorking}
      >
        {isEditSession ? "Edit Place" : "Add Place"}
      </button>
      <button
        type="reset"
        className="text-gray-900 bg-gray-100 ml-5 hover:bg-gray-200 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-6 py-3 text-center flex-1"
      >
        Reset Form
      </button>
    </form>
  );
};

export default Form;
