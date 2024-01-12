export default defineEventHandler(async (event) => {
  const accessToken = getCookie(event, 'accessToken')
  if (accessToken || event.node.req.url === '/signin')
    return

  sendRedirect(event, '/signin', 301)
})
