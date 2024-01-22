"use client";

import * as z from "zod";
import { createTask } from "@/actions/create-task";
import { useCurrentUser } from "@/hooks/use-current-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { 
    Form, 
    FormField,
    FormControl,
    FormItem,
    FormLabel, 
    FormDescription, 
    FormMessage 
} from "@/components/ui/form";
import { TaskSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Task } from "@prisma/client";
import { toast } from "sonner";
import { getUserTasks } from "@/actions/get-user-tasks";
import { Value } from "@radix-ui/react-select";


const TaskPage = () => {
    const user = useCurrentUser();
    const [tasks, setTasks] = useState<Task[]>(user?.tasks || []);
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const { update } = useSession();
    const [isPending, startTransition] = useTransition();
    
    const onSubmit = (values: z.infer<typeof TaskSchema>) => {
        startTransition(() => {
            createTask(values)
                .then((data)=>{
                    if(data.error) {
                        setError(data.error);
                    }
                    if (data.success) {
                        setTasks(currentTasks => [...currentTasks, data.task])
                        setSuccess(data.success);
                        update();
                        form.reset();
                    }
                })
                .catch(()=> setError("Something went wrong."));
        });
    }

    const form = useForm<z.infer<typeof TaskSchema>>({
        resolver: zodResolver(TaskSchema),
        defaultValues: {
            title: '',
            description: '',
            total_time: 0,
            userId: user?.id
        }
    });

    useEffect(() => {
        const fetchTasks = async () => {
            if (user && user.id) {
                getUserTasks()
                .then(async (response) => {
                    if (response.ok) {
                        const tasksData = await response.json();
                        setTasks(tasksData);
                        // toast.success("Tasks retrieved")
                    } else {
                        toast.error("Failed to retrieve tasks.")
                    }
                })
            }
        };
        fetchTasks();
    }, [user]);

    return (
        <>
        <Card className="max-w-full md:w-[600px] mx-4 md:mx-auto">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    Tasks
                </p>
            </CardHeader>
            <CardContent>
            <Form {...form}>
                {/* <form 
                    className="space-y-6"
                    onSubmit={form.handleSubmit(onSubmit)}
                > */}
                <form onSubmit={(e) => {
                    e.preventDefault();
                    console.log("Form submitted manually");
                    onSubmit(form.getValues());
                }}>
                    <div className="space-y-4">
                        <FormField control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Task title
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Task name"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                        )}/>
                    
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button
                        disabled={isPending} 
                        type="submit">
                        Add
                    </Button>
                </div>
            </form>
            </Form>
            <div>
                {tasks.map(task => (
                    <div key={task.id}>
                        {task.title}
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
    </>
    )  
}

export default TaskPage;