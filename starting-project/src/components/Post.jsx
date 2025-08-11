import classes from "./Post.module.css";
function Post({author, text}) {
    return (
        <li className={classes.post}>
            <h2 className={classes.author}>{author}</h2>
            <p className={classes.text}>{text}</p>
        </li>
    );
}

export default Post;