import { PropsWithChildren } from 'react'
import { SettingsSidebar } from './_components/settings-sidebar'

export default function Layout({ children }: PropsWithChildren) {
	return (
    <div className="grid grid-cols-[16rem_40rem] gap-12">
      <aside>
        <SettingsSidebar />
      </aside>
      <div>{children}</div>
    </div>
	)
}
