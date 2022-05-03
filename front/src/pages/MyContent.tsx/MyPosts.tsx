import PostPreview from "../Home/PostPreview";
import { PostProps } from "../Post/interfaces/PostProps";

const MyPosts = ({ posts }) => {
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

    return (
        <>
            {posts.length === 0 ? (
                <p className="text-center border rounded p-5 font-bold bg-white dark:bg-gray-400 text-blue-00 dark:text-gray-800 border-blue-800 dark:border-gray-200">
                    Aucune publication !
                </p>
            ) : (
                postsElements
            )}
        </>
    );
};
export default MyPosts;
