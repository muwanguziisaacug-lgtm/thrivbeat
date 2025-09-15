"use client";

import {
	BoltIcon,
	BookOpenIcon,
	ChevronDownIcon,
	Layers2Icon,
	LogOutIcon,
	PinIcon,
	UserPenIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // You forgot this import
import { authClient } from "@/lib/auth-client";

export function UserDropDown({ session }) {
	const router = useRouter();

	const userName = session?.user?.name;
	const userEmail = session?.user?.email;
	const userImage = session?.user?.image;

	const fallbackChar =
		userName?.[0]?.toUpperCase() || userEmail?.[0]?.toUpperCase() || "U";

	async function LogOut() {
		try {
			await authClient.signOut();
			router.push("/login");
			toast.success("Logged out successfully");
		} catch {
			toast.error("Failed to log out");
		}
	}

	// Define menu items as an array for mapping
	const menuItems = [
		{
			label: "Home",
			href: "/",
			icon: <BoltIcon size={16} className="opacity-60 mr-2" />,
		},
		{
			label: "Account",
			href: "/dashboard/accountsettings",
			icon: <Layers2Icon size={16} className="opacity-60 mr-2" />,
		},
		{
			label: "Dashboard",
			href: "/dashboard/student",
			icon: <BookOpenIcon size={16} className="opacity-60 mr-2" />,
		},
		{
			label: "Support",
			href: "/support",
			icon: <PinIcon size={16} className="opacity-60 mr-2" />,
		},
		{
			label: "About",
			href: "/about",
			icon: <UserPenIcon size={16} className="opacity-60 mr-2" />,
		},
	];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-auto p-0">
					<Avatar>
						<AvatarImage src={userImage} alt="Profile image" />
						<AvatarFallback>{fallbackChar}</AvatarFallback>
					</Avatar>
					<ChevronDownIcon
						size={16}
						className="opacity-60 ml-1"
						aria-hidden="true"
					/>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="max-w-64">
				<DropdownMenuLabel className="flex flex-col">
					<span className="text-foreground truncate text-sm font-medium">
						{userName || "Unknown User"}
					</span>
					<span className="text-muted-foreground truncate text-xs font-normal">
						{userEmail || "unknown@example.com"}
					</span>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{menuItems.map((item) => (
					<DropdownMenuItem asChild key={item.label}>
						<Link href={item.href} className="flex items-center">
							{item.icon}
							<span>{item.label}</span>
						</Link>
					</DropdownMenuItem>
				))}
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={LogOut}>
					<LogOutIcon className="size-4 mr-2" aria-hidden="true" />
					<span>Logout</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
