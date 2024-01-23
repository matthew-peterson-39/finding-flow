import { db } from "@/lib/db";

type ErrorResponse = {
    error: string;
};

// Function to create a new flow in the database
export const createFlowInDatabase = async (data: {name: string; userId: string}) => {
    try {
        console.log("Before creating a new flow in the database");
       
        // Create a new flow in the database using Prisma's create method
        const newFlow = await db.flow.create({
            data: {
                name: data.name,
                userId: data.userId,
            },
        });
        console.log("After creating a new flow in the database" , newFlow);
        return newFlow;
    } catch (error) {
        console.error("Error creating flow in the database:", error);
        // Handle any errors that occur during flow creation
        return { error: "Failed to create flow." } as ErrorResponse;
    }
};
