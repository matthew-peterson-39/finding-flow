// import { FormError } from '@/components/form-error';
// import { FormSuccess } from '@/components/form-success';
// import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import { useCurrentUser } from '@/hooks/use-current-user';
// import { Task } from '@prisma/client';
// import { useSession } from 'next-auth/react';
// import { useState, useTransition } from 'react'

const FlowPage = () => {
    // const user = useCurrentUser();
    // const [tasks, setTasks] = useState<Task[]>(user?.tasks || []);
    // const [error, setError] = useState<string | undefined>();
    // const [success, setSuccess] = useState<string | undefined>();
    // const [isPending, startTransition] = useTransition();
    // const { update } = useSession();
    
    return (
        <>
        <div className="max-w-full md:w-[600px] mx-4 md:mx-auto space-y-8 mt-20">
            <Card className="max-w-full rounded-xl md:w-[600px] mx-4 md:mx-auto">
                <CardHeader>
                    <p className="text-2xl font-semibold text-center">
                        Flow Timer
                    </p>
                </CardHeader>
                <CardContent>
                <div className="flex flex-row">
                
                </div>
                </CardContent>
            </Card>
        </div>
        </>
    )
}

export default FlowPage;