import { capitalize } from "@/app/hooks/capitalize";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IconDotsVertical } from "@tabler/icons-react";
import { Calendar } from "lucide-react";
import React from "react";

const UserTable = () => {

    const tableContent = {
        header: ['names', 'email',  'Joined','Period', 'Enrolled', 'actions'],
        users: [
            {
                id: 1,
                name: 'isaac Muwanguzi',
                email: 'a@example.com',
                joined: '25-09-25',
                period: 'Monthly',
                amount: 'Yes'
            }
        ]
    }
    console.log(tableContent.header)
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        {tableContent.header.map((t) => (
                            <TableHead>{capitalize(t)}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody className="**:data-[slot=table-cell]:first:w-8">
                    {tableContent.users.map((user) => (
                        <TableRow>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell className='flex items-center gap-2'>
                                <Calendar className="size-4"/>
                                {user.joined}
                            </TableCell>
                            <TableCell>{user.period}</TableCell>
                            <TableCell>{user.amount}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            size="icon"
                                            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                                        >
                                            <IconDotsVertical />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        className=""
                                        align="end"
                                    >
                                        <DropdownMenuItem>
                                            View
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem variant="destructive">
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default UserTable;
