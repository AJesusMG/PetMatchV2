import { NextResponse, NextRequest } from "next/server";
import prisma from "@/libs/db"; // Asegúrate de que esta es la ruta correcta a tu instancia de Prisma

export async function GET(request: NextRequest, { params }: { params: { email: string } }) {
  try {
    const { email } = params;

    if (!email) {
      return NextResponse.json({
        code: 400,
        message: "El correo electrónico es obligatorio.",
      });
    }

    const posts = await prisma.posts.findMany({
      select: {
        urlImage: true,
        description: true,
        animal: {
          select: {
            breed: true,
            size: true,
            age: true,
          }
        },
        user: {
          select: {
            name: true,
          }
        },
      },
      where: {
        userEmail: email, // Filtra por el correo electrónico del usuario
      }
    });

    if (posts.length === 0) {
      return NextResponse.json({
        code: 404,
        message: "No se encontraron publicaciones para este usuario.",
      });
    }

    const postsWithMessages = posts.map((post) => {
      return {
        message: "Publicación:",
        ...post,
      };
    });

    return NextResponse.json({
      code: 200,
      message: "Datos recuperados correctamente.",
      data: postsWithMessages,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      code: 500,
      message: "Ocurrió un error en el servidor.",
    });
  }
}
