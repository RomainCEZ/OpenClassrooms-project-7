import { useState, useEffect, useContext } from "react";
import PostPreview from "./PostPreview";
import { PostProps } from "../Post/interfaces/PostProps";
import { apiProvider } from "../../providers/ApiProvider";
import { SessionContext } from "../Auth/context/SessionContext";
import PostPreviewLoader from "./PostPreviewLoader";
import { Link } from "react-router-dom";

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
            commentsNumber={post.commentsNumber}
        />
    ));

    useEffect(() => {
        apiProvider.getAllPosts().then((postsData) => {
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
                <p className="flex flex-col sm:flex-row items-center justify-center p-2 px-6 rounded dark:text-gray-200 bg-white dark:bg-gray-500 border-indigo-900 dark:border-gray-300 border shadow-md">
                    <span>
                        <Link to="/login" className="btn-text-blue underline">
                            Connectez-vous
                        </Link>
                        &nbsp;ou&nbsp;
                        <Link to="/signup" className="btn-text-blue underline">
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
