import { useState, useEffect, useContext } from "react";
import PostPreview from "./PostPreview";
import { PostProps } from "../Post/interfaces/PostProps";
import { SessionContext } from "../Auth/context/SessionContext";
import PostPreviewLoader from "./PostPreviewLoader";
import { Link } from "react-router-dom";
import { postsApiProvider } from "../../providers/PostsApiProvider";

export default function Home() {
    const [posts, setPosts] = useState<PostProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { loggedIn } = useContext(SessionContext);

    const postsElements: JSX.Element[] = posts.map((post: PostProps) => (
        <PostPreview
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            author={post.author}
            authorPicture={post.authorPicture}
            timestamp={post.timestamp}
            likes={post.likes}
            dislikes={post.dislikes}
            commentsNumber={post.commentsNumber}
        />
    ));

    useEffect(() => {
        postsApiProvider.getAllPosts().then((postsData) => {
            setPosts(postsData);
            setIsLoading(false);
        });
    }, []);

    return (
        <>
            {loggedIn ? (
                <Link to="newpost" className="btn blue">
                    Nouveau post
                </Link>
            ) : (
                <p className="flex flex-col sm:flex-row items-center justify-center p-2 px-6 sm:rounded font-bold text-gray-800 bg-white dark:bg-gray-400 border-indigo-900 dark:border-gray-300 sm:border shadow-md">
                    <span>
                        <Link
                            to="/login"
                            className="btn-text-blue underline decoration-2 underline-offset-1"
                        >
                            Connectez-vous
                        </Link>
                        &nbsp;ou&nbsp;
                        <Link
                            to="/signup"
                            className="btn-text-blue underline decoration-2 underline-offset-1"
                        >
                            enregistrez-vous
                        </Link>
                    </span>
                    &nbsp;pour publier votre contenu !
                </p>
            )}
            <section className="flex flex-col mt-3 gap-2 w-full">
                {isLoading ? (
                    <>
                        <PostPreviewLoader />
                        <PostPreviewLoader />
                        <PostPreviewLoader />
                    </>
                ) : (
                    postsElements
                )}
            </section>
        </>
    );
}
