export const courses = [
  {
    id: 'java-course',
    title: 'Java Full Course',
    instructor: 'Telusko',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    playlistId: 'PLsyeobzWxl7pe_IiTfNyr55kwJPWbgxB5',
    playlist: [
      { videoId: 'java-01', topic: 'Introduction to Java', duration: '10:20' },
      { videoId: 'java-02', topic: 'Variables in Java', duration: '15:45' },
      { videoId: 'java-03', topic: 'Data Types', duration: '20:10' },
      { videoId: 'java-04', topic: 'Operators', duration: '14:35' },
      { videoId: 'java-05', topic: 'Control Statements', duration: '18:50' },
      { videoId: 'java-06', topic: 'Loops', duration: '16:25' },
      { videoId: 'java-07', topic: 'Arrays', duration: '19:10' },
      { videoId: 'java-08', topic: 'Strings', duration: '13:40' },
      { videoId: 'java-09', topic: 'OOP Concepts', duration: '22:30' },
      { videoId: 'java-10', topic: 'Exception Handling', duration: '17:55' }
    ]
  },
  {
    id: 'python-course',
    title: 'Python Full Course',
    instructor: 'Telusko',
    thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80',
    playlistId: 'PLsyeobzWxl7poL9JTVyndKe62ieoN-MZ3',
    playlist: [
      { videoId: 'python-01', topic: 'Python Introduction', duration: '09:40' },
      { videoId: 'python-02', topic: 'Variables and Input', duration: '12:20' },
      { videoId: 'python-03', topic: 'Data Types', duration: '17:10' },
      { videoId: 'python-04', topic: 'Conditions', duration: '13:30' },
      { videoId: 'python-05', topic: 'Loops', duration: '16:05' },
      { videoId: 'python-06', topic: 'Functions', duration: '14:55' }
    ]
  },
  {
    id: 'react-course',
    title: 'React JS Course',
    instructor: 'Telusko',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80',
    playlistId: 'PLsyeobzWxl7r2ZX1fl-7CKnayxHJA_1ol',
    playlist: [
      { videoId: 'react-01', topic: 'React Introduction', duration: '11:30' },
      { videoId: 'react-02', topic: 'Components', duration: '15:10' },
      { videoId: 'react-03', topic: 'Props and State', duration: '19:45' },
      { videoId: 'react-04', topic: 'Hooks', duration: '18:00' }
    ]
  },
  {
    id: 'spring-boot-course',
    title: 'Spring Boot Course',
    instructor: 'Telusko',
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=1200&q=80',
    playlistId: 'PLsyeobzWxl7qbKoSgR5ub6jolI8-ocxCF',
    playlist: [
      { videoId: 'spring-01', topic: 'Spring Boot Basics', duration: '12:10' },
      { videoId: 'spring-02', topic: 'REST Controller', duration: '15:20' },
      { videoId: 'spring-03', topic: 'JPA Integration', duration: '21:40' },
      { videoId: 'spring-04', topic: 'Exception Handling', duration: '14:30' }
    ]
  },
  {
    id: 'mysql-course',
    title: 'MySQL Course',
    instructor: 'FreeCodeCamp',
    thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80',
    playlist: [{ videoId: 'HXV3zeQKqGY', topic: 'MySQL Full Course', duration: '03:10:00' }]
  },
  {
    id: 'html-css-course',
    title: 'HTML CSS Course',
    instructor: 'SuperSimpleDev',
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
    playlist: [{ videoId: 'G3e-cpL7ofc', topic: 'HTML CSS Full Course', duration: '06:31:00' }]
  }
]

export const getProgressKey = courseId => `${courseId}-progress`

export const getCourseProgressState = courseId => {
  const raw = localStorage.getItem(getProgressKey(courseId))
  if (!raw) return { completedVideos: [], completedTopics: [], lastWatchedTopic: '' }

  try {
    const parsed = JSON.parse(raw)
    return {
      completedVideos: Array.isArray(parsed.completedVideos) ? parsed.completedVideos : [],
      completedTopics: Array.isArray(parsed.completedTopics) ? parsed.completedTopics : [],
      lastWatchedTopic: parsed.lastWatchedTopic || ''
    }
  } catch {
    return { completedVideos: [], completedTopics: [], lastWatchedTopic: '' }
  }
}

export const saveCourseProgressState = (courseId, data) => {
  localStorage.setItem(
    getProgressKey(courseId),
    JSON.stringify({
      completedVideos: data.completedVideos || [],
      completedTopics: data.completedTopics || [],
      lastWatchedTopic: data.lastWatchedTopic || ''
    })
  )
}

export const getCourseSummary = (course, state) => {
  const totalTopics = course.playlist.length
  const completedVideos = Array.isArray(state.completedVideos) ? state.completedVideos : []
  const completedTopics = course.playlist.filter(item => completedVideos.includes(item.videoId)).length
  const progress = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0
  const completed = totalTopics > 0 && completedTopics === totalTopics

  return {
    totalTopics,
    completedTopics,
    progress,
    completed,
    lastWatchedTopic: state.lastWatchedTopic || course.playlist[0]?.topic || ''
  }
}
