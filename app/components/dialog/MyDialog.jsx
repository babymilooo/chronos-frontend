import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/app/components/dialog/index"

const MyDialog = ({ key }) => {
    return (
        <Dialog key={key}>
            <DialogTrigger>
                <div className="border-l border-t border-content2 p-2 h-[50px] w-full z-2 hover:bg-bkg2">

                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Event</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default MyDialog;