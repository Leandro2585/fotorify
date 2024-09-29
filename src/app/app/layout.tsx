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
            <div className="container max-w-screen">
              <div className="grid sm:grid-cols-[1fr_1fr] min-sm:grid-cols-[1fr] gap-12">
                <div>{children}</div>
              </div>
            </div>
          </DashboardPageMain>
        </DashboardPage>
      </main>
		</div>
	)
}
