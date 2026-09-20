import axios from 'axios'

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:2026/api'
const getAuthToken = () =>
  localStorage.getItem('token') ||
  localStorage.getItem('lms-token') ||
  localStorage.getItem('userToken')

const api = axios.create({
  baseURL: API,
  timeout: 12000,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(config => {
  const token = getAuthToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

export const getAllCourses = () => axios.get(`${API}/courses`)

export const getPublishedCourses = () => axios.get(`${API}/courses/published`)

export const getPendingContentApprovals = () => axios.get(`${API}/admin/content-approvals`)

export const getPendingVideoApprovals = () => api.get('/videos/admin/pending')

export const enrollCourse = async courseId => {
  const token = getAuthToken()

  if (!token) {
    throw new Error('Please login first')
  }

  return axios.post(
    `${API}/student/enroll/${courseId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  )
}

export const createInstructorCourse = payload => api.post('/instructor/courses', payload)

export const updateInstructorCourse = (id, payload) => api.put(`/instructor/courses/${id}`, payload)

export const updateCourseImageUrl = (courseId, payload) => api.put(`/courses/${courseId}/image-url`, payload)

export const updateCourseApprovalStatus = (courseId, payload) => api.put(`/admin/courses/${courseId}/approval`, payload)

export const updateVideoApprovalStatus = (videoId, payload) => api.put(`/videos/admin/${videoId}/approval`, payload)

export const getCourseVideos = courseId => api.get(`/videos/${courseId}`)

export const createCourseVideo = payload => api.post('/videos', payload)

export const updateCourseVideo = (videoId, payload) => api.put(`/videos/${videoId}`, payload)
export const updateVideoAssignmentUrl = (videoId, payload) => api.put(`/videos/${videoId}/assignment`, payload)

export const deleteCourseVideo = videoId => api.delete(`/videos/${videoId}`)
export const deleteInstructorCourse = courseId => api.delete(`/instructor/courses/${courseId}`)

export const getVideoLinks = () => api.get('/video-links')

export const getStudentCourseProgress = (studentId, courseId) => api.get(`/student/${studentId}/courses/${courseId}/progress`)

export const markStudentVideoComplete = (studentId, courseId, videoId) =>
  api.post(`/student/${studentId}/courses/${courseId}/progress/complete/${videoId}`)

export const setStudentLastWatched = (studentId, courseId, videoId) =>
  api.post(`/student/${studentId}/courses/${courseId}/progress/watch/${videoId}`)

export const getAllUsers = () => api.get('/admin/users')

export const getAdminCourses = () => api.get('/admin/courses')

export const getAdminInstructors = () => api.get('/admin/instructors')

export const getAdminStudents = () => api.get('/admin/students')

export const deleteUser = id => api.delete(`/admin/users/${id}`)

export const getProfileUrl = userId => api.get(`/profile-url/${userId}`)

export const updateProfileUrl = (userId, payload) => api.put(`/profile-url/${userId}`, payload)

export const getLandingStats = () => axios.get(`${API}/landing-stats`)

export default api
