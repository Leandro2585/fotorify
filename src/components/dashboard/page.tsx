import { cn } from '@/lib/utils'

export type DashboardPageGenericProp<T = unknown> = {
	children: React.ReactNode
	className?: string
} & T

export function DashboardPage({
	children,
	className,
}: DashboardPageGenericProp) {
	return <section className={cn(['h-screen', className])}>{children}</section>
}

export function DashboardPageHeader({
	children,
	className,
}: DashboardPageGenericProp) {
	return (
		<header
			className={cn([
				'px-8 h-12 border-b border-border flex items-center justify-between',
				className,
			])}
		>
			{children}
		</header>
	)
}

export function DashboardPageHeaderTitle({
	children,
	className,
}: DashboardPageGenericProp) {
	return (
		<span
			className={cn(['text-sm text-muted-foreground uppercase', className])}
		>
			{children}
		</span>
	)
}

export function DashboardPageHeaderNav({
	children,
	className,
}: DashboardPageGenericProp) {
	return <nav className={cn(['', className])}>{children}</nav>
}

export function DashboardPageMain({
	children,
	className,
}: DashboardPageGenericProp) {
	return <main className={cn(['p-6', className])}>{children}</main>
}
