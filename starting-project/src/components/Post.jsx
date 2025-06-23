import classes from "./Post.module.css";
function Post(props) {
    return (
        <li className={classes.post}>
            <h2 className={classes.author}>{props.author}</h2>
            <p className={classes.text}>{props.text}</p>
        </li>
    );
}

export default Post;