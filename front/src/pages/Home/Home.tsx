import { useState, useEffect, useContext } from "react";
import BlueButton from "../../components/BlueButton";
import PostPreview from "./PostPreview";
import { PostProps } from "../../utils/interfaces/PostProps";
import { apiProvider } from "../../domain/ApiProvider";
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
            body={post.body}
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
                <BlueButton path="newPost">Nouveau post</BlueButton>
            ) : (
                <p className="flex flex-col sm:flex-row items-center justify-center p-2 mb-3 rounded bg-white border border-indigo-900 px-6">
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
            <section className="flex flex-col mt-2 gap-1 w-full">
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
