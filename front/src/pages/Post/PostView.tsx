import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { EditorState, convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ReactTimeAgo from "react-time-ago";
import { PostProps } from "./interfaces/PostProps";
import { apiProvider } from "../../providers/ApiProvider";
import { SessionContext } from "../Auth/context/SessionContext";
import PostLoader from "./PostLoader";
import Comment from "./Comments/Comment";
import CommentLoader from "./Comments/CommentLoader";
import NewComment from "./Comments/NewComment";
import DraftjsView from "../../components/Draftjs/DraftjsView";
import PostButtons from "./PostButtons";
import PostLikes from "./PostLikes";

export default function PostView() {
    const { user } = useContext(SessionContext);
    const [post, setPost] = useState<PostProps>({
        id: "",
        title: "",
        content: "",
        authorPicture: "",
        likes: [],
        dislikes: [],
        editorContent: "",
    });
    const [commentsData, setCommentsData] = useState([]);
    console.log(commentsData);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const id = document.location.pathname.split("/post/")[1];

    const getComments = () => {
        apiProvider.getCommentsByPostId(id).then((commentsData) => {
            return setCommentsData(commentsData);
        });
    };
    const commentsElements = commentsData.map((comment) => {
        return (
            <Comment
                key={comment.id}
                commentId={comment.id}
                content={comment.content}
                author={comment.author}
                authorId={comment.authorId}
                timestamp={comment.timestamp}
                likes={comment.likes}
                dislikes={comment.dislikes}
                getComments={getComments}
            />
        );
    });

    useEffect(() => {
        apiProvider.getPostById(id).then((postData) => {
            const contentState = convertFromRaw(postData.content);
            const editorState = EditorState.createWithContent(contentState);
            setPost({
                ...postData,
                content: editorState,
            });
            setIsLoading(false);
        });
        getComments();
    }, []);

    return (
        <section>
            <Link to="/" className="btn blue">
                Retour
            </Link>
            {isLoading ? (
                <PostLoader />
            ) : (
                <article className=" mt-3 group flex flex-col px-2 sm:px-5 py-2 dark:text-gray-900 bg-white dark:bg-gray-400 w-full sm:border sm:rounded shadow-md border-blue-900 dark:border-gray-300">
                    <div className="flex items-center pb-2 border-b-2 border-blue-900 dark:border-gray-300">
                        <div className="relative h-14 w-14 mr-2 sm:-ml-2 mt-2 border-2 border-blue-800 dark:border-gray-800 rounded-full overflow-hidden">
                            <img
                                src={post.authorPicture}
                                className="absolute w-full h-full"
                            />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold break-words py-1 sm:px-0 decoration-2 underline underline-offset-2 text-blue-800 dark:text-gray-900">
                                {post.title}
                            </h2>
                            <p className="text-sm ml-2 first-letter:capitalize">
                                <ReactTimeAgo
                                    date={post.timestamp}
                                    locale="fr-FR"
                                    className="font-bold"
                                />{" "}
                                par{" "}
                                <span className="font-bold">{post.author}</span>
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="border-b border-indigo-900 dark:border-gray-300">
                            <DraftjsView editorState={post.content} />
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <PostLikes
                            postId={post.id}
                            likes={post.likes}
                            dislikes={post.dislikes}
                        />

                        <div className="h-16 py-3 px-2 w-1/2">
                            {(user.id === post.authorId ||
                                user.role === "admin") && <PostButtons />}
                        </div>
                    </div>
                </article>
            )}
            <NewComment postId={id} getComments={getComments} />
            {isLoading ? (
                <CommentLoader />
            ) : (
                <div className="flex flex-col mt-2 gap-1">
                    {commentsElements}
                </div>
            )}
        </section>
    );
}
