import Pusher from 'pusher-js'

let pusherInstance: Pusher | null = null

export const getPusherClient = () => {
  if (pusherInstance) return pusherInstance

  pusherInstance = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY || '', {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || '',
  })

  return pusherInstance
}

export const subscribeToChannel = (channelName: string) => {
  const pusher = getPusherClient()
  return pusher.subscribe(channelName)
}

export const unsubscribeFromChannel = (channelName: string) => {
  const pusher = getPusherClient()
  pusher.unsubscribe(channelName)
}
