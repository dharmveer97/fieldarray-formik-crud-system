import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

/**
 * Generic endpoint to set auth cookies (refreshToken)
 * Used for both OTP success and token refresh scenarios
 */
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      refreshToken?: string
      accessToken?: string
      idToken?: string
      [key: string]: unknown
    }

    const { refreshToken, ...rest } = body

    // Only set refresh token as HTTP-only secure cookie
    // Access token and ID token are stored in memory (Zustand)
    if (refreshToken) {
      const cookieStore = await cookies()

      // Set cookie with proper security flags using Next.js 16 cookies() API
      cookieStore.set('refresh_token', refreshToken, {
        httpOnly: true, // ✅ Prevents client-side JavaScript access
        secure: process.env.NODE_ENV === 'production', // ✅ HTTPS only in production
        sameSite: 'strict', // ✅ CSRF protection
        path: '/', // Available throughout the app
        maxAge: 60 * 60 * 24 * 30, // 30 days in seconds
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Cookies set successfully',
      ...rest,
    })
  } catch (error) {
    console.error('Error setting cookies:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to set cookies',
      },
      { status: 500 },
    )
  }
}
