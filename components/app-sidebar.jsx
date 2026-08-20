"use client"

import * as React from "react"
import {
	IconCamera,
	IconChartBar,
	IconDashboard,
	IconDatabase,
	IconFileAi,
	IconFileDescription,
	IconFileWord,
	IconFolder,
	IconHelp,
	IconInnerShadowTop,
	IconListDetails,
	IconReport,
	IconSearch,
	IconSettings,
	IconUsers,
	IconMail,
} from "@tabler/icons-react";
import { Dumbbell } from "lucide-react";
import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client"
import Link from "next/link"


const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	navMain: [
		{
			title: "Dashboard",
			url: "/admin/dashboard",
			icon: IconDashboard,
		},
		{
			title: "Create",
			url: "/admin/dashboard/create",
			icon: IconListDetails,
		},
		{
			title: "Exercises",
			url: "/admin/dashboard/exercise",
			icon: Dumbbell,
		},
		{
			title: "Support",
			url: "/admin/dashboard/support",
			icon: IconFolder,
		},
		{
			title: "Community",
			url: "/admin/dashboard/community",
			icon: IconFolder,
		},
		{
			title: "Leads",
			url: "/admin/dashboard/leads",
			icon: IconMail,
		},
		{
			title: "Users",
			url: "/admin/dashboard/users",
			icon: IconUsers,
		},
	],
	navClouds: [
		{
			title: "Capture",
			icon: IconCamera,
			isActive: true,
			url: "#",
			items: [
				{
					title: "Active Proposals",
					url: "#",
				},
				{
					title: "Archived",
					url: "#",
				},
			],
		},
		{
			title: "Proposal",
			icon: IconFileDescription,
			url: "#",
			items: [
				{
					title: "Active Proposals",
					url: "#",
				},
				{
					title: "Archived",
					url: "#",
				},
			],
		},
		{
			title: "Prompts",
			icon: IconFileAi,
			url: "#",
			items: [
				{
					title: "Active Proposals",
					url: "#",
				},
				{
					title: "Archived",
					url: "#",
				},
			],
		},
	],
};

export function AppSidebar({
  ...props
}) {

    const { data: session } = authClient.useSession()




  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              {/* Use Next.js Link for logo navigation */}
              <Link href="/admin/dashboard">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">ThrivBeats</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* Pass Link to NavMain for sidebar navigation */}
        <NavMain items={data.navMain} LinkComponent={Link} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={session?.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
