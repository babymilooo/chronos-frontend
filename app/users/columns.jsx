"use client"

import { ColumnDef } from "@tanstack/react-table"

export const columns = [
    {
        accessorKey: "username",
        header: "Username",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "image",
        header: "Image",
    },
]
