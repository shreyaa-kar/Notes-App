import React, { useEffect, useState } from 'react'
import './UpdateNote.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

function UpdateNote() {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  const {id} = useParams();

  const loadNote = async (id) => {
    if(!id) return

    const response = await axios.get(`${process.env.REACT_APP_API_URL}/notes/${id}`)

    setTitle(response.data.data.title)
    setCategory(response.data.data.category)
    setContent(response.data.data.content)
  }

  const updateNote = async() => {
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/notes/${id}`,
    {
      title: title,
      content: content,
      category: category
    })
    toast.success(response.data.message)
    window.location.href = '/'
  }

  useEffect(()=>{
    loadNote(id)
  }, [id])

  return (
    <div className='body p-4'>
      <h1 className="text-center">Update Notes</h1><hr />
      <div className="container">
          <div className='col-12 col-sm-7 card m-auto shadow p-4 mt-5'>
            <h4 className="mb-3">UPDATE A NOTE <i className='fs-6'>{id}</i></h4>
            <p className="mb-2">Title : </p>
            <input type='text'
              placeholder='Enter title'
              value={title}
              onChange={(e)=>{
                setTitle(e.target.value)
              }} 
              className='mb-4 p-2 px-3 rounded border border-black'/>

            <p className="mb-2">Select Category : </p>
            <select value={category}
              onChange={(e)=>{
                setCategory(e.target.value)
              }}
              className='mb-3 p-2 rounded border border-black'>
                <option value="">Select</option>
                <option value="general">General</option>
                <option value="college">College</option>
                <option value="personal">Personal</option>
                <option value="other">Other</option>
            </select>

            <p className="mb-2 col-6">Content : </p>
            <input type='text'
              placeholder='Enter content'
              value={content}
              onChange={(e)=>{
                setContent(e.target.value)
              }} 
              className='mb-4 p-2 px-3 rounded border border-black'/>
              <button type='button' onClick={updateNote} class="py-2 rounded border up">Update</button>
          </div>
        </div>
    </div>
  )
}

export default UpdateNote