import React, { useState } from 'react';
import firebase from 'firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function Profile(props) {

    const user = props.user;

    const firestore = props.firebase.firestore();

    const booksRef = firestore.collection('Books');
    // const goodBook = booksRef.where('name', '==', 'Good Book');
    // goodBook.get().then(book => {
    //     console.log(book,book.docs[0].data())
    // })
    const [books] = useCollectionData(booksRef);

    const saveToFireStore = () => {
        booksRef.add({
            name: "guy"
        }).then(response => console.log(response))
    }
    
    return (
        <>
        {user &&
            <div>
                <div>Welcome {user.displayName}!</div>
                <div>Welcome {user.email}</div>

                <button onClick={() => firebase.auth().signOut()}>Sign Out</button>
                <button onClick={() => saveToFireStore()}>saveToFireStore</button>
                {/* {books && books[0] && books[0].name} */}
                {/* {books && books[1] && books[1].name} */}
                {books && books.map(book => book.name)}
            </div>
        }
        </>
    )
}

export default Profile
