import { transformationTypes } from "@/constants"
import { TransformationsHeader } from "../../../../../components/dashboard/transformation-header"
import TransformationForm from "@/components/dashboard/transformation-form"
import { auth } from "@clerk/nextjs/server"
import { getUserById } from "@/lib/actions/user.actions"
import { redirect } from "next/navigation"

const AddTransformationTypePage = async ({ params: { type }}: SearchParamProps) => {
  const transformation = transformationTypes[type]
  const { userId } = auth()

  if(!userId) redirect('/sign-in')
  const user = await getUserById(userId)
  return (
    <>
    <TransformationsHeader title={transformation.title} subtitle={transformation?.subTitle}/>
    <section className='mt-10'>

      <TransformationForm 
        action="Add" 
        userId={user._id} 
        type={transformation.type as TransformationTypeKey}
        creditBalance={user.creditBalance}
      />
    </section>
    </>
  )
}
export default AddTransformationTypePage 