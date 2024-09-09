'use client'
import Image from "next/image"
import Link from "next/link"
import { SidebarHeader, SidebarMain, SidebarNav, SidebarNavLink, SidebarNavMain } from "../../../components/dashboard/sidebar"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Sheet, SheetContent, SheetTrigger } from "../../../components/ui/sheet"
import { navLinks } from "@/constants"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

const MobileSidebar = () => {
  const pathname = usePathname()
  const isActive = (path: string) => {
    return path.split('/').filter(Boolean).length === 2
    ? pathname.startsWith(path)
    : pathname === path
  }

  return (
    <SidebarHeader className="header md:hidden">
      
      <Link href="/" className="flex items-center gap-2 md:py-2">
        <Image 
          src="/assets/images/logo-text.svg" 
          alt="logo" 
          width={180} 
          height={28}
        />
      </Link>
      <SidebarNav className="flex gap-2">
        <SignedIn>
          <UserButton/>
          <Sheet>
            <SheetTrigger>
              <Image 
                src="/assets/icons/menu.svg" 
                className="cursor-pointer" 
                alt="menu" 
                width={32} 
                height={32}/>
            </SheetTrigger>
            <SheetContent className="sheet-content sm:w-64">
              <>
                <Image
                  src="/assets/images/logo-text.svg"
                  alt="logo"
                  width={148}
                  height={24}
                />
                <SidebarMain className="flex flex-col flex-grow px-0 mt-6">
                  <SidebarNav>
                    <SidebarNavMain>
                    {navLinks.map((nav) => (
                      <SidebarNavLink 
                        href={nav.route} 
                        key={nav.label} 
                        active={isActive(nav.route)} 
                        className='py-3' 
                      >
                        <Image 
                          src={nav.icon} 
                          alt={nav.label} 
                          width={20} 
                          height={20}
                          className="mr-3"
                        />
                        {nav.label}
                      </SidebarNavLink>
                    ))}
                    </SidebarNavMain>
                  </SidebarNav>
                  
                </SidebarMain>
              </>
            </SheetContent>
          </Sheet>
        </SignedIn>

        <SignedOut>
          <Button asChild className="button">
            <Link href="/sign-in">Login</Link>
          </Button>
        </SignedOut>
      </SidebarNav>
    </SidebarHeader>
  )
}

export default MobileSidebar