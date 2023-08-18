"use client"
import { useState } from "react"
import TextEditor from "@/components/JoditEditor"

const Jodit = () => {
    const [text, setText] = useState('')
    return <div>
        Jodit Editor
        <TextEditor value={text} onChange={(e: any) => setText(e)} />
        <div>{text}</div>
        <div dangerouslySetInnerHTML={{ __html: text }} />
    </div>
}

export default Jodit