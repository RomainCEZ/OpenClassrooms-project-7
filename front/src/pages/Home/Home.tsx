import { useState, useEffect, useContext } from "react";
import BlueLinkButton from "../../components/Buttons/Link/BlueLinkButton";
import PostPreview from "./PostPreview";
import { PostProps } from "../../utils/interfaces/PostProps";
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
            src={post.imageUrl}
            content={post.content}
            author={post.author}
            timestamp={post.timestamp}
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
                <BlueLinkButton path="newPost">Nouveau post</BlueLinkButton>
            ) : (
                <p className="flex flex-col sm:flex-row items-center justify-center p-2 px-6 rounded bg-white border border-indigo-900 shadow-md">
                    <span>
                        <Link
                            to="/login"
                            className="text-blue-700 hover:text-blue-400 underline font-bold transition-all"
                        >
                            Connectez-vous
                        </Link>
                        &nbsp;ou&nbsp;
                        <Link
                            to="/signup"
                            className="text-blue-700 hover:text-blue-400 underline font-bold transition-all"
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
