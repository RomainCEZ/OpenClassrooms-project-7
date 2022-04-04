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

export default function PostView() {
    const { user } = useContext(SessionContext);
    const [post, setPost] = useState<PostProps>({
        id: "",
        title: "",
        body: "",
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
                timestamp={comment.timestamp}
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

    useEffect(() => {
        apiProvider.getPostById(id).then((postData) => {
            if (typeof postData.body === "string") {
                const contentState = ContentState.createFromText(postData.body);
                const editorState = EditorState.createWithContent(contentState);
                setPost({
                    ...postData,
                    body: editorState,
                });
            } else {
                const contentState = convertFromRaw(postData.body);
                const editorState = EditorState.createWithContent(contentState);
                setPost({
                    id: postData.id,
                    title: postData.title,
                    body: editorState,
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
                    <div className="flex flex-col w-full p-2">
                        {post.imageUrl && (
                            <img src={post.imageUrl} className="py-3 w-full " />
                        )}
                        <Editor
                            readOnly
                            toolbarHidden
                            textAlignment="left"
                            editorState={post.body}
                            wrapperClassName="flex flex-col h-full w-full wrapper-class bg-gray-200 border-b border-indigo-900 "
                            editorClassName="editor-class px-3 bg-white"
                        />
                    </div>
                    {(user.id === post.authorId || user.role === "admin") && (
                        <div className="flex justify-end items-center m-1 mr-2 gap-2">
                            <BlueLinkButton path={`/post/${id}/edit`}>
                                Éditer
                            </BlueLinkButton>
                            <Link
                                to="/"
                                className="flex justify-center p-2 px-6 text-white font-bold rounded bg-red-800 hover:bg-red-600 hover:shadow focus:bg-red-600 focus:shadow active:bg-red-500 transition-all"
                                onClick={() => apiProvider.deletePost(id)}
                            >
                                Supprimer
                            </Link>
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
