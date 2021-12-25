type Props = {
  title: string
  uid: string
}

export function Youtube({ title, uid }: Props) {
  return (
    <div className="youtube-embed">
      <iframe
        src={`https://www.youtube.com/embed/${uid}`}
        width="100%"
        height="500px"
        title={title}
      ></iframe>
    </div>
  )
}

export default Youtube
