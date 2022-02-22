import { Route, Routes, Link } from 'react-router-dom'
import PostsContainer from "./PostsContainer"
import NewPost from "../NewPost/index"
import Post from "../Post/index"

export default function Main() {

    return (
        <main className="flex justify-center bg-gray-200 py-10 md:px-6">
            <div className='flex flex-col justify-center w-full'>
                <Routes>
                    <Route path="/" element={<PostsContainer />} />
                    <Route path='/:id' element={<Post />} />
                    <Route path="newpost" element={<NewPost />} />
                </Routes>
            </div>
        </main>
    )
}