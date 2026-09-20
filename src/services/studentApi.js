import {
  getAllCourses,
  getPublishedCourses,
  getStudentCourseProgress,
  markStudentVideoComplete,
  setStudentLastWatched
} from './api'
import { getStoredUser } from './authService'

const PROFILE_KEY = 'studentProfileData'
const COURSE_PLACEHOLDER =
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'

const defaultProfile = {
  name: 'Student User',
  email: 'student@lms.com',
  avatar: 'https://i.pravatar.cc/120?img=31'
}

const delay = (ms = 120) => new Promise(resolve => setTimeout(resolve, ms))

const extractVideoId = url => {
  if (!url) return ''

  try {
    const parsed = new URL(url)

    if (parsed.hostname.includes('youtu.be')) {
      return parsed.pathname.replace('/', '')
    }

    if (parsed.searchParams.get('v')) {
      return parsed.searchParams.get('v')
    }

    const shortsMatch = parsed.pathname.match(/\/shorts\/([^/?]+)/)
    if (shortsMatch?.[1]) return shortsMatch[1]
  } catch {
    const fallbackMatch = url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/([^?&]+)/) || url.match(/\/shorts\/([^?&/]+)/)
    if (fallbackMatch?.[1]) return fallbackMatch[1]
  }

  return ''
}

const mapCourseVideosToPlaylist = videos =>
  (Array.isArray(videos) ? videos : []).map((video, index) => ({
    id: String(video.id),
    title: video.title || `Video ${index + 1}`,
    topic: video.topic || video.title || `Topic ${index + 1}`,
    videoId: String(video.id),
    youtubeVideoId: extractVideoId(video.youtubeLink) || '',
    youtubeLink: video.youtubeLink || '',
    assignmentUrl: (video.assignmentUrl || '').trim(),
    duration: 'Video'
  }))

const normalizeRecord = (course, existing = {}) => {
  const validVideoIds = new Set(course.playlist.map(item => item.videoId))
  const completedVideoIds = Array.from(new Set(Array.isArray(existing.completedVideoIds) ? existing.completedVideoIds : []))
    .filter(videoId => validVideoIds.has(videoId))

  const totalVideos = course.playlist.length
  const completedVideos = completedVideoIds.length
  const progress = totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0

  const fallbackVideoId = course.playlist[0]?.videoId || ''
  const lastWatchedVideo = validVideoIds.has(existing.lastWatchedVideo) ? existing.lastWatchedVideo : fallbackVideoId
  const lastTopicFromVideo = course.playlist.find(item => item.videoId === lastWatchedVideo)?.topic || ''

  return {
    courseId: course.id,
    totalVideos,
    completedVideos,
    progress,
    completedVideoIds,
    lastWatchedVideo,
    lastWatchedTopic: existing.lastWatchedTopic || lastTopicFromVideo,
    updatedAt: new Date().toISOString()
  }
}

export const normalizeBackendCourseForStudent = (course, progress = null) => {
  const playlist = mapCourseVideosToPlaylist(course.videos)
  const safeProgress = progress || {
    courseId: course.id,
    totalVideos: playlist.length,
    completedVideos: 0,
    progress: 0,
    completedVideoIds: [],
    lastWatchedVideoId: playlist[0]?.videoId || null,
    lastWatchedTopic: playlist[0]?.topic || ''
  }

  return {
    id: course.id,
    title: course.title,
    description: course.description || 'Course available from LMS catalog.',
    category: course.category || 'General',
    instructor: course.createdByName || 'Instructor',
    instructorId: course.createdById || null,
    imageUrl: course.imageUrl || COURSE_PLACEHOLDER,
    videos: Array.isArray(course.videos) ? course.videos : [],
    enrolledStudentIds: Array.isArray(course.enrolledStudentIds) ? course.enrolledStudentIds : [],
    playlistId: '',
    playlist,
    progress: {
      courseId: safeProgress.courseId,
      totalVideos: safeProgress.totalVideos,
      completedVideos: safeProgress.completedVideos,
      progress: safeProgress.progress,
      completedVideoIds: (safeProgress.completedVideoIds || []).map(String),
      lastWatchedVideo: safeProgress.lastWatchedVideoId != null ? String(safeProgress.lastWatchedVideoId) : '',
      lastWatchedTopic: safeProgress.lastWatchedTopic || ''
    }
  }
}

