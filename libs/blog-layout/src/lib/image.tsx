import cn from "classnames"

type Props = {
  title: string
  src: string
  name?: string
}

function Image({ src, title, name }: Props) {
  return (
    <img
      src={src}
      alt={title}
      className={cn("shadow-sm", {
        "hover:shadow-lg transition-shadow duration-200": name,
      })}
    />
  )
}

export default Image
