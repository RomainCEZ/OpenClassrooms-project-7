import { useState, useEffect, useContext } from "react";
import BlueLinkButton from "../../components/Buttons/BlueLinkButton";
import { PostProps } from "../../utils/interfaces/PostProps";
import { apiProvider } from "../../domain/ApiProvider";
import { Link } from "react-router-dom";
import { SessionContext } from "../Auth/context/SessionContext";
import PostLoader from "./PostLoader";
import { EditorState, convertFromRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Comment from "./Comment";
import CommentLoader from "./CommentLoader";
import ReactTimeAgo from "react-time-ago";
import NewComment from "./NewComment";
import DraftjsView from "../../components/Draftjs/DraftjsView";

export default function PostView() {
    const { user, navigate } = useContext(SessionContext);
    const [post, setPost] = useState<PostProps>({
        id: "",
        title: "",
        content: "",
        editorContent: "",
        imageUrl: "",
    });
    const [commentsData, setCommentsData] = useState([]);

    const commentsElements = commentsData.map((comment) => {
        return (
            <Comment
                key={comment.id}
                content={comment.content}
                author={comment.author}
                authorId={comment.id}
                timestamp={comment.timestamp}
                deleteComment={() => deleteComment(comment.id)}
            />
        );
    });

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const id = document.location.pathname.split("/post/")[1];

    const getComments = () => {
        apiProvider.getCommentsByPostId(id).then((commentsData) => {
            return setCommentsData(commentsData);
        });
    };
    const deleteComment = async (id) => {
        await apiProvider.deleteComment(id);
        getComments();
    };

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
                <div className="flex flex-col mt-2 p-2 sm:px-5 rounded min-h-80 h-fit bg-white border border-indigo-900">
                    <div className="mb-3 pb-2 border-b-2 border-indigo-900">
                        <h2 className="text-xl font-semibold p-2 sm:px-0 decoration-2 underline underline-offset-2 text-blue-800">
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
                            <img src={post.imageUrl} className="py-3 w-full " />
                        )}
                        <div className=" border-b border-indigo-900">
                            <DraftjsView editorState={post.content} />
                        </div>
                    </div>
                    {(user.id === post.authorId || user.role === "admin") && (
                        <div className="flex justify-end items-center pt-2 m-1 mr-2 gap-2">
                            <BlueLinkButton path={`/post/${id}/edit`}>
                                Éditer
                            </BlueLinkButton>
                            <button
                                className="flex justify-center p-2 px-6 text-white font-bold rounded bg-red-800 hover:bg-red-600 hover:shadow focus:bg-red-600 focus:shadow active:bg-red-500 transition-all"
                                onClick={async () => {
                                    await apiProvider.deletePost(id);
                                    navigate("/");
                                }}
                            >
                                Supprimer
                            </button>
                        </div>
                    )}
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
