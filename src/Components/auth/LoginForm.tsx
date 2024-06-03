import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { Social } from "@/Components/auth/Social";
import { Switch } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function LoginForm() {

  
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { name: "", password: "" },
  });
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
      const response = await signIn("credentials", {
        name: data.name,
        password: data.password,
        callbackUrl: "/user/PrincipalPage"
      });
      if (response && response.error) {
        setError(response.error);
      }
    
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-[90%] h-full flex flex-col justify-evenly">
        {error && <p className="bg-red-500 text-lg text-white p-3 rounded mb-2">{error}</p>}
        <Input
          label="Nombre"
          labelPlacement="outside"
          placeholder="Emiliano Obregon"
          {...register("name")}
          value={name}
          onValueChange={setName}

          isRequired
        />
        {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
        <Input
          type="password"
          label="Contraseña"
          labelPlacement="outside"
          placeholder="********"
          {...register("password")}
          value={password}
          onValueChange={setPassword  }
          isRequired
        />
        {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
        
        <Button color="success" className="w-full bg-success-300 font-bold" type="submit">
          Iniciar Sesión
        </Button>
        <div>
          <Social />
        </div>
      </form>
    </>
  );
}