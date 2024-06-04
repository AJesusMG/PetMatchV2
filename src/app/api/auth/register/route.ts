import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";
import db from "@/libs/db"

export async function POST(request: NextRequest) {
    interface ReqBody { name :  string, email : string, password : string, isAdmin : boolean}
    try {
        const data = await request.json() as ReqBody;

        if(!data.name || !data.email){
            return NextResponse.json({
                "message": "Missing fields"
            }, {
                status: 400
            })
        }


        const userFoundEmail = await db.user.findUnique({
            where : {
                email : data.email
            
            }
        })
        if(userFoundEmail){
            return NextResponse.json({
                "message": "Email already exists"
            }, {
                status: 400
            })
        }
        const userFoundName = await db.user.findUnique({
            where : {
                name : data.name
            }
        })
        if(userFoundName){
            return NextResponse.json({
                "message": "Name already exists"
            }, {
                status: 400
            })
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newUser = await db.user.create({
            data : {
                name : data.name,
                email : data.email,
                isAdmin : data.isAdmin,
                password : hashedPassword
            }
        })
        
        return NextResponse.json({
            "message": "User created"
        }, {
            status: 201
        })

        
    } catch (error) {
        return NextResponse.json({
            "message": (error as Error).message
        }, {
            status: 500
        })
    }
}

export async function GET(request: NextRequest) {
    try {
      const users = await db.user.findMany();
      return NextResponse.json(users, { status: 200 });
    } catch (error) {
      return NextResponse.json({
        message: (error as Error).message
      }, {
        status: 500
      });
    }
  }