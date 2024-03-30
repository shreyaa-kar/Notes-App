import React, { useState } from 'react'
import './NewNote.css';
import axios from 'axios';
import toast from 'react-hot-toast';

function NewNote() {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  const addNote = async() => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/notes`,
    {
      title: title,
      content: content,
      category: category
    })
    toast.success(response.data.message)
    reset()
  }

  const reset = () => {
    setTitle('')
    setCategory('')
    setContent('')
  }

  return (
    <div className='body p-4'>
      <h1 className="text-center">Add Notes</h1><hr />
      <div className="container">
          <div className='col-12 col-sm-7 card m-auto shadow p-4 mt-5'>
            <h4 className="mb-3">WRITE A NOTE</h4>
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


            <div className="mb-4">
              <button type='button' onClick={reset} class="py-2 rounded bod">Reset</button>
              <button type='button' onClick={addNote} class="ms-2 py-2 rounded border bag">Save</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default NewNote