import {useState} from "react"
import PropTypes from 'prop-types'

function BlogForm({newBlog}) { 

    const [blogTitle , setBlogTitle] = useState('')
    const [blogAuthor , setBlogAuthor] = useState('')
    const [blogUrl , setBlogUrl] = useState('')
    
    function handleTitleChange(e) { 
        setBlogTitle(e.targert.value)
    }
    function handleUrlChange(e) { 
        setBlogUrl(e.targert.value)
    }
    function handleAuthorChange(e) { 
        setBlogAuthor(e.targert.value)
    }

    function addBlog(e) { 
        e.preventDefault();
        newBlog({
            title: blogTitle,
            author: blogAuthor,
            url: blogUrl
        })
        setBlogTitle('')
        setBlogAuthor('')
        setBlogUrl('')
    }

    return(
        <>
            <h4>Create New Blog</h4>
            <form onSubmit={addBlog}>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    className="title"
                    value={blogTitle}
                    placeholder="New Blog"
                    onChange={handleTitleChange} />
                <label htmlFor="author">Author:</label>
                <input 
                    type="text" 
                    id="author" 
                    value={blogAuthor} 
                    placeholder="Auther" 
                    onChange={handleAuthorChange} />
                <label htmlFor="url">Url:</label>
                <input 
                    type="text" 
                    id="url" 
                    value={blogUrl} 
                    placeholder="url" 
                    onChange={handleUrlChange} />
                <button type="submit">add</button>
            </form>
        </>
    )
}

BlogForm.prototype = { 
    newBlog : PropTypes.func.isRequired
}


export default BlogForm