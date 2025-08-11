import Post from './Post';
import classes from './PostsList.module.css';
import NewPost from "./NewPost.jsx";
import Modal from "./Modal.jsx";
import { useState } from 'react';

function PostsList(){
    const [modalIsVisible, setModalIsVisible] = useState(true); // Assuming modal visibility is controlled elsewhere
    const [enteredBody, setEnteredBody] = useState('');
    const [enteredAuthor, setEnteredAuthor] = useState('');

    function hideModalHandler() {
        setModalIsVisible(false);
    }

    function bodyChangeHandler(event) {
        setEnteredBody(event.target.value);
    }
    
    function authorChangeHandler(event) {
        setEnteredAuthor(event.target.value);
    }

    return (
        <>
            {modalIsVisible ? (<Modal onClose={hideModalHandler} isVisible={modalIsVisible}>
                <NewPost 
                    onBodyChange={bodyChangeHandler} 
                    onAuthorChange={authorChangeHandler}
                />
            </Modal>) : null}
            <ul className={classes.posts}>
                <Post author={enteredAuthor} body={enteredBody}/>
                <Post author="Manuel" body="React is Okay!"/>
                <Post author="Manudon" body="React is gooooood!"/>
            </ul>
        </>
    );
}

export default PostsList;