// Layouts
export { default as NonAuthLayout } from "@/pages/non-auth/layout";

// Pages | Require authentication

// Pages | Non require authentication
export { default as Category } from "@/pages/non-auth/categories/[categoryId]/route";
export { default as Categories } from "@/pages/non-auth/categories/route";
export { default as Home } from "@/pages/non-auth/home/route";
export { default as Product } from "@/pages/non-auth/products/[productId]/route";
export { default as SignIn } from "@/pages/non-auth/sign-in/route";
export { default as SignUp } from "@/pages/non-auth/sign-up/route";
