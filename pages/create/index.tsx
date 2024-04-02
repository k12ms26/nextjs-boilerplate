"use client"
import { useRouter } from "next/router";
import { FormEvent, useState } from "react"

export default function Create() {
    const [title, setTitle] = useState('');
    const [date ,setDate] = useState('');
    const router = useRouter();

    function handleSubmit(event: FormEvent<HTMLFormElement>, t: string, d: string) {
        event.preventDefault();
        // console.log(title, date)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: t, date: d})
        }
        // console.log(options.body)
        fetch('http://localhost:9999/todo', options)
        .then(res=>res.json())
        .then(result=>{
            console.log(result);
            alert("Create Success!!");
            router.push('/');
            
        })
    }

    return (
        <form onSubmit={(e)=>handleSubmit(e, title, date)}>
            <input onChange={(e)=>{
                setTitle(e.currentTarget.value)
            }} value={title} />
            <input onChange={(e)=>{
                setDate(e.currentTarget.value)
            }} value={date} />
            <button type="submit">todo 추가하기</button>
        </form>
    )
}