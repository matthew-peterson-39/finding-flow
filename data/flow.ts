import { db } from "@/lib/db";

type ErrorResponse = {
    error: string;
};


// Function to create a new flow in the database
export const createFlowInDatabase = async (
    data: {
        name: string;
        userId: string;
        selectedTaskIds: string[]; 
}) => {
    // NEW Test code
    try {
        // const flowNameExists = db.flow.findFirst(
            //check if a flow with that name already exists
        // )
        // Start a transaction
        return await db.$transaction(async (prisma) => {
            // Create a new flow in the database
            const newFlow = await prisma.flow.create({
                data: {
                    name: data.name,
                    userId: data.userId,
                },
            });

            // Create flow tasks for each selected task
            await Promise.all(data.selectedTaskIds.map(taskId => {
                return prisma.flowTask.create({
                    data: {
                        flowId: newFlow.id,
                        taskId: taskId,
                    },
                });
            }));
            console.log({newFlow})
            return newFlow;
        });
    } catch (error) {
        console.error("Error creating flow in the database:", error);
        return { error: "Failed to create flow." } as ErrorResponse;
    }
};
// WORKING CODE
// {
//     try {
//         console.log("Before creating a new flow in the database");
       
//         // Create a new flow in the database using Prisma's create method
//         const newFlow = await db.flow.create({
//             data: {
//                 name: data.name,
//                 userId: data.userId,
//             },
//         });
//         console.log("After creating a new flow in the database" , newFlow);
//         return newFlow;
//     } catch (error) {
//         console.error("Error creating flow in the database:", error);
//         // Handle any errors that occur during flow creation
//         return { error: "Failed to create flow." } as ErrorResponse;
//     }
// };
