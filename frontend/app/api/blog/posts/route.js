import { NextResponse } from 'next/server'
import getBlogPosts from '@/lib/queries/getBlogPosts'

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const after = searchParams.get('after')

    try {
        const data = await getBlogPosts(10, after)
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch posts' },
            { status: 500 }
        )
    }
}
