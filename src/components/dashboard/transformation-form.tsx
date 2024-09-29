/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from "@/components/ui/input"
import { aspectRatioOptions, defaultValues, transformationTypes } from '@/constants'
import { CustomField } from './custom-field'
import { Form } from '../ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { AspectRatioKey, debounce, deepMergeObjects } from '@/lib/utils'
import { Button } from '../ui/button'
import { updateCredits } from '@/lib/actions/user.actions'
import { MediaUploader } from './media-uploader'

export const transformationFormSchema = z.object({
  title: z.string(),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string()
})


const TransformationForm = ({ action, data = null, type, config = null, userId, creditBalance }: TransformationFormProps) => {
  const transformationType = transformationTypes[type]
  const [image, setImage] = useState(data)
  const [newTransformation, setNewTransformation] = useState<Transformations | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isTransforming, setIsTransforming] = useState(false)
  const [transformationConfig, setTransformantionConfig] = useState(config)
  const [isPending, startTransition] = useTransition()
  const initialValues = data && action === 'Update' ? {
    title: data?.title,
    aspectRatio: data?.aspectRatio,
    color: data?.color,
    prompt: data?.prompt,
    publicId: data?.publicId
  } : defaultValues

  const form = useForm<z.infer<typeof transformationFormSchema>>({
    resolver: zodResolver(transformationFormSchema),
    
  })

  const onSubmit = useCallback((values: z.infer<typeof transformationFormSchema>) => {
    console.log(values)
  }, [])

  const onSelectFieldHandler = useCallback((value: string, onChangeField: (value: string) => void) => {
    const imgSize = aspectRatioOptions[value as AspectRatioKey]
    setImage((prevState: any) => ({
      ...prevState,
      aspectRatio: imgSize.aspectRatio,
      width: imgSize.width,
      height: imgSize.height
    }))

    setNewTransformation(transformationType.config)
    return onChangeField(value) 
  }, [])

  const onInputChangeHandler = useCallback((fieldName: string, value: string, type: TransformationTypeKey, onChangeField: (value: string) => void) => {
    debounce(() => {
      setNewTransformation((prevState) => ({
        ...prevState,
        [type]: {
          ...prevState?.[type],
          [fieldName === 'prompt'? 'prompt' : 'to']: value
        }

      }))

      return onChangeField(value)
    }, 500)
  }, [])

  // TODO: Return to updateCredits
  const onTransformHandler = useCallback(async () => {
    setIsTransforming(true)
    setTransformantionConfig(deepMergeObjects(newTransformation, transformationConfig))

    setNewTransformation(null)
    startTransition(async () => {
      // await updateCredits(userId, creditFee)
    })
  }, [])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CustomField 
          control={form.control} 
          name="title"
          formLabel="Image Title"
          render={({ field }) => <Input {...field}/>}
        />

        {type === 'fill' && (
          <CustomField
            control={form.control}
            name="aspectRatio"
            formLabel="Aspect Ratio"
            className='w-full'
            render={({ field }) => (
              <Select onValueChange={(value) => onSelectFieldHandler(value, field.onChange)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select size"/>
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(aspectRatioOptions).map((key) => (
                    <SelectItem key={key} value={key}>
                      {aspectRatioOptions[key as AspectRatioKey].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        )}

        {['remove', 'recolor'].includes(type) && (
          <div className="prompt-field">
            <CustomField
              control={form.control}
              name='prompt'
              formLabel={type === "remove" ? 'Object to remove' : 'Object to recolor' }
              className="w-full"
              render={({ field }) => (
                <Input value={field.value} onChange={(e) => onInputChangeHandler('prompt', e.target.value, type, field.onChange)}/>
              )}
            />

            {type === 'recolor' && (
              <CustomField
                control={form.control}
                name='color'
                formLabel='Replacement Color'
                className='w-full'
                render={({ field }) => (
                  <Input 
                    value={field.value}
                    onChange={(e) => onInputChangeHandler('color', e.target.value, type, field.onChange)}
                  />
                )}
              />
            )}
          </div>
        )}

        <div className="media-uploader-field">
          <CustomField
            control={form.control}
            name="publicId"
            className="flex size-full flex-col"
            render={({ field }) => (
              <MediaUploader 
                onValueChange={field.onChange}
                setImage={setImage}
                publicId={field.value}
                image={image}
                type={type}
              />
            )}
          />
        </div>
        <div className='flex flex-col gap-4'>
          <Button 
            type="button"
            className="capitalize"
            variant={'secondary'}
            disabled={isTransforming || newTransformation === null}
            onClick={onTransformHandler}
          >
            {isTransforming ? 'Transforming...' : 'Apply transformation'}
          </Button>
          <Button 
            type="submit"
            className="capitalize"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Save Image'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default TransformationForm