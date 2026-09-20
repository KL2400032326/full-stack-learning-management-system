import { getStoredUser } from '../services/authService'
import { updateCourseImageUrl } from '../services/api'

export const saveCourseImage = async ({ courseId, imageUrl }) => {
  const currentUser = getStoredUser()

  if (!currentUser?.id) {
    throw new Error('Please log in again before updating the course image.')
  }

  const trimmedImageUrl = (imageUrl || '').trim()
  if (!trimmedImageUrl) {
    throw new Error('Please enter a course image URL.')
  }

  const { data } = await updateCourseImageUrl(courseId, {
    imageUrl: trimmedImageUrl,
    updatedBy: currentUser.id
  })

  return data
}
