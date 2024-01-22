"use server";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { TaskSchema } from "@/schemas";
import { db } from "@/lib/db";
import { z } from "zod";
import { NextResponse } from "next/server";
import { Task } from "@prisma/client";

export const getUserTasks = async () => {
    const user = await currentUser();
    if (!user) {
        return new NextResponse(null, { status: 403 });
    }
    try {
        // Fetch tasks for the current user
        const tasks: Task[] = await db.task.findMany({
            where: { userId: user.id }
        });
        // Return the tasks in the response
        return new NextResponse(JSON.stringify(tasks), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return new NextResponse(null, { status: 500 });
    }
}