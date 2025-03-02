import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import Idea from "@/models/Idea";

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    if (!body) {
      return NextResponse.json(
        {
          success: false,
          message: "Request body is missing",
        },
        { status: 400 }
      );
    }

    const idea = await Idea.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "Idea created successfully",
        data: idea,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating idea:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create idea",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const ideas = await Idea.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: ideas,
    });
  } catch (error) {
    console.error("Error fetching ideas:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch ideas",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
