import { Route, Routes } from 'react-router-dom'
import PostsContainer from "../pages/Home/PostsContainer"
import NewPost from "../pages/NewPost/index"
import Post from "../pages/Post/index"

export default function MainContent() {

    return (
        <div className='flex flex-col w-full my-10 md:w-3/5 lg:max-w-2xl lg:ml-auto'>
            <Routes>
                <Route path="/" element={<PostsContainer />} />
                <Route path='/:id' element={<Post />} />
                <Route path="newpost" element={<NewPost />} />
            </Routes>
        </div>
    )
}