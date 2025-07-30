// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";

// export const publicRoutes = [""];
// export const authRoutes = ["/login", "/signup"];
// export const protectedRoutes = [
//   "/",
//   "/admin",
//   "/admin/settings",
//   "/admin/movie-import",
//   "/user",
//     "/user/favorites",
//     "/user/watchlist",
//     "/user/watchhistory",
//     "/user/settings",
//     "/user/trending",
//     "/user/changepassword",
//     "/user/movie",
//     "/user/movie/[id]",
// ];

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   console.log("Middleware running for page navigation:", pathname);

//   const isAuthRoute = authRoutes.some(route =>
//     pathname === route ||
//     (route.includes("[") && pathname.startsWith(route.split("[")[0]))
//   );

//   const isProtectedRoute = protectedRoutes.some(route =>
//     pathname === route ||
//     (route.includes("[") && pathname.startsWith(route.split("[")[0]))
//   );

//   const token = request.cookies.get("access_token");

//   if (isAuthRoute && token) {
//     console.log("User already authenticated, redirecting to homepage");
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   if (isProtectedRoute && !token) {
//     console.log("No token found, redirecting to login");
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     ...protectedRoutes.map(route => route.replace("[id]", "*")),

//     ...authRoutes
//   ]
// };
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const publicRoutes = ["/"];
const authRoutes = ["/login", "/signup"];

function decodeToken(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname.replace(/\/$/, "") || "/";
  const tokenCookie = request.cookies.get("access_token");
  const token = tokenCookie?.value;

  // Debug logging to see what's happening
  if (process.env.NODE_ENV === "development") {
    console.log("🔍 Middleware:", pathname);
    console.log("🪙 Token exists:", !!token);
  }

  // Check route patterns
  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);
  const isAdminRoute = pathname.startsWith('/admin');
  const isUserRoute = pathname.startsWith('/user');

  // Allow access to public routes
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // If user is on auth routes and already has token, redirect based on role
  if (isAuthRoute && token) {
    const payload = decodeToken(token);
    if (payload) {
      // Redirect to appropriate dashboard based on role
      if (payload.role === 'admin') {
        return NextResponse.redirect(new URL("/admin", request.url));
      } else if (payload.role === 'user') {
        return NextResponse.redirect(new URL("/user", request.url));
      }
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user is on auth routes and no token, allow access
  if (isAuthRoute && !token) {
    return NextResponse.next();
  }

  // If no token and trying to access protected routes, redirect to login
  if (!token && (isAdminRoute || isUserRoute)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If token exists, decode it and check permissions
  if (token) {
    const payload = decodeToken(token);
    
    if (process.env.NODE_ENV === "development") {
      console.log("🔓 Token payload:", payload);
      console.log("📍 Route check:", { isAdminRoute, isUserRoute });
    }
    
    // If token is invalid, redirect to login
    if (!payload) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("access_token");
      return response;
    }

    // STRICT ROLE SEPARATION:
    // Check admin access - ONLY admins can access admin routes
    if (isAdminRoute) {
      console.log("👑 Admin route access check - User role:", payload.role);
      if (payload.role !== 'admin') {
        console.log("❌ Access denied: Not an admin");
        return NextResponse.redirect(new URL("/", request.url));
      }
      console.log("✅ Admin access granted");
    }

    if (isUserRoute) {
      console.log("👤 User route access check - User role:", payload.role);
      if (payload.role !== 'user') {
        console.log("❌ Access denied: Not a regular user");
        // Redirect admin trying to access user routes to admin dashboard
        if (payload.role === 'admin') {
          return NextResponse.redirect(new URL("/admin", request.url));
        }
        return NextResponse.redirect(new URL("/", request.url));
      }
      console.log("✅ User access granted");
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};