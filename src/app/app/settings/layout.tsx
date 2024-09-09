import { PropsWithChildren } from 'react'
import { SettingsSidebar } from './_components/settings-sidebar'

export default function Layout({ children }: PropsWithChildren) {
	return (
    <div className="grid md:grid-cols-[1rem_1rem] lg:grid-cols-[16rem_40rem] gap-12">
      <aside>
        <SettingsSidebar />
      </aside>
      <div>{children}</div>
    </div>
	)
}
