import MyComment from "./MyComment";

const MyComments = ({ comments }) => {
    const commentsElements = comments.map((comment) => (
        <MyComment
            key={comment.id}
            postId={comment.postId}
            commentId={comment.id}
            content={comment.content}
            author={comment.author}
            authorId={comment.authorId}
            timestamp={comment.timestamp}
            likes={comment.likes}
            dislikes={comment.dislikes}
        />
    ));

    return (
        <>
            {comments.length === 0 ? (
                <p className="text-center border rounded p-5 font-bold bg-white dark:bg-gray-400 text-blue-00 dark:text-gray-800 border-blue-800 dark:border-gray-200">
                    Aucun commentaire !
                </p>
            ) : (
                commentsElements
            )}
        </>
    );
};
export default MyComments;
