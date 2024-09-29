/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control } from 'react-hook-form'
import { z } from 'zod'
import { transformationFormSchema } from './transformation-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'

type CustomFieldProps = {
  control: Control<z.infer<typeof transformationFormSchema>> | undefined
  render: (props: { field: any }) => React.ReactNode
  name: keyof z.infer<typeof transformationFormSchema>
  formLabel?: string
  className?: string
}

export const CustomField = ({
  control, render, name, formLabel, className
}: CustomFieldProps) => {
  return (
    <FormField control={control} name={name} render={({ field }) => (
      <FormItem className={className}>
        {formLabel && <FormLabel>{formLabel}</FormLabel>}
        <FormControl>{render({ field })}</FormControl>
        <FormMessage/>
      </FormItem>
    )}>

    </FormField>
  )
}