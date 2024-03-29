"use server";

// Import necessary dependencies and functions
import { currentUser } from "@/lib/auth";
import { createFlowInDatabase } from "@/data/flow";
import { FlowSchema } from "@/schemas";
import * as z from "zod";

// Define the server action for creating a flow
export const createFlow = async (values: z.infer<typeof FlowSchema>) => {

    // Get the current user
    const user = await currentUser();
    
    // Check if the user is authenticated
    if (!user || !user.id) {
        return { error: "Unauthorized." };
    }

    // Validate the input values using your FlowSchema or validation schema
    const validatedFields = FlowSchema.safeParse(values);
    if (!validatedFields.success) {
        console.error("Validation Error:", validatedFields.error);
        return { error: "Invalid fields INSIDE CREATE FLOW." };
    }
    // Create the new flow in the database
    try {
        
        const newFlow = await createFlowInDatabase({
            name: validatedFields.data.name,
            userId: validatedFields.data.userId,
            selectedTaskIds: validatedFields.data.selectedTaskIds
        });
       
        return { success: "Flow created.", flow: newFlow };
    } catch (error) {
        return { error: "Failed to create flow." };
    }
};
