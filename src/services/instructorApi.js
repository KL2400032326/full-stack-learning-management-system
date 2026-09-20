import api, { getAllCourses } from './api'
import { deleteCourseVideo as deleteCourseVideoRequest } from './api'
import { deleteInstructorCourse as deleteInstructorCourseRequest } from './api'
import { updateVideoAssignmentUrl as updateVideoAssignmentUrlRequest } from './api'
import { updateCourseImageUrl as updateCourseImageUrlRequest } from './api'
import { getStoredUser } from './authService'
import { emitCourseSync } from '../utils/courseSync'
import {
  defaultInstructorProfile,
  instructorActivity,
} from '../data/instructorCourses'

const PROFILE_KEY = 'instructor-profile'
const COURSE_PLACEHOLDER =
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'

const delay = (ms = 120) => new Promise(resolve => setTimeout(resolve, ms))

const normalizeCourse = course => ({
  ...course,
  imageUrl: course.imageUrl || COURSE_PLACEHOLDER,
  totalStudents: Array.isArray(course.enrolledStudentIds) ? course.enrolledStudentIds.length : 0,
  completion: course.completion || 0,
  videos: Array.isArray(course.videos) ? course.videos : []
})

const toNumber = value => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

const getInstructorUser = () => {
  const user = getStoredUser()
  return user?.id ? user : null
}

export const getInstructorCourses = async () => {
  const instructor = getInstructorUser()
  const { data } = await getAllCourses()
  const courses = Array.isArray(data) ? data : []

  const filteredCourses = instructor
    ? courses.filter(course => course.createdById === instructor.id)
    : courses

  return filteredCourses.map(normalizeCourse)
}

export const getInstructorCourseById = async courseId => {
  const targetId = toNumber(courseId)
  if (targetId === null) return null

  const courses = await getInstructorCourses()
  return courses.find(item => item.id === targetId) || null
}

export const getPrimaryInstructorCourseId = async () => {
  const courses = await getInstructorCourses()
  return courses[0]?.id || null
}

export const createCourse = async payload => {
  const instructor = getInstructorUser()
  if (!instructor) {
    throw new Error('Please log in as an instructor again before creating a course.')
  }

  const { data } = await api.post('/instructor/courses', {
    title: payload.title.trim(),
    description: payload.description.trim(),
    imageUrl: payload.imageUrl?.trim() || '',
    category: payload.category,
    createdBy: instructor.id
  })

  return normalizeCourse(data)
}

export const updateCourse = async (courseId, patch) => {
  const existingCourse = await getInstructorCourseById(courseId)
  if (!existingCourse) {
    throw new Error('Course not found.')
  }

  const { data } = await api.put(`/instructor/courses/${courseId}`, {
    title: patch.title.trim(),
    description: patch.description.trim(),
    imageUrl: patch.imageUrl?.trim() || '',
    category: patch.category,
    createdBy: existingCourse.createdById
  })

  return normalizeCourse(data)
}

export const updateCourseImageUrl = async (courseId, imageUrl) => {
  const user = getInstructorUser()
  if (!user) {
    throw new Error('Please log in again before updating the course image.')
  }

  const { data } = await updateCourseImageUrlRequest(courseId, {
    imageUrl,
    updatedBy: user.id
  })

  return normalizeCourse(data)
}

export const uploadVideo = async (courseId, video) => {
  await api.post('/videos', {
    title: video.title.trim(),
    topic: video.topic.trim(),
    youtubeLink: video.youtubeLink.trim(),
    assignmentUrl: video.assignmentUrl?.trim() || '',
    courseId: toNumber(courseId)
  })

  return getInstructorCourseById(courseId)
}

export const updateVideoAssignmentUrl = async (videoId, assignmentUrl) => {
  const trimmed = assignmentUrl?.trim() || ''
  if (!trimmed) {
    throw new Error('Assignment link is required.')
  }

  const { data } = await updateVideoAssignmentUrlRequest(videoId, {
    assignmentUrl: trimmed
  })

  return data
}

export const deleteVideo = async (courseId, videoId) => {
  await deleteCourseVideoRequest(videoId)
  const updatedCourse = await getInstructorCourseById(courseId)
  emitCourseSync({ type: 'video-deleted', courseId, videoId })
  return updatedCourse
}

export const deleteCourse = async courseId => {
  await deleteInstructorCourseRequest(courseId)
  emitCourseSync({ type: 'course-deleted', courseId })
  return courseId
}

export const getInstructorStudents = async () => {
  const instructor = getInstructorUser()
  if (!instructor) {
    throw new Error('Please log in as an instructor again before viewing students.')
  }

  const { data } = await api.get(`/instructor/${instructor.id}/students`)
  return Array.isArray(data) ? data : []
}

export const getInstructorAnalytics = async () => {
  const [courses, students] = await Promise.all([getInstructorCourses(), getInstructorStudents()])

  const enrollmentTrend = courses.map(course => ({
    label: course.title,
    students: course.totalStudents
  }))

  const completionTrend = courses.map(course => {
    const relatedStudents = students.filter(student => student.course === course.title)
    const averageProgress = relatedStudents.length
      ? Math.round(relatedStudents.reduce((sum, student) => sum + (student.progress || 0), 0) / relatedStudents.length)
      : 0

    return {
      label: course.title,
      completion: averageProgress
    }
  })

  return {
    enrollmentTrend,
    completionTrend
  }
}

export const getInstructorActivity = async () => {
  await delay(80)
  return instructorActivity
}

export const getInstructorMetrics = async () => {
  const [courses, students] = await Promise.all([getInstructorCourses(), getInstructorStudents()])
  const totalCourses = courses.length
  const totalStudents = courses.reduce((sum, item) => sum + item.totalStudents, 0)
  const totalVideos = courses.reduce((sum, item) => sum + item.videos.length, 0)
  const completionRate = students.length
    ? Math.round(students.reduce((sum, student) => sum + (student.progress || 0), 0) / students.length)
    : 0

  return {
    totalCourses,
    totalStudents,
    totalVideos,
    completionRate
  }
}

export const getInstructorProfile = async () => {
  await delay(80)
  const raw = localStorage.getItem(PROFILE_KEY)
  if (!raw) return defaultInstructorProfile

  try {
    return { ...defaultInstructorProfile, ...JSON.parse(raw) }
  } catch {
    return defaultInstructorProfile
  }
}

export const updateInstructorProfile = async payload => {
  await delay(90)
  const next = { ...defaultInstructorProfile, ...payload }
  localStorage.setItem(PROFILE_KEY, JSON.stringify(next))
  return next
}
