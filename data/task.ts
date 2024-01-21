import { db } from "@/lib/db";
import { Task } from "@prisma/client";

type TaskData = {
    title: string;
    description?: string;
    userId: string;
    total_time: number;
  };

export const getUserTasksByUserId = async (id: string) => {
    try {
        const tasks = await db.task.findMany({where: { userId: id }});
        return tasks;
    } catch {
        return null;
    }
}

export const getTaskByTitle = async (id: string, taskTitle: string) => {
    try {
        return db.task.findFirst({
            where: {
                userId: id,
                title: taskTitle,
            },
        });
    } catch {
        return null;
    }
}

export const createNewTask = async (taskData: TaskData): Promise<Task> => {

    return db.task.create({
        data: {...taskData},
    });
}