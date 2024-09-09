import { PropsWithChildren } from 'react'
import { DashboardPage, DashboardPageHeader, DashboardPageHeaderTitle, DashboardPageMain } from '@/components/dashboard/page'
import MobileSidebar from '@/app/app/_components/mobile-sidebar'
import { MainSidebar } from './_components/main-sidebar'

export default async function Layout({ children }: PropsWithChildren) {
	return (
		<div className="md:grid md:grid-cols-[16rem_1fr] w-full">
			<MainSidebar/>
      <MobileSidebar/>
			<main>
        <DashboardPage>
          <DashboardPageHeader>
            <DashboardPageHeaderTitle><span></span></DashboardPageHeaderTitle>

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
