"use client"
import type { NextPage } from 'next';
import Link from 'next/link';
import { FormEvent, FormEventHandler, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const [todoList, setTodoList] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const router = useRouter();

  type todoType = {
    id: number,
    title: string,
    date : string,
  }

  useEffect(()=>{
    fetch('http://localhost:9999/todo', {cache:'no-store'}).then(resp=>resp.json())
    .then(res=>{
      console.log(res)
      setTodoList(res);
    })
  },[]);

  const updateHandler = (e: todoType) => {
    fetch('http://localhost:9999/todo/'+e.id, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify({title: title, bate: date})
    }).then(resp=>resp.json())
    .then(res=>{
      if(res) {
        alert('Update Success!');
        router.reload();
      }
    })

  };

  const deleteHandler = (e: todoType) => {
    fetch('http://localhost:9999/todo/'+e.id, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'DELETE'
    }).then(resp=>resp.json())
    .then(res=>{
      if(res) {
        alert('Delete Success!');
        router.reload();
      }
    })
  }


  return <>
      <h2>TODO LIST</h2>
      {/* 투두리스트 */}
      {
        todoList.length > 0 ?
        <>
        {
          todoList.map((e: todoType)=> {
            return (
              <div key={e.id}
                style={{ marginBottom: 30 }}
              >
                <div>
                  <input onChange={(event)=>{
                    setTitle(event.currentTarget.value)
                  }} value={ e.title } style={{color:'salmon'}}
                  />
                  <input onChange={(event)=>{
                    setDate(event.currentTarget.value)
                  }} value={ e.date} style={{ color: 'black'}} />
                </div>
                <button onClick={()=>updateHandler(e)}>Update</button>
                <button onClick={()=>deleteHandler(e)}>Delete</button>
              </div>
            )
          })
        }
        </>
        : <></>
      }
      <Link href={'/create'}>Create</Link>
  </>;
};

export default Home;
