import { ExtendedUser } from "@/next-auth";
import { 
    Card, 
    CardHeader, 
    CardContent
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Task } from "@prisma/client";

interface UserTasksProps {
    user?: ExtendedUser;
    label: string;
    tasks: Task[];
}

export const UserTasks = ({
    user,
    tasks,
    label,
}: UserTasksProps) => {
    return (
        <Card className="max-w-full md:w-[600px] mx-4 md:mx-auto">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    {label}
                </p>
            </CardHeader>
            <CardContent>
                {tasks.map( task => (
                    <div key={task.id}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}