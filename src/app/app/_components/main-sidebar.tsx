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
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { navLinks } from '@/constants'

export function MainSidebar() {
  const pathname = usePathname()
  const isActive = (path: string) => {
    return path.split('/').filter(Boolean).length === 2
    ? pathname.startsWith(path)
    : pathname === path
  }
  
  return (
    <Sidebar className="hidden md:flex">
      <SidebarHeader>
        <Link href="/">
          <Image src="/assets/images/logo-text.svg" alt="logo" width={180} height={28} />
        </Link>
      </SidebarHeader>
      <SidebarMain className="flex flex-col flex-grow">
        <SidebarNav>
          <SidebarNavMain>
          {navLinks.map((nav) => (
            <SidebarNavLink href={nav.route} key={nav.label} active={isActive(nav.route)} className='py-3'>
              <Image src={nav.icon} alt={nav.label} width={20} height={20} className="mr-3"/>
              {nav.label}
            </SidebarNavLink>
          ))}
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
        <UserButton showName/>
      </SidebarFooter>
    </Sidebar>
  )
}
