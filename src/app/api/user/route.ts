"use server"
import { checkUserExists, createUser, getUserId, insertSurvey } from "../../db"; // Import functions from db.ts
import { NextResponse } from "next/server";

// Helper function for sending error responses
function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

// Handle POST requests
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action } = body;

    if (!action) return errorResponse("Action is required", 400);

    switch (action) {
      case "checkUserExists":
        return await handleCheckUserExists(body);

      case "createUser":
        return await handleCreateUser(body);

      case "getUserId":
        return await handleGetUserId(body);

      case "insertSurvey":
        return await handleInsertSurvey(body);

      default:
        return errorResponse("Invalid action", 400);
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return errorResponse("Internal Server Error", 500);
  }
}

// Handler for checking if a user exists
async function handleCheckUserExists(body: any) {
  const { email } = body;

  if (!email) return errorResponse("Email is required", 400);

  try {
    const exists = await checkUserExists(email);
    return NextResponse.json({ exists });
  } catch (error) {
    console.error("Error checking user existence:", error);
    return errorResponse("Internal Server Error", 500);
  }
}

// Handler for creating a user
async function handleCreateUser(body: any) {
  const { firstName, lastName, email, password, phone, countryCode } = body;

  if (!firstName || !lastName || !email || !password || !phone || !countryCode) {
    return errorResponse("All fields are required", 400);
  }

  try {
    const userExists = await checkUserExists(email);
    if (userExists) return errorResponse("User already exists", 400);

    await createUser(firstName, lastName, email, password, phone, countryCode);
    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return errorResponse("Internal Server Error", 500);
  }
}

// Handler for retrieving user ID
async function handleGetUserId(body: any) {
  const { email } = body;

  if (!email) return errorResponse("Email is required", 400);

  try {
    const userId = await getUserId(email);
    return NextResponse.json({ userId });
  } catch (error) {
    console.error("Error getting user ID:", error);
    return errorResponse("Internal Server Error", 500);
  }
}

// Handler for inserting survey data
async function handleInsertSurvey(body: any) {
  const { userId, formData } = body;

  if (!userId || !formData) return errorResponse("User ID and form data are required", 400);

  try {
    await insertSurvey(userId, formData);
    return NextResponse.json({ message: "Survey data inserted successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error inserting survey data:", error);
    return errorResponse("Internal Server Error", 500);
  }
}
