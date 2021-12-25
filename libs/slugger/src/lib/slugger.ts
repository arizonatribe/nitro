import * as fs from "fs"
import matter from "gray-matter"
import { resolvePathIfExists } from "@vanillas/cli-toolkit"
import { FrontMatter, MarkdownDocument } from "./types"

// Based on the Next.js blog starter utility:
// https://github.com/zeit/next.js/blob/canary/examples/blog-starter/lib/api.js

export function getMarkdownContent(
  slug: string,
  baseDir: string
): MarkdownDocument | undefined {
  const [_, extension = "md"] = slug.match(/\.(mdx?)$/i) ?? []
    
  const realSlug = slug.replace(/\.mdx?$/i, "")
  const fullPath = [
    resolvePathIfExists(realSlug, baseDir),
    resolvePathIfExists(`${realSlug}.${extension}`, baseDir),
    resolvePathIfExists(`${realSlug}.md`, baseDir),
    resolvePathIfExists(`${realSlug}.mdx`, baseDir),
  ].find(Boolean)

  if (fullPath) {
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return { name: slug, frontMatter: data, content }
  }

  return undefined
}

export function pickFrontMatter(
  doc: MarkdownDocument,
  pickFields: string[] = [],
): FrontMatter {
  return pickFields.reduce((acc, field) => ({
    ...acc,
    [field]: field === "content"
      ? doc.content
      : field === "slug"
        ? doc.name
        : doc.frontMatter[field]
          ? doc.frontMatter[field]
          : null
  }), {})
}

export function getContentBySlug(
  slug: string,
  baseDir: string,
  pickFields: string[] = [],
): FrontMatter {
  const doc = getMarkdownContent(slug, baseDir)
  const frontMatter = pickFrontMatter(doc, pickFields)

  if (pickFields.includes("slug")) {
    return {
      ...frontMatter,
      slug: slug.replace(/\.mdx?$/i, ""),
    }
  }

  return frontMatter
}

export function getSlugs(folderPath: string, pickFields: string[] = []) {
  const resolvedPath = resolvePathIfExists(folderPath)

  return resolvedPath
    ? fs.readdirSync(resolvedPath).map((slug) => (
      getContentBySlug(slug, resolvedPath, pickFields)
    ))
    : []
}
