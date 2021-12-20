import styles from "./markdown-styles.module.css"

type Props = {
  content: string
}

function PostBody({ content }: Props) {
  return (
    <div className="max-w-2xl mx-auto">
      <div
        className={styles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}

export default PostBody
