"use client";
import React, { useState } from 'react';
import TextEditor from "@/components/LexicalEditor";
import '@/components/LexicalEditor/editor.css';

const LexicalEditor = () => {
    const [text, setText] = useState('')
    return (
        <div className="bg-white p-5">
            <h2 className="text-xl mb-2">Facebook Editor</h2>
            <div className="p-5 mt-4">
                <TextEditor name="message" label="Message" value={text} onChange={(e: any) => setText(e?.target?.value)} />
            </div>
            <div>{text}</div>
            <div dangerouslySetInnerHTML={{ __html: text }} />
        </div>
    );
};

export default LexicalEditor;