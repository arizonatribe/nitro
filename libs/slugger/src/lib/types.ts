import { MDXRemoteSerializeResult } from "next-mdx-remote"

/**
 * ## References
 *
 * * [FrontMatter and MarkdownDocument](https://gist.github.com/juristr/d3bc2bc2fca013e2e38b91c3f2caff7e#file-types-ts)
 * * [MarkdownRenderingResult](https://gist.github.com/juristr/6177523ce86ef7665f24b7f775a64aa0#file-types-ts)
 */

export interface FrontMatter {
  [prop: string]: string;
}

export interface NestedFrontMatter {
  [prop: string]: string | FrontMatter;
}

export interface MarkdownDocument {
  name?: string
  frontMatter: FrontMatter
  content: string
}

export interface MarkdownRenderingResult {
  frontMatter: FrontMatter
  html: string | MDXRemoteSerializeResult
}
