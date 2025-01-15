export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/writePost"], // Add the routes that require authentication
};
