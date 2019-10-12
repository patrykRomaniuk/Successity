import React,{ useEffect,useState } from 'react';
import { 
    getPosts,
    getLatestPosts,
    getMostLikedPosts,
    searchTopics,
    getMostCommented
} from '../actions/posts';
import { connect } from 'react-redux';
import TopicPostsWrapper from './LoopHandler/TopicPostsWrapper';

const Topics = ({ 
    getPosts,
    getMostCommented,
    getMostLikedPosts,
    getLatestPosts,
    searchTopics,
    post 
}) => {
    
    const [ searchValue,setSearchValue ] = useState('');
    const [ isOldest,setOldest ] = useState(false);
    const [ isLatest,setLatest ] = useState(true);
    const [ isMostLikedPosts, setMostLikedPosts ] = useState(false);
    const [ isMostCommented, setMostCommented ] = useState(false);

    useEffect(() => {
        if(isMostLikedPosts){
            getMostLikedPosts()
        } else if(isLatest){
            getLatestPosts();
        } else {
            getPosts();
        }
    },[]);

    const onChange = e => {
        setSearchValue(e.target.value);
    }

    const searchForTopic = searchValue => {
        if(searchValue !== '' && searchValue !== null){
            searchTopics(searchValue);
        } else {
            if(isLatest){
                getLatestPosts()
            } else if(isMostLikedPosts){
                getMostLikedPosts();
            } else {
                getPosts();
            }
        }
    }

    const changePosts = (postToChange) => {
        if(postToChange === "mostLiked"){
            setMostLikedPosts(!isMostLikedPosts);
            setLatest(false);
            setMostCommented(false);
            setOldest(false);
            getMostLikedPosts();
        } else if(postToChange === "mostCommented"){
            setMostCommented(!isMostCommented);
            setMostLikedPosts(false);
            setLatest(false);
            setOldest(false);
            getMostCommented();
        } else if(postToChange === "latest"){
            setLatest(!isLatest);
            setMostCommented(false);
            setMostLikedPosts(false);
            setOldest(false);
            getLatestPosts();
        } else if(postToChange === "oldest"){
            setOldest(!isOldest);
            setMostLikedPosts(false);
            setLatest(false);
            setMostCommented(false);
            getPosts();
        }
    }

    return (
        <div>
            <header className="topics-header">
                <p className="app_color_font font__bold font__p topics-headline">
                    Tematy
                </p>
                <br/>

                <div  className={
                    isOldest ?
                    "header-checkbox app_color_font p__size font__p font__bold" :
                    "header-checkbox app_color_font p__size font__p"
                }>
                 <input 
                 type="checkbox"
                 checked={ isOldest }
                  onChange={() => changePosts("oldest")}
                  />
                 <p onClick={() => changePosts("oldest")}>
                     Najstarsze
                    </p>
                </div>

                <div className={
                    isLatest ?
                    "header-checkbox app_color_font p__size font__p font__bold" :
                    "header-checkbox app_color_font p__size font__p"
                }>
                    <input 
                    type="checkbox"
                    value={ isLatest }
                    checked={ isLatest }
                    onChange={() => changePosts("latest")}/>
                    <p
                    onClick={() => changePosts("latest")}>
                        Najnowsze
                    </p>
                </div>

                <div className={
                    isMostLikedPosts ?
                    "header-checkbox app_color_font p__size font__p font__bold" :
                    "header-checkbox app_color_font p__size font__p"
                }>
                 <input 
                 type="checkbox" 
                 checked={ isMostLikedPosts }
                 onChange={() => changePosts("mostLiked")}
                 />
                 <p onClick={() => changePosts("mostLiked")}>
                     Najbardziej aktywne</p>
                </div>

                <div className={
                    isMostCommented ?
                    "header-checkbox app_color_font p__size font__p font__bold" :
                    "header-checkbox app_color_font p__size font__p"
                }>
                    <input 
                    type="checkbox"
                    checked={ isMostCommented }
                    onChange={() => changePosts("mostCommented")}
                    />
                    <p onClick={() => changePosts("mostCommented")}>
                        Najbardziej komentowane
                    </p>
                </div>

                <form onSubmit={() => {
                    searchForTopic(searchValue)
                }} className="search-topic-wrapper">

                 <textarea 
                 value={ searchValue }
                 onChange={(e) => onChange(e)}
                 type="submit"
                 />

                 <div className="topic-search-button app_color_background font__p font__bold" onClick={() => {
                    searchForTopic(searchValue)
                }}>
                     Search for topic
                 </div>

                </form>
            </header>

            <div className="topics-wrapper">
                <TopicPostsWrapper 
                isOldest={ isOldest }
                isLatest={ isLatest }
                isMostCommented={ isMostCommented }
                isMostLikedPosts={ isMostLikedPosts }
                posts={post.posts}
                />
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    post: state.post
});

export default connect(
    mapStateToProps, { 
    getPosts,
    searchTopics,
    getLatestPosts,
    getMostLikedPosts,
    getMostCommented
})(Topics);
