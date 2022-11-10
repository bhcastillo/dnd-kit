import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,

} from "@dnd-kit/core"
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable"
import { useState } from "react"

import { SortableItem } from "./components/SortableItem"
import "./App.css"

function App() {
  const [languages, setLanguages] = useState(["Spanish", "English", "French", "German"])
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter : sortableKeyboardCoordinates,
    })
  )
  const handleDragStart = (event:DragStartEvent) => {
    console.log("handleDraggableStart", event)
  }
  const handleDragEnd = ({ active, over }:DragEndEvent) => {
    console.log("handleDragEnd", active.id, over?.id)

    if (over && active.id !== over.id) {
      setLanguages(items => {
        const activeIndex = items.indexOf(active.id.toString())
        const overIndex = items.indexOf(over.id.toString())

        return arrayMove(items, activeIndex, overIndex)
      })
    }
  }


  return (
    <div>
      <h1> DND KIT Example</h1>
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={languages} strategy={verticalListSortingStrategy}>
          {
            languages.map(language => <SortableItem key={language} id={language} />)
          }
        </SortableContext>
      </DndContext>
    </div>
  )
}

export default App
