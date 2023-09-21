import React, { useState, useEffect } from 'react';
import { UserAuth } from "../context/AuthContext";
import axios from 'axios';
import './styles/Taglist.css';
import Button from "./Button";
import Input from "./Input";

const Taglist = (props) => {
  const { className } = props;
  const { user } = UserAuth();
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    handleTaglist();
  }, [user.uid]);

  useEffect(() => {
    if (tags) {
      setIsLoading(false);
      console.log(isLoading);
    }
  }, [tags]);
  
  const handleTaglist = async () => {
    try {
      const fetchedTags = await axios.get(`/api/${user.uid}/tags`);
      setTags(fetchedTags.data);
    } catch (error) {
      console.log('😁', error);
    }
  }

  const handleTagInput = (event) => {
    setNewTag(event.target.value);
  }

  const handleNewTag = async () => {
    const newTagData = {
      'tagName': newTag, 
      'uid': user.uid
    }
    await axios.post('/api/tags/newTag', newTagData);
    handleTaglist();
  }

  const handleClickTag = async (event) => {
    event.preventDefault();
    let clickedTag = event.target.innerText;
    try {
      const fetchedPosts = await axios.get(`/api/entries/${clickedTag}`)
      console.log('👅', fetchedPosts.data);
    } catch (error) {
      console.log('💋', error);
    }
  }

  // const handleIsLoading = async () => {
  //   if (!tags.length === 0) {
  //     setIsLoading(false);
  //   } 
  //   console.log('😡', isLoading);
  //   console.log('😜', tags);
  // }

  return ( 
    <div className = { className }>
      <h4>Your tags</h4>
      
      <div className='tags'>
        { (isLoading)
          ? "Loading..."
          : (tags.length === 0)
            ? "You don't have any tags added yet"
            : tags.map((tag) => (
              <button 
                key={ tag }
                value={ tag }
                className="tag"
                onClick={ handleClickTag } >{"   " + tag + "   " }</button>
            )
          )
        }
        {/* {(tags.length > 0)
          ? tags.map((tag) => (
            <button 
              key={ tag }
              value={ tag }
              className="tag"
              onClick={ handleClickTag } >{"   " + tag + "   " }</button>
          ))
          : "Loading..."
        } */}
      </div>
      
      <form onSubmit={ handleNewTag } >
        <Input 
          className="input tag-input"
          placeholder="Type your new tag here"
          onChange={ handleTagInput }
          value={ newTag }
          />

        <Button 
          className="button tag-submit"
          text="Add New Tag"
          type="submit" />
      </form>

    </div>
  )
};

export default Taglist;
