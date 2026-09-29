import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Continue to Qreative with Google.",
};

export default function LoginLayout({ children }: LayoutProps<"/login">) {
  return children;
}
