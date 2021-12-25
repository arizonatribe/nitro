import { MDXRemote } from "next-mdx-remote"
import styles from "./markdown-styles.module.css"
import { Youtube } from "./youtube"
import { Post } from "./types"

type Props = {
  frontMatter: Post
  source?: string
}

const MDXComponents = {
  Youtube
}

function PostBody({ source, frontMatter }: Props) {
  const isMdxContent = /mdxcontent/i.test(source ?? frontMatter.content)
  return (
    <div className="max-w-2xl mx-auto">
      {isMdxContent
        ? (
          <div className={styles["markdown"]}>
            <MDXRemote
              compiledSource={(source as string)}
              scope={frontMatter}
              components={MDXComponents}
            />
          </div>
        )
        : <div
          className={styles["markdown"]}
          dangerouslySetInnerHTML={{ __html: source ?? frontMatter.content }}
        />
      }
    </div>
  )
}

export default PostBody
