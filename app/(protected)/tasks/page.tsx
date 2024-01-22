"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useState, useEffect } from "react";
import { Task } from "@prisma/client";
import { toast } from "sonner";
import { getUserTasks } from "@/actions/get-user-tasks";
import { UserTasks } from "@/components/tasks/user-tasks";
import { AddTaskForm } from "@/components/tasks/add-task";

const TaskPage = () => {
    const user = useCurrentUser();
    const [tasks, setTasks] = useState<Task[]>(user?.tasks || []);

    useEffect(() => {
        const fetchTasks = async () => {
            if (user && user.id) {
                try {
                    const tasksData = await getUserTasks();
                    if (tasksData) {
                        setTasks(tasksData);
                    } else {
                        toast.error("Failed to retrieve tasks.")
                    }
                } catch (error) {
                    console.error("Error fetching tasks:", error);
                    toast.error("An error occurred while fetching tasks.");
                }
            }
        };
        fetchTasks();
    }, [user]);

    return (
        <>
        <div className="max-w-full md:w-[600px] mx-4 md:mx-auto space-y-8 mt-20">
            <AddTaskForm />
            <UserTasks tasks={tasks} />
        </div>
    </>
    )  
}

export default TaskPage;