import { supabaseUrl } from "../api/supabase";
const imageUrl = `${supabaseUrl}/storage/v1/object/public/car-images/`;

export const cars = [
  {
    name: "Audi",
    modelName: "Q-3",
    capacity: 2,
    price: 250,
    image: imageUrl + "Audi-q3.png",
    type: "auto",
    litres: 10,
  },
  {
    name: "Chevrolet",
    modelName: "Cruze",
    capacity: 2,
    price: 350,
    image: imageUrl + "Chevrolet-cruze.png",
    type: "manual",
    litres: 12,
  },
  {
    name: "Ford",
    modelName: "Escape",
    capacity: 4,
    price: 300,
    image: imageUrl + "Ford-escape.png",
    type: "auto",
    litres: 10,
  },
  {
    name: "Hyundai",
    modelName: "Genesis",
    capacity: 4,
    price: 500,
    image: imageUrl + "Hyundai-genesis.png",
    type: "auto",
    litres: 10,
  },
  {
    name: "Hyundai",
    modelName: "Sonata",
    capacity: 6,
    price: 350,
    image: imageUrl + "Hyundai-sonata.png",
    type: "auto",
    litres: 8,
  },
  {
    name: "Hyundai",
    modelName: "Tuscon",
    capacity: 6,
    price: 800,
    image: imageUrl + "Hyundai-tuscon.png",
    type: "auto",
    litres: 10,
  },
  {
    name: "Kia",
    modelName: "Carnival",
    capacity: 8,
    price: 600,
    image: imageUrl + "Kia-carnival.png",
    type: "auto",
    litres: 7,
  },
  {
    name: "Kia",
    modelName: "Optima",
    capacity: 10,
    price: 1400,
    image: imageUrl + "Kia-optima.png",
    type: "manual",
    litres: 6,
  },
  {
    name: "Nissan",
    modelName: "Pathfinder",
    capacity: 10,
    price: 1400,
    image: imageUrl + "Nissan-pathfinder.png",
    type: "manual",
    litres: 6,
  },
  {
    name: "Volkswagen",
    modelName: "Tiguan",
    capacity: 10,
    price: 1400,
    image: imageUrl + "Volkswagen-tiguan.png",
    type: "manual",
    litres: 6,
  },
];
