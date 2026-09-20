import {
  createCourseVideo,
  deleteCourseVideo,
  getAllCourses,
  getVideoLinks,
  updateCourseVideo
} from './api'

const PROFILE_KEY = 'creator-profile'

const defaultCreatorProfile = {
  name: 'Content Creator',
  email: 'creator@lms.com',
  avatar: 'https://i.pravatar.cc/120?img=47'
}

const delay = (ms = 100) => new Promise(resolve => setTimeout(resolve, ms))

const getMonthLabel = dateValue =>
  new Date(dateValue).toLocaleString('en-US', {
    month: 'short'
  })

const DEFAULT_THUMBNAIL = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80'

const mapVideoLinkToContent = (item, courseImageMap) => ({
  id: item.videoId,
  title: item.videoTitle,
  courseId: item.courseId,
  courseName: item.courseName,
  topicName: item.topicName,
  youtubeLink: item.youtubeLink,
  thumbnail: courseImageMap.get(String(item.courseId)) || DEFAULT_THUMBNAIL,
  uploadDate: item.createdAt ? new Date(item.createdAt).toISOString().slice(0, 10) : '',
  usagePercent: 0,
  instructorName: item.instructorName,
  category: item.category
})

const loadCourses = async () => {
  const { data } = await getAllCourses()
  return Array.isArray(data) ? data : []
}

export const getCreatorContent = async () => {
  const [videoLinksResponse, courses] = await Promise.all([getVideoLinks(), loadCourses()])
  const courseImageMap = new Map(
    (Array.isArray(courses) ? courses : []).map(course => [String(course.id), course.imageUrl || ''])
  )
  const data = videoLinksResponse.data
  return (Array.isArray(data) ? data : []).map(item => mapVideoLinkToContent(item, courseImageMap))
}

export const uploadContent = async payload => {
  const courses = await loadCourses()
  const selectedCourse = courses.find(course => String(course.id) === String(payload.courseId))

  if (!selectedCourse) {
    throw new Error('Please select a valid backend course.')
  }

  const { data } = await createCourseVideo({
    title: payload.title.trim(),
    topic: payload.topicName.trim(),
    youtubeLink: payload.youtubeLink.trim(),
    courseId: selectedCourse.id
  })

  return {
    id: data.id,
    title: data.title,
    courseId: selectedCourse.id,
    courseName: selectedCourse.title,
    topicName: data.topic,
    youtubeLink: data.youtubeLink,
    thumbnail: payload.thumbnail || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    uploadDate: new Date().toISOString().slice(0, 10),
    usagePercent: 0
  }
}

export const editContent = async (contentId, patch) => {
  const courses = await loadCourses()
  const selectedCourse = courses.find(course => String(course.id) === String(patch.courseId))

  if (!selectedCourse) {
    throw new Error('Please select a valid backend course.')
  }

  const { data } = await updateCourseVideo(contentId, {
    title: patch.title.trim(),
    topic: patch.topicName.trim(),
    youtubeLink: patch.youtubeLink.trim(),
    courseId: selectedCourse.id
  })

  return {
    id: data.id,
    title: data.title,
    courseId: selectedCourse.id,
    courseName: selectedCourse.title,
    topicName: data.topic,
    youtubeLink: data.youtubeLink,
    thumbnail: patch.thumbnail || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    uploadDate: new Date().toISOString().slice(0, 10),
    usagePercent: 0
  }
}

export const deleteContent = async contentId => {
  await deleteCourseVideo(contentId)
  return true
}

export const getCreatorDashboardStats = async () => {
  const [content, courses] = await Promise.all([getCreatorContent(), loadCourses()])

  return {
    totalContentsCreated: content.length,
    totalCoursesUsingContent: new Set(content.map(item => item.courseName)).size,
    totalVideosUploaded: content.length,
    contentUsage: courses.length ? Math.round((content.length / Math.max(courses.length, 1)) * 100) : 0
  }
}

export const getCreatorAnalytics = async () => {
  const content = await getCreatorContent()
  const distributionMap = content.reduce((acc, item) => {
    acc[item.courseName] = (acc[item.courseName] || 0) + 1
    return acc
  }, {})

  const trendMap = content.reduce((acc, item) => {
    const key = item.uploadDate || new Date().toISOString().slice(0, 10)
    const month = getMonthLabel(key)
    acc[month] = (acc[month] || 0) + 1
    return acc
  }, {})

  return {
    usageTrend: Object.entries(trendMap).map(([month, usage]) => ({ month, usage })),
    distribution: Object.entries(distributionMap).map(([course, value]) => ({ course, value }))
  }
}

export const getCreatorCourses = async () => {
  const courses = await loadCourses()
  return courses.map(course => ({
    id: course.id,
    title: course.title
  }))
}

export const getCreatorProfile = async () => {
  await delay(80)
  const raw = localStorage.getItem(PROFILE_KEY)
  if (!raw) return defaultCreatorProfile

  try {
    return { ...defaultCreatorProfile, ...JSON.parse(raw) }
  } catch {
    return defaultCreatorProfile
  }
}

export const updateCreatorProfile = async payload => {
  await delay(90)
  const next = { ...defaultCreatorProfile, ...payload }
  localStorage.setItem(PROFILE_KEY, JSON.stringify(next))
  return next
}
