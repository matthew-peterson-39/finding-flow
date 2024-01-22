import { 
    Card, 
    CardHeader, 
    CardContent
} from "../ui/card";
import { Task } from "@prisma/client";

interface UserTasksProps {
    tasks: Task[];
}

export const UserTasks = ({tasks}: UserTasksProps) => {
    return (
        <Card className="overflow-y-auto p-4 rounded-xl" style={{ height: '400px' }}>
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
                        >
                            <p className="text-lg">{task.title}</p>
                            
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}