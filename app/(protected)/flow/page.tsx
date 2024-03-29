"use client";

import { getUserTasks } from '@/actions/get-user-tasks';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { useCurrentUser } from '@/hooks/use-current-user';
import { Task } from '@prisma/client';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

// Import the createFlow server action
import { createFlow } from '@/actions/create-flow'; // Adjust the import path as needed
import { Button } from '@/components/ui/button';

const FlowPage = () => {
    const user = useCurrentUser();
    const [tasks, setTasks] = useState<Task[]>(user?.tasks || []);
    const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);
    const [flowName, setFlowName] = useState<string>('');
    const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]); // Maintain selected task IDs

    const handleTaskSelection = (task: Task) => {
        // Toggle task selection
        if (selectedTasks.includes(task)) {
            setSelectedTasks(selectedTasks.filter((selectedTask) => selectedTask !== task));
            setSelectedTaskIds(selectedTaskIds.filter((taskId) => taskId !== task.id));
        } else {
            setSelectedTasks([...selectedTasks, task]);
            setSelectedTaskIds([...selectedTaskIds, task.id]);
        }
    };

    const handleFlowNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFlowName(event.target.value);
    };

    // Handle the flow creation when the submit button is clicked
    const onSubmit = async () => {
        try {
            if (!user?.id) {
                console.error('User ID is undefined.');
                return;
            }

            const flowData = {
                name: flowName,
                userId: user?.id,
                selectedTaskIds: selectedTaskIds
            };

            // Call the createFlow server action to create the flow
            const createFlowResponse = await createFlow(flowData);
            
            if (createFlowResponse.success) {
                setSelectedTaskIds([]);
                setSelectedTasks([]);
                setFlowName('');
            } else {
                // Handle error response
                console.error('Failed to create flow');
            }
        } catch (error) {
            console.error('Error creating flow', error);
        }
    };

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
                <Card className="max-w-full rounded-xl md:w-[600px] mx-4 md:mx-auto">
                    <CardHeader>
                        <p className="text-2xl font-semibold text-center">Flow Timer</p>
                    </CardHeader>
                    <CardContent>
                    <input
                        type="text"
                        placeholder="Enter flow name"
                        value={flowName}
                        onChange={handleFlowNameChange}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Button onClick={onSubmit} className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Create Flow
                    </Button>
                        {/* User tasks */}
                        <div className="flex flex-wrap -mx-2">
                            {tasks.map((task) => (
                                <div key={task.id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                                    <div className="flex items-center h-full bg-white rounded-lg border shadow-sm px-4 py-2">
                                        <input
                                            type="checkbox"
                                            checked={selectedTasks.includes(task)}
                                            onChange={() => handleTaskSelection(task)}
                                            className="form-checkbox h-5 w-5 text-blue-600"
                                        />
                                        <label htmlFor={task.id} className="ml-2 text-sm font-medium text-gray-900">{task.title}</label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default FlowPage;
