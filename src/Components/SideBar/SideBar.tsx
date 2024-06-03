"use client";

import React, { useEffect,useRef, useState } from "react";
import Image from "next/image";
import { Button, Tooltip, Modal, ModalContent, useDisclosure, Tabs, Tab, CardBody, Card, Link, CardFooter, CardHeader, CircularProgress } from "@nextui-org/react";
import FormNewPost from "../FormNewPost/FormNewPost";
import { useSession } from "next-auth/react";

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

const initialFormData: FormData = {
  types: [],
  breeds: [],
  colors: [],
  size: [],
  age: [],
  training: [],
  temperament: [],
  cost: [],
  time: [],
  weather: [],
  sizeH: [],
  description: "",
  instagram: "",
  whatsapp: "",
  facebook: "",
};


export default function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const imageIptRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  console.log(session);

  const handleShowImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleFormDataChange = (data: FormData) => {
    setFormData(data);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);

    try {
      if (imageUrl) {
        const response = await fetch(imageUrl);
        const blob = await response.blob();

        const imageFormData = new FormData();
        imageFormData.append("image", blob, "image.jpg");
        //First Fetch to Insert into AWS Bucket
        const uploadResponse = await fetch("/api/testimage", {
          method: "POST",
          body: imageFormData,
        });

        if (uploadResponse.ok) {
          const data = await uploadResponse.json();
          console.log("Image uploaded successfully. URL:", data.url);

          // Second Fetch to Insert into DB
          const postFormData = {
            ...formData,
            imageUrl: data.url,
            userEmail: session?.user?.email || '' 
          };

          const postResponse = await fetch("/api/posts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postFormData),
          });

          if (postResponse.ok) {
            console.log("Form submitted successfully.");
          } else {
            console.error("Failed to submit data. Status:", postResponse.status);
          }
        } else {
          console.error("Failed to upload image. Status:", uploadResponse.status);
        }
      } else {
        console.error("Image URL is null. Unable to upload.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (!isLoading) {
      onClose();
    }
  }, [isLoading, onClose]);

  return (
    <nav className="xl:h-screen shadow-xl xl:w-fit w-full flex lg:flex-col p-4">
      <div className="flex xl:flex-col xl:gap-6 w-full justify-between flex-row">
        <Image src="/Logo.svg" width={50} height={50} alt="Logo" />
        
        <Tooltip content="Catálogo" placement="right" size="sm">
          <Button
            variant="light"
            className="p-6 bg-primary hover:bg-primary-500 hover:text-white transition-all duration-300"
            color="primary"
            radius="sm"
            isIconOnly
            as={Link} // Enlace al catálogo
            href="/user/Catalogue"
          >
            <span className="material-symbols-outlined">auto_stories</span>
          </Button>
        </Tooltip>

        <Tooltip content="Comunidad" placement="right" size="sm">
          <Button
            variant="light"
            className="p-6 bg-primary hover:bg-primary-500 hover:text-white transition-all duration-300"
            color="primary"
            radius="sm"
            isIconOnly
            as={Link} // Enlace al catálogo
            href="/user/Community"
          >
            <span className="material-symbols-outlined">groups</span>
          </Button>
        </Tooltip>

        <Tooltip content="Subir" placement="right" size="sm">
          <Button
            variant="light"
            className="p-6 bg-primary hover:bg-primary-500 hover:text-white transition-all duration-300"
            color="primary"
            radius="sm"
            isIconOnly
            onPress={onOpen}
          >
            <span className="material-symbols-outlined">add_a_photo</span>
          </Button>
        </Tooltip>

        <Modal isOpen={isOpen} onClose={onClose} className="p-2" size="2xl">
          <ModalContent className="max-h-[90vh] overflow-auto">
            <form onSubmit={handleSubmit} className="flex flex-col h-full">
              <Tabs aria-label="Options">
                <Tab key="formulario" title="Formulario">
                  <FormNewPost onFormDataChange={handleFormDataChange}/>
                </Tab>
                <Tab key="imagen" title="Subir Imagen">
                  <Card>
                    <CardHeader>
                      <Button
                        size="lg"
                        className="text-black bg-secondary-200 w-full"
                        onPress={() => imageIptRef.current?.click()}
                      >
                        Seleccionar Imagen
                      </Button>
                    </CardHeader>
                    <CardBody>
                      <div className="bg-zinc-500 h-64 w-full relative rounded-t-large flex justify-center items-center">
                        {imageUrl && (
                          <div className="h-full w-full flex items-center justify-center">
                            <Image
                              src={imageUrl}
                              alt="Imagen de miniatura"
                              width={1920}
                              height={1080}
                              className="object-cover h-full w-full rounded-t-large"
                            />
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          ref={imageIptRef}
                          onChange={handleShowImage}
                        />
                      </div>
                      <CardFooter className="flex justify-center">
                        {isLoading ? (
                          <CircularProgress aria-label="Loading..."/>
                        ) : (
                          <Button
                            type="submit"
                            size="lg"
                            className="text-black w-full bg-success-300"
                          >
                            Publicar
                          </Button>
                        )}
                      </CardFooter>
                    </CardBody>
                  </Card>
                </Tab>
              </Tabs>
            </form>
          </ModalContent>
        </Modal>
      </div>
    </nav>
  );
}
