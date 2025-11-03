import '../globals.css'
import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import data from './dashboard/data.json'
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

export const metadata = {
title: "ThrivBeat",
description: `Your physical therapist for cardiac issues`,
};

export default function RootLayout({ children }) {
    return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<SidebarProvider
						style={{
							"--sidebar-width": "calc(var(--spacing) * 72)",
							"--header-height": "calc(var(--spacing) * 12)",
						}}
					>
						<AppSidebar variant="inset" />
						<SidebarInset>
							<SiteHeader />
					{children}

						</SidebarInset>
					</SidebarProvider>
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	); 
}