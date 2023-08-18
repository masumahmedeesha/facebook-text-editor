"use client";
import React, { useState } from 'react';
import TextEditor from "@/components/FacebookEditor";

const FacebookEditor = () => {
    const [text, setText] = useState('')
    return (
        <div className="bg-white p-5">
            <h2 className="text-xl mb-2">Facebook Editor</h2>
            <div className="p-5 mt-4">
                <TextEditor />
            </div>
            <div>{text}</div>
            <div dangerouslySetInnerHTML={{ __html: text }} />
        </div>
    );
};

export default FacebookEditor;