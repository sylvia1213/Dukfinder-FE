import * as D from "./LostDetailStyle";
import { data } from '../../postData';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import LostDetailCard from './LostDetailCard';
import Image from 'react-bootstrap/Image';
import axios from 'axios';
import CommentMain from "../Comment/CommentMain";


function LostDetail(props) {
    const { p_id } = useParams();
    const [post, setPost] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false); // 로그인 여부 상태

    useEffect(() => {
        const token = localStorage.getItem('key');
        if (token) {
            loadPost(token);
        } else {
            setLoggedIn(false);
        }
    }, []);

    const loadPost = (token) => {
        axios.get(`https://port-0-dukfinder-57lz2alpp5sfxw.sel4.cloudtype.app/user/userinfo/`, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(response => {
            setLoggedIn(true);
            fetchPost(token);
        })
        .catch(error => {
            setLoggedIn(false);
            console.error('Invalid token:', error);
        });
    };

    const fetchPost = (token) => {
        axios.get(`https://port-0-dukfinder-57lz2alpp5sfxw.sel4.cloudtype.app/lost_posts/${p_id}`, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(response => {
            setPost(response.data);
            console.log('포스트를 불러왔습니다.');
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
        });
    };

    if (!post) {
        return <div>Loading...</div>; // 데이터가 로딩 중일 때 표시할 내용
    }

    if (!loggedIn) {
        return <Redirect to="../login" />; // 로그인되지 않았다면 로그인 페이지로 리다이렉트
    }
    return (
        <>  
            <D.FindDetailWrapper smallSize>

                <D.Title>분실물 상세정보</D.Title>
                <D.PathContainer>
                    <D.PathItem href="#">Home</D.PathItem>
                    <D.PathItem href="../Lost">
                        잃어버렸어요!
                    </D.PathItem>
                    <D.PathItem active>분실물 상세정보</D.PathItem>
                </D.PathContainer>

                <D.DetailContainer>
                    <D.ImageSize src={post.head_image} fluid smallSize/> 
                    <LostDetailCard post={post}/>
                </D.DetailContainer>
                <D.line></D.line>
                <CommentMain postId={p_id} path="lost_posts"/>
                <D.ButtonContainer>
                    <D.ButtonStyle variant="warning" type="submit" as={Link} to={`../lost`}>목록으로</D.ButtonStyle>
                </D.ButtonContainer>
            </D.FindDetailWrapper>
        </>
    );
}

export default LostDetail;