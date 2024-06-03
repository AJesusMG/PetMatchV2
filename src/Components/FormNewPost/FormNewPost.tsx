"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import {
  Card,
  CardBody,
  Divider,
  Select,
  SelectItem,
  Textarea,
  Input,
} from "@nextui-org/react";
import { typeAnimals } from "@/data/typeAnimals";
import { dogsBreeds, catsBreeds, rodentBreeds, birdBreeds } from "@/data/breeds";
import { sizeAnimals } from "@/data/sizeAnimals";
import { ageAnimals } from "@/data/ageAnimals";
import { trainAnimals } from "@/data/trainAnimal";
import { temperAnimals } from "@/data/temperAnimals";
import { costAnimals } from "@/data/costAnimals";
import { timeAnimals } from "@/data/timeAnimals";
import { Weather } from "@/data/weather";
import { sizeHome } from "@/data/sizeHome"; // Asegúrate de importar correctamente tus datos

interface Raza {
  label: string;
  value: number;
  colores?: string[];
}

interface FormData {
  types?: string[];
  breeds?: string[];
  colors?: string[];
  size?: string[];
  age?: string[];
  training?: string[];
  temperament?: string[];
  cost?: string[];
  time?: string[];
  weather?: string[];
  sizeH?: string[];
  description?: string;
  instagram?: string;
  whatsapp?: string;
  facebook?: string;
}

interface FormNewPostProps {
  onFormDataChange: (data: FormData) => void;
}


