import { PropsWithChildren } from 'react'
import { MainSidebar } from './_components/main-sidebar'
import { DashboardPage, DashboardPageHeader, DashboardPageHeaderTitle, DashboardPageMain } from '@/components/dashboard/page'
import { UserButton } from '@clerk/nextjs'

export default async function Layout({ children }: PropsWithChildren) {
	return (
		<div className="grid grid-cols-[16rem_1fr] w-full">
			<MainSidebar/>
			<main>
        <DashboardPage>
          <DashboardPageHeader>
            <DashboardPageHeaderTitle>Home</DashboardPageHeaderTitle>
            <UserButton />

          </DashboardPageHeader>
          <DashboardPageMain>
            <div className="container max-w-screen lg">
              <div className="grid grid-cols-[16rem_1fr] gap-12">
                <div>{children}</div>
              </div>
            </div>
          </DashboardPageMain>
        </DashboardPage>
      </main>
		</div>
	)
}
