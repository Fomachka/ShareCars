import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { FormValuesApi, createNewCar } from "../../api/apiCars";

type FormValues = {
  id?: number;
  name: string;
  price: number;
  capacity: number;
  modelName: string;
  image: FileList | string;
  type: string;
  litres: number;
};

const Form = ({
  editCar = {},
  onCloseModal,
}: {
  editCar: FormValues | Record<string, never>;
  onCloseModal?: () => void;
}) => {
  const { id: editId, ...editValues } = editCar;
  const isEditSession = Boolean(editId);
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { mutate: createCar, isLoading: isCreating } = useMutation({
    mutationFn: createNewCar,
    onSuccess: () => {
      toast.success("New place successfully created");
      queryClient.invalidateQueries({
        queryKey: ["cars"],
      });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const { mutate: newCar, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCarData, id }: { newCarData: FormValuesApi; id: number }) =>
      createNewCar(newCarData, id),
    onSuccess: () => {
      toast.success("Car successfully created");
      queryClient.invalidateQueries({
        queryKey: ["cars"],
      });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const isWorking = isCreating || isEditing;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      newCar(
        {
          newCarData: {
            ...data,
            image,
          },
          id: editId as number,
        },
        {
          onSuccess: () => {
            reset({
              name: "",
              price: 0,
              capacity: 0,
              modelName: "",
            });
            onCloseModal?.();
          },
        }
      );
    } else {
      createCar(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset({
              name: "",
              capacity: 0,
              price: 0,
              modelName: "",
            });
            onCloseModal?.();
          },
        }
      );
    }
  };

  return (
    <form
      className={`${onCloseModal ? "p-4 w-[40vw]" : "py-8 px-6"} space-y-6 xl:space-y-8`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">
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
          htmlFor="modelName"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Model name
          <span className="float-right text-red-700 ">
            {errors?.modelName?.message && errors.modelName.message}
          </span>
        </label>
        <input
          id="modelName"
          {...register("modelName", {
            required: "This field is required",
          })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
        ></input>
      </div>
      <div>
        <label
          htmlFor="capacity"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Maximum capacity
          <span className="float-right text-red-700 ">
            {errors?.capacity?.message && errors.capacity.message}
          </span>
        </label>
        <input
          type="number"
          id="capacity"
          disabled={isWorking}
          {...register("capacity", {
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
        <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 ">
          Transmission type
          <span className="float-right text-red-700 ">
            {errors?.capacity?.message && errors.capacity.message}
          </span>
        </label>
        <select
          id="type"
          disabled={isWorking}
          {...register("type", {
            required: "This field is required",
          })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 bg-[url('/images/icons/arrow-down.svg')] bg-no-repeat bg-[length:26px_26px] bg-[calc(100%-6px)]
          "
        >
          <option value="auto">Auto</option>
          <option value="manual">Manual</option>
        </select>
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

      <div className="space-y-4">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-6 py-3 text-center flex-1"
          disabled={isWorking}
        >
          {isEditSession ? "Edit Car" : "Add Car"}
        </button>
        <button
          type="reset"
          className="text-gray-900 bg-gray-100 sm:ml-5 hover:bg-gray-200 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-6 py-3 text-center flex-1 "
          onClick={() => onCloseModal?.()}
        >
          {onCloseModal ? "Close" : "Reset Form"}
        </button>
      </div>
    </form>
  );
};

export default Form;