const fetchBackendCourses = async () => {
  const { data } = await getPublishedCourses()
  return (Array.isArray(data) ? data : []).map(normalizeBackendCourseForStudent)
}

export const getStudentCourses = async () => {
  await delay()
  const currentUser = getStoredUser()
  const rawCourses = await getPublishedCourses()
  const courses = Array.isArray(rawCourses.data) ? rawCourses.data : []
  const enrolledCourses = currentUser?.id
    ? courses.filter(course => course.enrolledStudentIds.includes(currentUser.id))
    : []

  const coursesWithProgress = await Promise.all(
    enrolledCourses.map(async course => {
      try {
        const { data } = await getStudentCourseProgress(currentUser.id, course.id)
        return normalizeBackendCourseForStudent(course, data)
      } catch {
        return normalizeBackendCourseForStudent(course)
      }
    })
  )

  return coursesWithProgress
}

export const getStudentProgress = async () => {
  await delay()
  const courses = await getStudentCourses()
  return courses.map(course => course.progress)
}

export const getCourseProgress = async courseId => {
  await delay(60)
  const courses = await getStudentCourses()
  const course = courses.find(item => item.id === Number(courseId) || String(item.id) === String(courseId))
  return course?.progress || null
}

export const markVideoCompleted = async (courseId, videoId) => {
  await delay(60)
  const currentUser = getStoredUser()
  if (!currentUser?.id) return null

  const { data } = await markStudentVideoComplete(Number(currentUser.id), Number(courseId), Number(videoId))
  return {
    courseId: data.courseId,
    totalVideos: data.totalVideos,
    completedVideos: data.completedVideos,
    progress: data.progress,
    completedVideoIds: (data.completedVideoIds || []).map(String),
    lastWatchedVideo: data.lastWatchedVideoId != null ? String(data.lastWatchedVideoId) : '',
    lastWatchedTopic: data.lastWatchedTopic || ''
  }
}

export const updateLastWatchedVideo = async (courseId, videoId) => {
  await delay(40)
  const currentUser = getStoredUser()
  if (!currentUser?.id) return null

  const { data } = await setStudentLastWatched(Number(currentUser.id), Number(courseId), Number(videoId))
  return {
    courseId: data.courseId,
    totalVideos: data.totalVideos,
    completedVideos: data.completedVideos,
    progress: data.progress,
    completedVideoIds: (data.completedVideoIds || []).map(String),
    lastWatchedVideo: data.lastWatchedVideoId != null ? String(data.lastWatchedVideoId) : '',
    lastWatchedTopic: data.lastWatchedTopic || ''
  }
}

export const getStudentProfile = async () => {
  await delay()
  const raw = localStorage.getItem(PROFILE_KEY)
  if (!raw) return defaultProfile

  try {
    const parsed = JSON.parse(raw)
    return { ...defaultProfile, ...parsed }
  } catch {
    return defaultProfile
  }
}

export const updateStudentProfile = async payload => {
  await delay()
  const next = { ...defaultProfile, ...payload }
  localStorage.setItem(PROFILE_KEY, JSON.stringify(next))
  return next
}

export const getCertificates = async () => {
  await delay()
  const coursesWithProgress = await getStudentCourses()
  return coursesWithProgress.filter(item => item.progress.progress === 100)
}

export const getRecentActivity = async () => {
  await delay()
  const coursesWithProgress = await getStudentCourses()

  return coursesWithProgress
    .filter(item => item.progress.completedVideos > 0)
    .slice(0, 4)
    .map(item => ({
      id: item.id,
      title: item.title,
      text: `Watched ${item.progress.completedVideos}/${item.progress.totalVideos} videos`,
      time: 'Recently'
    }))
}
