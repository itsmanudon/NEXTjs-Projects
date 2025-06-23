import Post from './Post';
import classes from './PostsList.module.css';
import NewPost from "./NewPost.jsx";

function PostsList(){
    return (
        <>
            <NewPost />
            <ul className={classes.posts}>
                <Post author="Manan" text="React is Awesome!"/>
                <Post author="Manuel" text="React is Okay!"/>
                <Post author="Manudon" text="React is gooooood!"/>
            </ul>
        </>
    );
}

export default PostsList;