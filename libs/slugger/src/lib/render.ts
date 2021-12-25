import { serialize } from "next-mdx-remote/serialize"

export async function renderMarkdown(
  markdown: string,
  scope?: Record<string, unknown>,
) {
  return serialize(markdown ?? "", scope ? { scope } : undefined)
} 
