import { RootPage } from '@payloadcms/next/views'
import config from '@/payload/payload.config'

const Page = (props: any) => RootPage({ ...props, config })

export default Page
