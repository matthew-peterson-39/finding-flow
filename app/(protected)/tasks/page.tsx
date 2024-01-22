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
                try {
                    const tasksData = await getUserTasks();
                    if (tasksData) {
                        setTasks(tasksData);
                        // toast.success("Tasks retrieved") // Uncomment this if you want the success toast
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
        <Card className="max-w-full rounded-xl md:w-[600px] mx-4 md:mx-auto">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    Add Tasks
                </p>
            </CardHeader>
            <CardContent>
            <div className="flex flex-row">
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
                                )}
                            />
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
            </div>
            </CardContent>
        </Card>
        <Card className="overflow-y-auto p-4" style={{ height: '400px' }}>
                <CardHeader>    
                    <p className="text-2xl font-semibold text-center">
                        Your Tasks
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto" style={{ maxHeight: '500px' }}>
                        {tasks.map(task => (
                            <div 
                                key={task.id}
                                className="p-4 border rounded shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                                // onClick={() => handleTaskClick(task)}
                            >
                                <p className="text-lg">{task.title}</p>
                                {/* Additional task details */}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
    </div>
    </>
    )  
}

export default TaskPage;