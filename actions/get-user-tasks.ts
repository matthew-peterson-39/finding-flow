"use server";
// actions/get-user-tasks.ts
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Task } from "@prisma/client";

export const getUserTasks = async (): Promise<Task[] | null> => {
    const user = await currentUser();
    if (!user) {
        console.error("User not found");
        return null; // Or throw an error if you prefer
    }
    try {
        // Fetch tasks for the current user
        const tasks: Task[] = await db.task.findMany({
            where: { userId: user.id }
        });
        return tasks; // Just return the data
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return null; // Or throw an error if you prefer
    }
}