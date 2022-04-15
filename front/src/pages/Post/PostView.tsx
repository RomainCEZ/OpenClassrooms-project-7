import { useState, useEffect, useContext, Fragment } from "react";
import BlueLinkButton from "../../components/Buttons/Link/BlueLinkButton";
import { PostProps } from "../../utils/interfaces/PostProps";
import { apiProvider } from "../../domain/ApiProvider";
import { SessionContext } from "../Auth/context/SessionContext";
import PostLoader from "./PostLoader";
import { EditorState, convertFromRaw, ContentState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Comment from "./Comments/Comment";
import CommentLoader from "./Comments/CommentLoader";
import ReactTimeAgo from "react-time-ago";
import NewComment from "./Comments/NewComment";
import DraftjsView from "../../components/Draftjs/DraftjsView";
import PostButtons from "./PostButtons";

export default function PostView() {
    const { user } = useContext(SessionContext);
    const [post, setPost] = useState<PostProps>({
        id: "",
        title: "",
        content: "",
        editorContent: "",
        imageUrl: "",
    });
    const [commentsData, setCommentsData] = useState([]);

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
                authorId={comment.id}
                timestamp={comment.timestamp}
                getComments={getComments}
            />
        );
    });

    useEffect(() => {
        apiProvider.getPostById(id).then((postData) => {
            if (typeof postData.content === "string") {
                const contentState = ContentState.createFromText(
                    postData.content
                );
                const editorState = EditorState.createWithContent(contentState);
                setPost({
                    ...postData,
                    content: editorState,
                });
            } else {
                const contentState = convertFromRaw(postData.content);
                const editorState = EditorState.createWithContent(contentState);
                setPost({
                    ...postData,
                    content: editorState,
                });
            }
            setIsLoading(false);
        });
        getComments();
    }, []);

    return (
        <section>
            <BlueLinkButton path="/">Retour</BlueLinkButton>
            {isLoading ? (
                <PostLoader />
            ) : (
                <div className="flex flex-col mt-3 p-2 sm:px-5 rounded h-fit bg-white border border-indigo-900 shadow-md">
                    <div className="mb-3 pb-2 border-b-2 border-indigo-900">
                        <h2 className="text-xl font-bold overflow-hidden p-2 sm:px-0 decoration-2 underline underline-offset-2 text-blue-800">
                            {post.title}
                        </h2>
                        <p className="text-sm ml-2 first-letter:capitalize">
                            <ReactTimeAgo
                                date={post.timestamp}
                                locale="fr-FR"
                                className="font-bold"
                            />{" "}
                            par <span className="font-bold">{post.author}</span>
                        </p>
                    </div>
                    <div className="flex flex-col w-full">
                        {post.imageUrl && (
                            <img src={post.imageUrl} className="py-3 w-full" />
                        )}
                        <div className="border-b border-indigo-900">
                            <DraftjsView editorState={post.content} />
                        </div>
                    </div>
                    <div className="h-14 py-3 px-2">
                        {(user.id === post.authorId ||
                            user.role === "admin") && <PostButtons />}
                    </div>
                </div>
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
