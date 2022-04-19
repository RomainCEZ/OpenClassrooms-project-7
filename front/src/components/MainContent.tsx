import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Error from "../pages/Error/Error";
import Home from "../pages/Home/Home";
import NewPost from "../pages/NewPost/NewPost";
import EditPost from "../pages/Post/EditPost";
import PostView from "../pages/Post/PostView";
import RequestPasswordReset from "../pages/Auth/RequestPasswordReset";
import ResetPassword from "../pages/Auth/ResetPassword";

export default function MainContent() {
    return (
        <div className="flex flex-col container my-10 sm:max-w-xl xl:max-w-2xl mx-auto">
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/login/requestpasswordreset"
                    element={<RequestPasswordReset />}
                />
                <Route
                    path="/login/resetpassword"
                    element={<ResetPassword />}
                />
                <Route path="/" element={<Home />} />
                <Route path="/post/:id" element={<PostView />} />
                <Route path="newpost" element={<NewPost />} />
                <Route path="/post/:id/edit" element={<EditPost />} />
                <Route path="/404" element={<Error />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </div>
    );
}
