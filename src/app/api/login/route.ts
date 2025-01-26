import {  login } from "@/app/db";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    const { email, password } = await req.json();
    const user = await login(email, password);
    return NextResponse.json(user);
}
