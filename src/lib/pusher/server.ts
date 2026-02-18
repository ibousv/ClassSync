import Pusher from 'pusher'

let pusherInstance: Pusher | null = null

export const getPusherServer = () => {
  if (pusherInstance) return pusherInstance

  pusherInstance = new Pusher({
    appId: process.env.PUSHER_APP_ID || '',
    key: process.env.PUSHER_KEY || '',
    secret: process.env.PUSHER_SECRET || '',
    cluster: process.env.PUSHER_CLUSTER || '',
    useTLS: true,
  })

  return pusherInstance
}

export const triggerEvent = async (
  channel: string,
  event: string,
  data: any
) => {
  const pusher = getPusherServer()
  await pusher.trigger(channel, event, data)
}
