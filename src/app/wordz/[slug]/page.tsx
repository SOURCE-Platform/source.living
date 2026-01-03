import { VIDEOS } from '@/data/videos'
import { VideoPlayerClient } from '@/components/video-player-client'

export async function generateStaticParams() {
    return VIDEOS.map((video) => ({
        slug: video.slug,
    }))
}

export default async function VideoPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params
    return (
        <VideoPlayerClient slug={params.slug} />
    )
}
