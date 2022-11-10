import { useSortable } from "@dnd-kit/sortable"
import { CSS }         from "@dnd-kit/utilities"
import { FC }          from "react"

interface IProps {
  id: string
}

export const SortableItem:FC<IProps> = ({ id }) => {
  const {
    attributes, listeners, setNodeRef, transform, transition,
  } = useSortable({ id })

  const style = {
    transform    : CSS.Transform.toString(transform),
    transition,
    border       : "2px solid #ccc",
    borderRadius : "10%",
    margin       : "1rem",
    height       : "30px",
    width        : "70px",
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {id}
    </div>
  )
}