export default function FormNewPost({ onFormDataChange }: FormNewPostProps) {
  const [formData, setFormData] = useState<FormData>({});
  const [breeds, setBreeds] = useState<Raza[]>([]);
  const [colors, setColors] = useState<{ label: string; value: string }[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [values, setValues] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string[]>([]);
  const [selectedAge, setSelectedAge] = useState<string[]>([]);
  const [training, setTraining] = useState<string[]>([]);
  const [temperament, setTemperament] = useState<string[]>([]);
  const [cost, setCost] = useState<string[]>([]);
  const [time, setTime] = useState<string[]>([]);
  const [weather, setWeather] = useState<string[]>([]);
  const [sizeH, setSizeH] = useState<string[]>([]);

  useEffect(() => {
    onFormDataChange(formData);
    console.log(formData)
  }, [formData, onFormDataChange]);

  

  const onChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    switch (name) {
      case "animalType":
        setValues([value]);
        break;
      case "breed":
        const selectedBreed = breeds.find((breed) => breed.label === value);
        if (selectedBreed) {
          setColors(
            selectedBreed.colores?.map((color) => ({
              label: `${selectedBreed.label} - ${color}`,
              value: color,
            })) || []
          );
        } else {
          setColors([]);
        }
        break;
      default:
        break;
    }
  };

  const handleSelectionChange = (selectedKeys: string[]) => {
    setValues(selectedKeys);
  };

  const handleBreedsChange = (selectedKeys: string[]) => {
    setSelectedBreeds(selectedKeys);
  };

  React.useEffect(() => {
    const selectedTypes = values;
    let updatedBreeds: Raza[] = [];

    if (selectedTypes.includes("Perro")) {
      updatedBreeds = updatedBreeds.concat(
        dogsBreeds.map((breed) => ({ ...breed, colores: breed.colores || [] }))
      );
    }
    if (selectedTypes.includes("Gato")) {
      updatedBreeds = updatedBreeds.concat(
        catsBreeds.map((breed) => ({ ...breed, colores: breed.colores || [] }))
      );
    }
    if (selectedTypes.includes("Roedor")) {
      updatedBreeds = updatedBreeds.concat(
        rodentBreeds.map((breed) => ({ ...breed, colores: breed.colores || [] }))
      );
    }
    if (selectedTypes.includes("Ave")) {
      updatedBreeds = updatedBreeds.concat(
        birdBreeds.map((breed) => ({ ...breed, colores: breed.colores || [] }))
      );
    }

    setBreeds(updatedBreeds);
  }, [values]);

  React.useEffect(() => {
    const selected = breeds.filter((breed) =>
      selectedBreeds.includes(breed.label)
    );

    const colors = selected.flatMap((breed) =>
      breed.colores?.map((color) => ({
        label: `${breed.label} - ${color}`,
        value: color,
      })) || []
    );

    setColors(colors);
  }, [selectedBreeds]);

  React.useEffect(() => {
    setFormData({
      ...formData,
      types: values,
      breeds: selectedBreeds,
      colors: colors.map((color) => color.value),
      size: selectedSize,
      age: selectedAge,
      training,
      temperament,
      cost,
      time,
      weather,
      sizeH,
    });
  }, [
    values,
    selectedBreeds,
    colors,
    selectedSize,
    selectedAge,
    training,
    temperament,
    cost,
    time,
    weather,
    sizeH,
  ]);

  return (
    <Card>
      <CardBody>
        <div className="flex flex-col gap-2">
          <Select
            isRequired
            label="Tipo de Animal"
            placeholder="Selecciona un tipo"
            className="w-full"
            name="animalType"
            value={formData.types || ""}
            onChange={onChange}
          >
            {typeAnimals.map((animal) => (
              <SelectItem key={animal.label} value={animal.label}>
                {animal.label}
              </SelectItem>
            ))}
          </Select>
          <Divider className="my-4" />
          <div className="flex flex-row w-full gap-2">
            <div className="flex flex-col gap-4 w-full">
              <Select
                isRequired
                label="Raza"
                placeholder="Selecciona la raza"
                className="w-full"
                name="breed"
                value={formData.breeds || ""}
                onChange={onChange}
              >
                {breeds.map((breed) => (
                  <SelectItem key={breed.label} value={breed.label}>
                    {breed.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                isRequired
                label="Color"
                placeholder="Selecciona un color"
                className="w-full"
                name="color"
                value={formData.colors || ""}
                onChange={onChange}
              >
                {colors.map((color, index) => (
                  <SelectItem key={index} value={color.value}> 
                    {color.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                isRequired
                label="Tamaño"
                placeholder="Selecciona un tamaño"
                className="w-full"
                name="size"
                value={selectedSize}
                onChange={(e) => setSelectedSize([e.target.value])} // Update setSelectedSize to accept a string array
              >
                {sizeAnimals.map((size) => (
                  <SelectItem key={size.value} value={size.value}>
                    {size.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                isRequired
                label="Edad"
                placeholder="Selecciona una edad"
                className="w-full"
                name="age"
                value={selectedAge}
                onChange={(e) => setSelectedAge([e.target.value])} // Update setSelectedAge to accept a string array
              >
                {ageAnimals.map((age) => (
                  <SelectItem key={age.value} value={age.value}>
                    {age.label}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div className="flex flex-col gap-4 w-full">
              <Select
                isRequired
                label="Entrenamiento"
                placeholder="Selecciona nivel de entrenamiento"
                className="w-full"
                name="training"
                value={training.join(",")}
                onChange={(e) => setTraining(e.target.value.split(","))}
              >
                {trainAnimals.map((train) => (
                  <SelectItem key={train.value} value={train.value}>
                    {train.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                isRequired
                label="Temperamento"
                placeholder="Selecciona temperamento"
                className="w-full"
                name="temperament"
                value={temperament.join(",")}
                onChange={(e) => setTemperament(e.target.value.split(","))}
              >
                {temperAnimals.map((temper) => (
                  <SelectItem key={temper.value} value={temper.value}>
                    {temper.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                isRequired
                label="Costo de Mantenimiento"
                placeholder="Selecciona el costo"
                className="w-full"
                name="cost"
                value={cost.join(",")}
                onChange={(e) => setCost(e.target.value.split(","))}
              >
                {costAnimals.map((cost) => (
                  <SelectItem key={cost.value} value={cost.value}>
                    {cost.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                isRequired
                label="Tiempo Dedicado"
                placeholder="Selecciona el tiempo"
                className="w-full"
                name="time"
                value={time.join(",")}
                onChange={(e) => setTime(e.target.value.split(","))}
              >
                {timeAnimals.map((time) => (
                  <SelectItem key={time.value} value={time.value}>
                    {time.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
          <Divider className="my-4" />
          <div className="flex flex-col gap-4">
            <Select
              isRequired
              label="Clima Preferido"
              placeholder="Selecciona el clima"
              className="w-full"
              name="weather"
              value={weather.join(",")}
              onChange={(e) => setWeather(e.target.value.split(","))}
            >
              {Weather.map((weather) => (
                <SelectItem key={weather.value} value={weather.value}>
                  {weather.label}
                </SelectItem>
              ))}
            </Select>
            <Select
              isRequired
              label="Tamaño del Hogar recomendado"
              placeholder="Selecciona el tamaño"
              className="w-full"
              name="sizeH"
              value={sizeH.join(",")}
              onChange={(e) => setSizeH(e.target.value.split(","))}
            >
              {sizeHome.map((sizeH) => (
                <SelectItem key={sizeH.value} value={sizeH.value}>
                  {sizeH.label}
                </SelectItem>
              ))}
            </Select>
          </div>
          <Divider className="my-4" />
          <Textarea
            label="Descripción"
            placeholder="Escribe una descripción"
            name="description"
            value={formData.description || ""}
            onChange={onChange}
            className="w-full"
            rows={4}
          />
        </div>
      </CardBody>
    </Card>
  );
}
