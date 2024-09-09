'use client'

import { toast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { appearanceFormSchema } from '../schema'
import { z } from 'zod'
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Form,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { SheetFooter } from '@/components/ui/sheet'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'

export function ThemeForm() {
	const theme = useTheme()
	const router = useRouter()
	const form = useForm<z.infer<typeof appearanceFormSchema>>({
		resolver: zodResolver(appearanceFormSchema),
		defaultValues: {
			theme: (theme.theme as 'light' | 'dark') ?? 'light',
		},
	})

	const onSubmit = form.handleSubmit(async (data) => {
		theme.setTheme(data.theme)

		toast({
			title: 'Success',
			description: 'Your profile has been updated successfully.',
		})

		router.replace('/app/settings/theme')
	})
	return (
		<Form {...form}>
			<form onSubmit={onSubmit} className="space-y-8">
				<Card>
					<CardHeader>
						<CardTitle>Preferences</CardTitle>
					</CardHeader>
					<CardContent>
						<FormField
							control={form.control}
							name="theme"
							render={({ field }) => (
								<FormItem className="space-y-1">
									<FormLabel>Theme</FormLabel>
									<FormDescription>
										Select the theme for the dashboard.
									</FormDescription>
									<FormMessage />
									<RadioGroup
										onValueChange={field.onChange}
										defaultValue={field.value}
										className="grid max-w-md grid-cols-2 gap-8 pt-2"
									>
										<FormItem>
											<FormLabel className="[&:has([data-state=checked])>div]:border-primary">
												<FormControl>
													<RadioGroupItem value="light" className="sr-only" />
												</FormControl>
												<div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
													<div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
														<div className="space-y-2 rounded-md bg-[#a3a3a3] p-2 shadow-sm">
															<div className="h-2 w-6 rounded-lg bg-[#ecedef]" />
															<div className="h-2 w-8 rounded-lg bg-[#ecedef]" />
														</div>
														<div className="flex items-center space-x-2 rounded-md bg-[#a3a3a3] p-2 shadow-sm">
															<div className="h-4 w-4 rounded-full bg-[#ecedef]" />
															<div className="h-2 w-8 rounded-lg bg-[#ecedef]" />
														</div>
														<div className="flex items-center space-x-2 rounded-md bg-[#a3a3a3] p-2 shadow-sm">
															<div className="h-4 w-4 rounded-full bg-[#ecedef]" />
															<div className="h-2 w-8 rounded-lg bg-[#ecedef]" />
														</div>
													</div>
												</div>
												<span className="block w-full p-2 text-center font-normal">
													Light
												</span>
											</FormLabel>
										</FormItem>
										<FormItem>
											<FormLabel className="[&:has([data-state=checked])>div]:border-primary">
												<FormControl>
													<RadioGroupItem value="dark" className="sr-only" />
												</FormControl>
												<div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
													<div className="space-y-2 rounded-sm bg-slate-950 p-2">
														<div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
															<div className="h-2 w-6 rounded-lg bg-slate-400" />
															<div className="h-2 w-8 rounded-lg bg-slate-400" />
														</div>
														<div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
															<div className="h-4 w-4 rounded-full bg-slate-400" />
															<div className="h-2 w-8 rounded-lg bg-slate-400" />
														</div>
														<div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
															<div className="h-4 w-4 rounded-full bg-slate-400" />
															<div className="h-2 w-6 rounded-lg bg-slate-400" />
														</div>
													</div>
												</div>
												<span className="block w-full p-2 text-center font-normal">
													Dark
												</span>
											</FormLabel>
										</FormItem>
									</RadioGroup>
								</FormItem>
							)}
						/>
					</CardContent>
					<CardFooter>
						
					</CardFooter>
				</Card>

				<SheetFooter className="mt-auto">
					<Button disabled={form.formState.isLoading} type="submit">
						{form.formState.isSubmitting ? 'Saving...' : 'Save changes'}
					</Button>
				</SheetFooter>
			</form>
		</Form>
	)
}
