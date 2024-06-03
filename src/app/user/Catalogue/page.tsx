'use client'
import React, { useState, useEffect } from "react";
import UserButton from "@/Components/UserButton/UserButton";
import PostCard from "@/Components/PostCard/PostCard";
import { PostCardProps } from "@/Components/PostCard/PostCard";  
import { PostData } from "@/Components/PostCard/PostCard";
import { sizeAnimals } from "@/data/sizeAnimals";
import { ageAnimals } from "@/data/ageAnimals";

export const getSizeLabel = (sizeValue: number): string => {
  const sizeAnimal = sizeAnimals.find((sizeAnimal) => sizeAnimal.value === sizeValue);
  return sizeAnimal ? sizeAnimal.label : 'Desconocido';
};

export const getAgeLabel = (ageValue: number): string => {
  const ageAnimal = ageAnimals.find((ageAnimal) => ageAnimal.value === ageValue);
  return ageAnimal ? ageAnimal.label : 'Desconocido';
};

export default function Catalogue() {
  const [posts, setPosts] = useState<PostCardProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log(data);

        const formattedPosts = data.data.map((post: PostData, index: number) => ({
          id: index,
          urlImage: post.urlImage,
          avatar: post.user.name,
          user: post.user.name,
          content: post.description,
          race: post.animal.breed,
          size: getSizeLabel(post.animal.size),
          age: getAgeLabel(post.animal.age),
          instagram: "",
          whatsapp: "",
          facebook: ""
        }));
        setPosts(formattedPosts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-row w-full">
        <header className="flex flex-row w-full items-center justify-between">
          <h1 className="text-4xl font-bold">Mascotas en Adopción</h1>
          <UserButton />
        </header>
      </div>
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-5 gap-4">
          {posts.map((post, index) => (
            <PostCard
              key={index}
              id={post.id} // Usa el id real
              urlImage={post.urlImage}
              avatar={post.avatar}
              user={post.user}
              content={post.content}
              race={post.race}
              size={post.size}
              age={post.age}
              instagram={post.instagram} // Asegúrate de proporcionar valores predeterminados para estas propiedades opcionales
              whatsapp={post.whatsapp}
              facebook={post.facebook}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
