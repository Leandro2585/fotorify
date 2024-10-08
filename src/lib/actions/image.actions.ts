'use server'
/* eslint-disable @typescript-eslint/no-explicit-any */

import { handleError } from "@/lib/utils"
import { connectToDatabase } from "../database/mongoose"
import { revalidatePath } from "next/cache"
import User from "../database/models/user.model"
import Image from "../database/models/image.model"
import { redirect } from "next/navigation"

const populateUser = (query: any) => query.populate({
  path: 'author',
  model: User,
  select: '_id firstName lastName'
})

export const addImage = async ({ image, userId, path }: AddImageParams) => {
  try {
    await connectToDatabase()
    const author = await User.findById(userId)
    if(!author) throw new Error('User not found')
    const newImage = await Image.create({
       ...image,
       author: author._id
    })
    revalidatePath(path)

    return JSON.parse(JSON.stringify(newImage))
  } catch (error) {
    handleError(error)
  }
}

export const updateImage = async ({ image, userId, path }: UpdateImageParams) => {
  try {
    await connectToDatabase()
    const imageToUpdate = await Image.findById(image._id)
    if(!imageToUpdate || imageToUpdate.author.toHexString() !== userId) throw new Error('Unauthorized or image not found')
    const updatedImage = await Image.findByIdAndUpdate(imageToUpdate._id, image, { new: true })
    revalidatePath(path)

    return JSON.parse(JSON.stringify(updatedImage))
  } catch (error) {
    handleError(error)
  }
}

export const deleteImage = async (imageId: string) => {
  try {
    await connectToDatabase()
    await Image.findByIdAndDelete(imageId)
  } catch (error) {
    handleError(error)
  } finally {
    redirect('/')
  }
}

export const getImageById = async (imageId: string) => {
  try {
    await connectToDatabase()
    const image = await populateUser(Image.findById(imageId))
    if(!image) throw new Error('Image not found')
  } catch (error) {
    handleError(error)
  }
}