import { Tab } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiProvider } from "../../providers/ApiProvider";
import MyComments from "./MyComments";
import MyPosts from "./MyPosts";

const MyContent = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);

    const handleChange = (index) => {
        setSelectedIndex(index);
        index === 0 ? openPosts() : openComments();
    };

    const openPosts = () => {
        navigate("/mycontent/posts");
        if (posts.length === 0) {
            apiProvider.getMyPosts().then((posts) => setPosts(posts));
        }
    };

    const openComments = () => {
        navigate("/mycontent/comments");
        if (comments.length === 0) {
            apiProvider
                .getMyComments()
                .then((comments) => setComments(comments));
        }
    };

    useEffect(() => {
        const page = document.location.pathname.split("/mycontent/")[1];
        if (page === "posts") {
            setSelectedIndex(0);
            apiProvider.getMyPosts().then((posts) => setPosts(posts));
            return;
        }
        if (page === "comments") {
            setSelectedIndex(1);
            apiProvider
                .getMyComments()
                .then((comments) => setComments(comments));
            return;
        }
        navigate("/404");
    }, []);

    return (
        <Tab.Group
            selectedIndex={selectedIndex}
            onChange={(index) => handleChange(index)}
        >
            <Tab.List className="flex gap-2 mb-2">
                <Tab className="btn white w-1/2">Publications</Tab>
                <Tab className="btn white w-1/2">Commentaires</Tab>
            </Tab.List>
            <Tab.Panels>
                <Tab.Panel>{<MyPosts posts={posts} />}</Tab.Panel>
                <Tab.Panel>{<MyComments comments={comments} />}</Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    );
};
export default MyContent;
