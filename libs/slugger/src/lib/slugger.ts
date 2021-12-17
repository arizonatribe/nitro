import * as fs from "fs"
import * as path from "path"
import matter from "gray-matter"
import { resolvePathIfExists } from "@vanillas/cli-toolkit"

// Based on the Next.js blog starter utility:
// https://github.com/zeit/next.js/blob/canary/examples/blog-starter/lib/api.js

export function pickSlug(
  slug: string,
  baseDir: string,
  pickFields: string[] = [],
) {
  const realSlug = slug.replace(/\.md$/, "")
  const fullPath = path.join(baseDir, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  return pickFields.reduce((acc, field) => ({
    ...acc,
    [field]: field === "slug"
      ? realSlug
      : field === "content"
        ? content
        : data[field]
          ? data[field]
          : undefined
  }), {})
}

export function getSlugs(folderPath: string, pickFields: string[] = []) {
  const resolvedPath = resolvePathIfExists(folderPath)

  return resolvedPath
    ? fs.readdirSync(resolvedPath).map((slug) => pickSlug(slug, resolvedPath, pickFields))
    : []
}
