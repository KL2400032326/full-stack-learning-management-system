const COURSE_SYNC_EVENT = 'lms:courses-updated'

export const emitCourseSync = detail => {
  window.dispatchEvent(new CustomEvent(COURSE_SYNC_EVENT, { detail }))
}

export const subscribeToCourseSync = callback => {
  const handler = event => callback(event.detail)
  window.addEventListener(COURSE_SYNC_EVENT, handler)

  return () => {
    window.removeEventListener(COURSE_SYNC_EVENT, handler)
  }
}
