"use server";

import { getTaskByTitle, createNewTask } from "@/data/task";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { TaskSchema } from "@/schemas";
import * as z from "zod";

export const createTask = async (values: z.infer<typeof TaskSchema>) => {
    const user = await currentUser();
    if(!user || !user.id) {
        return {error: "Unauthorized."}
    }

    const dbUser = await getUserById(user.id!);
    if (!dbUser) {
        return {error: "Unauthorized."}
    }

    // Validate values
    const validatedFields = TaskSchema.safeParse(values);
    if (!validatedFields.success) {
        console.error("Validation Error:", validatedFields.error);
        return { error: "Invalid fields INSIDE CREATE TASKS."};
    }
    
    // Check if task already exists
    const { title } = validatedFields.data;
    const taskAlreadyExists = await getTaskByTitle(user.id, title);
    if (taskAlreadyExists) {
        return { error: "Task with this title already exists." };
    }
    
    // Create the new task
    const newTask =  await createNewTask({
        title: validatedFields.data.title,
        description: validatedFields.data.description,
        userId: user.id,
        total_time: 0,
    });

    return { success: "Task created.", task: newTask };
}