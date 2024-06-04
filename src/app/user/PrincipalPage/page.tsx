"use client"
import React, { useEffect} from "react";
import { Button, Link } from "@nextui-org/react";
import PostCard from "@/Components/PostCard/PostCard";
import { useSession } from "next-auth/react";

const PostProps = [

  {
    id: 1,
    image: "https://nextui.org/images/hero-card.jpeg",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    user: "Usuario 1",
    content: "Contenido del post 1",
    race: "Raza 1",
    size: "Tamaño 1",
    age: "Edad 1",
    instagram: "@usuario1",
    whatsapp: "+123456789",
    facebook: "/usuario1",
  },
  {
    id: 2,
    image: "https://nextui.org/images/album-cover.png",
    avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
    user: "Usuario 2",
    content: "Contenido del post 2",
    race: "Raza 2",
    size: "Tamaño 2",
    age: "Edad 2",
    instagram: "@usuario2",
    whatsapp: "+987654321",
    facebook: "/usuario2",
  },
  {
    id: 3,
    image: "https://nextui-docs-v2.vercel.app/images/fruit-1.jpeg",
    avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
    user: "Usuario 3",
    content: "Contenido del post 3",
    race: "Raza 3",
    size: "Tamaño 3",
    age: "Edad 3",
    instagram: "@usuario3",
    whatsapp: "+2342342323",
    facebook: "/usuario3",
  },
  {
    id: 4,
    image: "https://nextui-docs-v2.vercel.app/images/fruit-2.jpeg",
    avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
    user: "Usuario 3",
    content: "Contenido del post 3",
    race: "Raza 3",
    size: "Tamaño 3",
    age: "Edad 3",
    instagram: "@usuario3",
    whatsapp: "+2342342323",
    facebook: "/usuario3",
  },
  {
    id: 5,
    image: "https://nextui-docs-v2.vercel.app/images/fruit-3.jpeg",
    avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
    user: "Usuario 3",
    content: "Contenido del post 3",
    race: "Raza 3",
    size: "Tamaño 3",
    age: "Edad 3",
    instagram: "@usuario3",
    whatsapp: "+2342342323",
    facebook: "/usuario3",
  },
  {
    id: 6,
    image: "https://nextui-docs-v2.vercel.app/images/fruit-7.jpeg",
    avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
    user: "Usuario 3",
    content: "Contenido del post 3",
    race: "Raza 3",
    size: "Tamaño 3",
    age: "Edad 3",
    instagram: "@usuario3",
    whatsapp: "+2342342323",
    facebook: "/usuario3",
  },
  {
    id: 7,
    image: "https://nextui-docs-v2.vercel.app/images/fruit-8.jpeg",
    avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
    user: "Usuario 3",
    content: "Contenido del post 3",
    race: "Raza 3",
    size: "Tamaño 3",
    age: "Edad 3",
    instagram: "@usuario3",
    whatsapp: "+2342342323",
    facebook: "/usuario3",
  },
];

export default function PrincipalPage() {

  const { data: session } = useSession();
  const email = session?.user?.email;

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await fetch(`/api/user/${email}`);
        if (!response.ok) {
          const requestBody = {
            name: session?.user?.name,
            email: session?.user?.email,
            password: "",
          };


          const registerResponse = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          });

          console.log('Register Response:', registerResponse);

          if (!registerResponse.ok) {
            throw new Error('Error al registrar el usuario');
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (session) {
      checkUser();
    }
  }, [session]);

  

  return (
    <div className="flex flex-col gap-16 w-full h-full">
      <div className="flex w-full">
        <div className="flex flex-col">
          <h1 className="text-center text-7xl">
            Bienvenidos a{" "}
            <p className="text-6xl text-primary-500 font-bold">PetMatch</p>
          </h1>
          <div className="flex w-1/2 mx-auto mt-8">
            <p className="text-center text-xl">
              ¿Buscas a tu compañero perfecto de cuatro patas? ¡No busques más!
              En nuestra plataforma, te conectamos con los animales en adopción
              que están ansiosos por encontrar un hogar amoroso.
            </p>
          </div>
          <div className="flex mx-auto mt-8">
            <Button
              className="bg-success-300 font-bold text-xl"
              size="lg"
              as={Link} // Enlace al catálogo
              href="/user/Questionnaire"
            >
              Resolver Cuestionario
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl font-bold">Mascotas en adopción</h1>
        <div className="grid grid-cols-5 gap-4">
          {PostProps.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              image={post.image}
              avatar={post.avatar}
              user={post.user}
              content={post.content}
              race={post.race}
              size={post.size}
              age={post.age}
              instagram={post.instagram}
              whatsapp={post.whatsapp}
              facebook={post.facebook}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
