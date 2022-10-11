import { NextResponse } from 'next/server'

const signedInPages = ['/', '/playlist', '/library']

const redirect = (req) => {
    const url = req.nextUrl.clone()
    url.pathname = '/signin'
    return NextResponse.rewrite(url)
}

const findPage = (pages: string[], pathname: string) =>
    pages.indexOf(pathname) !== -1

export default function middleware(req) {
    const pathname = req.nextUrl.pathname

    if (findPage(signedInPages, pathname)) {
        const token = req?.cookie?.MUSIC_B0X_ACCESS_TOKEN

        if (!token) {
            redirect(req)
        }
    }
}
