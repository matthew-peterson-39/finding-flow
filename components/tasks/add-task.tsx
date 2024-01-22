import { ExtendedUser } from "@/next-auth";
import { 
    Card, 
    CardHeader, 
    CardContent
} from "../ui/card";
import { 
    Form, 
    FormField,
    FormControl,
    FormItem,
    FormLabel, 
    FormDescription, 
    FormMessage 
} from "@/components/ui/form";
import { Task } from "@prisma/client";
import { useState, useTransition } from "react";
import { createTask } from "@/actions/create-task";
import { TaskSchema } from "@/schemas";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useSession } from "next-auth/react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

export const AddTaskForm = () => {
    const user = useCurrentUser();
    const [tasks, setTasks] = useState<Task[]>(user?.tasks || []);
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();
    const { update } = useSession();

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

    return (
        <Card className="max-w-full rounded-xl md:w-[600px] mx-4 md:mx-auto">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    Add Tasks
                </p>
            </CardHeader>
            <CardContent>
            <div className="flex flex-row">
                <Form {...form}>
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
    )
}