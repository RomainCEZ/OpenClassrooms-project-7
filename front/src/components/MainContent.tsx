import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Auth/Login'
import Signup from '../pages/Auth/Signup'
import Error from '../pages/Error/Error'
import PostsContainer from "../pages/Home/PostsContainer"
import NewPost from "../pages/NewPost/index"
import EditPost from '../pages/Post/EditPost'
import Post from "../pages/Post/index"

export default function MainContent() {

    return (
        <div className='flex flex-col w-full my-10 sm:max-w-xl mx-auto'>
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<PostsContainer />} />
                <Route path='/:id' element={<Post />} />
                <Route path="newpost" element={<NewPost />} />
                <Route path="/:id/edit" element={<EditPost />} />
                {/* <Route path="/:id/delete" element={<DeletePost />} /> */}
                <Route path="*" element={<Error />} />
            </Routes>
        </div>
    )
}