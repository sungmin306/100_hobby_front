import React from 'react';
import styles from '../hobbyResult/Hobbyresult.module.css';
import { useEffect,useState } from 'react';
import resultdata from '../../Hobbypicter.js';
import axios from 'axios';
import Loading2 from '../Loading/Loading2';
import { useSelector,useDispatch } from 'react-redux/es/exports';
import { reset_select } from '../../store';
import { useNavigate } from 'react-router-dom';
import {RiKakaoTalkFill, RiTwitterFill, RiInstagramLine} from "react-icons/ri";

const Hobbyresult = () => {
    let [loading,setLoading] = useState(true);
    // let [result_data] = useState(resultdata);
    let [postdata,successPost] = useState(false);
    let [hobby,setHobby] = useState("");;
    const navigate = useNavigate();
    let dispatch = useDispatch();

    let a = useSelector((state)=>{return state.select})

    useEffect(()=>{
        //'http://127.0.0.1:8000/create/'
        fetch('http://127.0.0.1:8000/selects/create/', {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                MBTI : a[0].payload,
                category : a[1].payload,
                people_number: a[2].payload,
                inout : a[3].payload,
                weather: a[4].payload
            })
            })
            .then( res => {
            if (res.ok) {
                console.log("최종 redux는 :",a);
                successPost(true);
            }
            })
        // setTimeout(()=>{setLoading(false); }, 2000);
    },[])

    useEffect(()=>{
        //'http://127.0.0.1:8000/create/'
        if(postdata){
            // console.log("변화감지");
            axios.get('http://127.0.0.1:8000/selects/create/')
            .then(response => {
                console.log("res:",response);
                setHobby(response.data["return_hobby"]);
                //가상 test.json에서 가져오는거임 양식은 너가 정해서 말해주면될듯
            })
            .catch(function (error) {
                // 에러 핸들링
                console.log(error);
            })
            .then(()=>{ setTimeout(()=>{setLoading(false); }, 2000); })
        }
    },[postdata])

    let pic =resultdata.find(function(x){
        return x.name === hobby});

    return (
        
        <div className={styles.container}>
            {   
                loading ?  <Loading2/> : 
                <>
                <div className={styles.top}>
                    <div className={styles.top1}>
                        나에게 어울리는 취미는 ?!
                    </div>
                    <div className={styles.top2}>
                        <img src = {pic.url} /> 
                    </div>
                    <div className={styles.top3}>
                       {hobby}입니다 !
                    </div>
                </div>
                <div className={styles.middle}>
                        <div className={styles.test_shre}>
                            결과 저장하기
                        </div>

                        <div className={styles.test_shre}
                        onClick={()=>{dispatch(reset_select());navigate('/');}}>
                            다시하기
                        </div>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.bottom1}>
                        공유하기
                    </div>
                    <div className={styles.bottom2}>
                        <div className={styles.bottom_icon}>
                        <RiKakaoTalkFill size="45"/>
                        </div>
                        <div className={styles.bottom_icon}>
                        <RiTwitterFill size="45"/>
                        </div>
                        <div className={styles.bottom_icon}>
                        <RiInstagramLine size="45"/>
                        </div>
                    </div>
    
                </div>
                </>
                
            }


        </div>
        
    );
};

export default Hobbyresult;