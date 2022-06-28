import { useState } from 'react'
import PropTypes from 'prop-types'

function Blog({blog, updateBlog, deleteBlog}) {

  const [blogObject, setBlogObject] = useState(blog)
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  function toggleVisibility() {
    setVisible(!visible)
  }

  const buttonLabel = visible ? 'hide' : 'view'


  function increaseLikes() {
    const updatedBlog = ({
      ...blog,
      likes: blog.likes + 1
    })
    updateBlog(updatedBlog)
    setBlogObject(updatedBlog)
  }

  function removeBlog() {
    deleteBlog(blog)
  } 


   const blogStyle = { 
    padding: 5, 
    border: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 3
   }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        <p>{blog.title} - {blog.author} <button onClick={toggleVisibility}>{buttonLabel}</button></p>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>{ blogObject.likes } <button id='like-button' onClick={increaseLikes}>like</button></p>
        <button id='remove' onClick={removeBlog}>remove</button>
      </div>
    </div>
  );
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}



export default Blog;
