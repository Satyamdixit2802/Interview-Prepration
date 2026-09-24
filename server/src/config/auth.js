const isProduction = process.env.NODE_ENV === 'production'

const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1d'
const cookieMaxAge = Number(process.env.JWT_COOKIE_MAX_AGE_MS) || 24 * 60 * 60 * 1000

const authCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'none' : 'lax',
  path: '/',
  maxAge: cookieMaxAge,
}

const clearAuthCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'none' : 'lax',
  path: '/',
}

export { authCookieOptions, clearAuthCookieOptions, jwtExpiresIn }
