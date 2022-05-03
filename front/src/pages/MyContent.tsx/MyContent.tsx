import { Tab } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiProvider } from "../../providers/ApiProvider";
import MyComments from "./MyComments";
import MyPosts from "./MyPosts";

const MyContent = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const navigate = useNavigate();
    const [defaultIndex, setDefaultIndex] = useState(0);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);

    const openPosts = () => {
        console.log("posts");
        navigate("/mycontent/posts");
        if (posts.length === 0) {
            apiProvider.getAllPosts().then((posts) => setPosts(posts));
        }
    };

    const openComments = () => {
        console.log("comments");
        navigate("/mycontent/comments");
        if (comments.length === 0) {
            apiProvider
                .getCommentsByPostId("HLJqgNXTfRiQHvwj4hDqa")
                .then((comments) => setComments(comments));
        }
    };

    useEffect(() => {
        const page = document.location.pathname.split("/mycontent/")[1];
        if (page === "posts") {
            setDefaultIndex(0);
            // apiProvider.getMyPosts().then((posts) => setPosts(posts));
            apiProvider.getAllPosts().then((posts) => setPosts(posts));
            return;
        }
        if (page === "comments") {
            setDefaultIndex(1);
            apiProvider
                .getMyComments()
                .then((comments) => setComments(comments));
            apiProvider
                .getCommentsByPostId("HLJqgNXTfRiQHvwj4hDqa")
                .then((comments) => setComments(comments));
            return;
        }
        navigate("/404");
    }, []);

    return (
        <Tab.Group
            defaultIndex={defaultIndex}
            selectedIndex={selectedIndex}
            onChange={setSelectedIndex}
        >
            <Tab.List className="flex gap-2 mb-2">
                <Tab onChange={() => openPosts} className="btn white w-1/2">
                    Publications
                </Tab>
                <Tab onChange={() => openComments} className="btn white w-1/2">
                    Commentaires
                </Tab>
            </Tab.List>
            <Tab.Panels>
                <Tab.Panel>{<MyPosts posts={posts} />}</Tab.Panel>
                <Tab.Panel>{<MyComments comments={comments} />}</Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    );
};
export default MyContent;
