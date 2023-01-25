import { useState, useEffect } from 'react'
import axios from 'axios'
import BlogDetails from '../BlogDetails'
import EditBlog from '../EditBlog'

export default function Home() {
    //store details and list of all bounties in one state variable
    const [blogs, setBlog] = useState([])
    const [detailId, setDetailId] = useState('')
    const [showForm, setShowForm] = useState(false)

    //show all bounties when the page first loads
    useEffect(() => {
        const fetchBlog = async () => {
            try{
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/bounties`)
                console.log(response.data)
                setBounties(response.data)
            } catch(error) {
                console.warn(error)
            }
        }
        fetchBlog()
    }, []) //empty dependancy array will run this use effect only once

    //show/hide form event handler
    const handleShowFormClick = () => setShowForm(!showForm)


    const blogComponents = blogs.map((blog) => {
        return (
            <div key={`blog${blog._id}`}>
                <h3>{blog.name}</h3>
                <p>{blog.title}</p>
                <button
                    onClick={() => setDetailId(blog._id)}
                >
                    Details</button>
            </div>
        )
    })


    const detailBlog = blogs.find(blog => blog._id === detailId)
    console.log(detailBlog)


    const detailPane = detailBlog ? <BlogDetails handleShowFormClick={handleShowFormClick} bounty ={detailBlog} /> : `Click on a blog`

    const sidePane = showForm ? <EditBlog setBlog={setBlog} handleShowFormClick={handleShowFormClick} blog={detailBlog} /> : detailPane 

    return(
        <div style={{display: 'flex'}}>
            <div style={{width: '50vw'}}>
                <h2>All Blogs</h2>
                {blogComponents}
            </div>
            <div style={{width: '50vw'}}>
                <h2>Details</h2>

                {sidePane} 
                
            </div>
        </div>
            
    )
} 