import React from "react";
import { Card, Avatar, Button, Chip, Image } from "@nextui-org/react";
import NextImage from "next/image";

interface FullPostCardProps {
  id: number;
  urlImage?: string; 
  avatar?: string;   
  user?: string;     
  content: string;
  race?: string;     
  size?: string;     
  age?: string;      
  instagram?: string; 
  whatsapp?: string;  
  facebook?: string;  
}

export default function FullPostCard({ id, urlImage, avatar, user, content, race, size, age, instagram, whatsapp, facebook }: FullPostCardProps) {
  return (
    <Card className="h-[640px] items-stretch flex flex-row " key={id}>
      <div className="flex flex-col  gap-8 w-1/2 bg-gray-300">
        <NextImage  alt="Post image" width={1000} height={0} src={urlImage || "/Lomito.jpg"} className="h-full w-auto object-cover" />
      </div>
      <div className="flex flex-col p-4 gap-8 w-1/2">
        <header className="flex flex-row items-center justify-between">
          <div className="flex flex-row gap-4 items-center">
            <Avatar src={avatar} size="lg" />
            <p className="text-md">{user}</p>
          </div>
          <Button variant="light">Reportar</Button>
        </header>
        <div className="flex-1 px-8">
          <p className="text-md text-justify">{content || "No content available"}</p>
        </div>
        <div className="flex-1 flex flex-col gap-3 px-8">
          <h1 className="text-xl font-bold">Tags</h1>
          <div className="flex flex-row justify-between">
            <Chip variant="bordered" radius="md" className="border-primary-500">
              {race}
            </Chip>
            <Chip variant="bordered" radius="md" className="border-primary-500">
              {size}
            </Chip>
            <Chip variant="bordered" radius="md" className="border-primary-500">
              {age}
            </Chip>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-2 px-8">
          <h1 className="text-xl font-bold">Contactame</h1>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-2 items-center">
              <Image src="/Instagram.svg" radius="none" />
              <p className="text-md font-bold">{instagram}</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <Image src="/WhatsApp.svg" radius="none" />
              <p className="text-md font-bold">{whatsapp}</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <Image src="/Facebook.svg" radius="none" />
              <p className="text-md font-bold">{facebook}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}