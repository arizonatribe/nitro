import { NestedFrontMatter } from "@nitro/slugger"
import { Author } from "./Author"


interface Post extends NestedFrontMatter {
  slug: string
  title: string
  date: string
  coverImage: string
  author: Author
  excerpt: string
  ogImage: {
    url: string
  }
  content: string
}

export type { Post }
