'use client'
import {
	Sidebar,
	SidebarFooter,
	SidebarHeader,
	SidebarMain,
	SidebarNav,
	SidebarNavHeader,
	SidebarNavHeaderTitle,
	SidebarNavLink,
	SidebarNavMain,
} from '@/components/dashboard/sidebar'
import { MixerVerticalIcon, DashboardIcon } from '@radix-ui/react-icons'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function MainSidebar() {
	const pathname = usePathname()
	const isActive = (path: string) => {
		return path.split('/').filter(Boolean).length === 2
			? pathname.startsWith(path)
			: pathname === path
	}

	return (
		<Sidebar>
			<SidebarHeader>
				<Link href="/">
          <span>Fotorify</span>
					{/* <FullLogo textSize={2} /> */}
				</Link>
			</SidebarHeader>
			<SidebarMain className="flex flex-col flex-grow">
				<SidebarNav>
					<SidebarNavMain>
						<SidebarNavLink href="/app" active={isActive('/app')}>
							<DashboardIcon className="w-3 h-3 mr-3" />
							Home
						</SidebarNavLink>
						<SidebarNavLink
							href="/app/settings"
							active={isActive('/app/settings')}
						>
							<MixerVerticalIcon className="w-3 h-3 mr-3" />
							Settings
						</SidebarNavLink>
					</SidebarNavMain>
				</SidebarNav>

				<SidebarNav className="mt-auto">
					<SidebarNavHeader>
						<SidebarNavHeaderTitle>Links extras</SidebarNavHeaderTitle>
					</SidebarNavHeader>
					<SidebarNavMain>
						{/* <SidebarNavLink href="/">Need help?</SidebarNavLink> */}
						<SidebarNavLink href="/">Website</SidebarNavLink>
					</SidebarNavMain>
				</SidebarNav>
			</SidebarMain>
			<SidebarFooter>
        <footer>Footer</footer>
				{/* <UserDropdown user={user} plan={plan} /> */}
			</SidebarFooter>
		</Sidebar>
	)
}
