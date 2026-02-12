import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

/**
 * Endpoint to clear auth cookies on logout or session invalidation
 */
export async function POST() {
  try {
    const cookieStore = await cookies()

    // Get the current cookie value before deleting (for verification)
    // const existingCookie = cookieStore.get('refresh_token')

    // Clear the refresh token cookie by setting it with maxAge: 0
    // This ensures the cookie is actually deleted from the browser
    cookieStore.set('refresh_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 0, // Expire immediately
    })

    // console.log('Cookie cleared:', {
    //   hadCookie: !!existingCookie,
    //   environment: process.env.NODE_ENV,
    // })

    return NextResponse.json({
      success: true,
      message: 'Cookies cleared successfully',
    })
  } catch (error) {
    console.error('Error clearing cookies:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to clear cookies',
      },
      { status: 500 },
    )
  }
}
