import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const {
      types,
      breed,
      colors,
      size,
      age,
      training,
      temperament,
      cost,
      time,
      weather,
      sizeH,
      description,
      imageUrl,
      userEmail, 
    } = await request.json();

    if (
      !types ||
      !breed ||
      !colors ||
      !size ||
      !age ||
      !training ||
      !temperament ||
      !cost ||
      !time ||
      !weather ||
      !sizeH ||
      !description ||
      !imageUrl ||
      !userEmail 
    ) {
      return NextResponse.json({
        code: 400,
        message: "Faltan campos obligatorios. Por favor completa el formulario.",
      });
    }

    // Suma
    const total_plus = parseFloat(size[0]) + parseFloat(age[0]) + parseFloat(training[0]) + parseFloat(temperament[0]) + parseFloat(cost[0]) + parseFloat(time[0]) + parseFloat(weather[0]) + parseFloat(sizeH[0]);

    // Insertar en la tabla animals
    const animal = await prisma.animals.create({
      data: {
        age: parseFloat(age[0]),
        size: parseFloat(size[0]),
        training: parseFloat(training[0]),
        specie: types[0],
        breed: breed || '',
        color: colors.join(', '),
        temperament: parseFloat(temperament[0]),
        maintenance: parseFloat(cost[0]),
        timeNeeded: parseFloat(time[0]),
        space_Needed: parseFloat(sizeH[0]),
        weather: parseFloat(weather[0]),
        total_plus,
      },
    });

    // Insertar en la tabla posts
    const post = await prisma.posts.create({
      data: {
        adopted: false,
        description,
        active: true,
        craetedAt: new Date().toISOString(),
        urlImage: imageUrl,
        animalId: animal.id,
        userEmail: userEmail, 
      },
    });

    return NextResponse.json({
      code: 201,
      message: "Datos recibidos correctamente.",
      data: {
        animal,
        post,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      code: 500,
      message: "Ocurrió un error en el servidor.",
    });
  }
}

export async function GET(request: NextRequest) {
  try {
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
        userEmail: {
          not: '' 
        }
      }
    });

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


