export const seedInstructorCourses = [
  {
    id: 'ins-c1',
    title: 'React Architecture Mastery',
    description: 'Design scalable frontend systems with modern React.',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80',
    category: 'Frontend Development',
    totalStudents: 420,
    completion: 78,
    videos: [
      { id: 'v1', title: 'Intro to Architecture', topic: 'Foundations', youtubeLink: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8' },
      { id: 'v2', title: 'State Boundaries', topic: 'Patterns', youtubeLink: 'https://www.youtube.com/watch?v=1i04-A7kfFI' }
    ]
  },
  {
    id: 'ins-c2',
    title: 'Spring Boot APIs for LMS',
    description: 'Build production REST APIs with Spring Boot.',
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=1200&q=80',
    category: 'Backend Development',
    totalStudents: 318,
    completion: 64,
    videos: [
      { id: 'v3', title: 'Project Setup', topic: 'Getting Started', youtubeLink: 'https://www.youtube.com/watch?v=9SGDpanrc8U' }
    ]
  },
  {
    id: 'ins-c3',
    title: 'UI Design Systems',
    description: 'Create consistent and scalable UI systems.',
    thumbnail: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80',
    category: 'Design',
    totalStudents: 280,
    completion: 82,
    videos: [
      { id: 'v4', title: 'Design Tokens', topic: 'Foundation', youtubeLink: 'https://www.youtube.com/watch?v=wc5krf0fZRc' }
    ]
  }
]

export const instructorStudents = [
  { id: 1, name: 'Emma Kim', course: 'React Architecture Mastery', progress: 86 },
  { id: 2, name: 'Liam Woods', course: 'Spring Boot APIs for LMS', progress: 61 },
  { id: 3, name: 'Nina Roy', course: 'UI Design Systems', progress: 92 },
  { id: 4, name: 'Aria Blake', course: 'React Architecture Mastery', progress: 48 },
  { id: 5, name: 'Noah Carter', course: 'Spring Boot APIs for LMS', progress: 70 }
]

export const enrollmentTrend = [
  { month: 'Jan', students: 120 },
  { month: 'Feb', students: 160 },
  { month: 'Mar', students: 200 },
  { month: 'Apr', students: 260 },
  { month: 'May', students: 310 },
  { month: 'Jun', students: 360 }
]

export const completionTrend = [
  { month: 'Jan', completion: 52 },
  { month: 'Feb', completion: 58 },
  { month: 'Mar', completion: 63 },
  { month: 'Apr', completion: 69 },
  { month: 'May', completion: 73 },
  { month: 'Jun', completion: 78 }
]

export const instructorActivity = [
  { id: 1, text: 'Published new lesson in React Architecture Mastery', time: '20 mins ago' },
  { id: 2, text: '24 new students enrolled this week', time: '2 hours ago' },
  { id: 3, text: 'Course completion crossed 75% for UI Design Systems', time: 'Yesterday' }
]

export const defaultInstructorProfile = {
  name: 'Noah Flores',
  email: 'instructor@lms.com',
  avatar: 'https://i.pravatar.cc/120?img=13'
}
