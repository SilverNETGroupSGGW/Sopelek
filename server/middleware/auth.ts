export default defineEventHandler(async (event) => {
  const accessToken = getCookie(event, 'accessToken')
  if (accessToken || event.node.req.url === '/signin')
    return

  if (accessToken && event.node.req.url === '/signin')
    sendRedirect(event, '/lecturers', 301)

  sendRedirect(event, '/signin', 301)
})
