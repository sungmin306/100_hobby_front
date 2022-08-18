import React from 'react';
import styles from './Qbar.module.css';
// import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { add_select } from '../../store';
import { useDispatch, useSelector} from 'react-redux/es/exports';

const Weather = () => {
    const navigate = useNavigate();
    let dispatch = useDispatch();
    let [score4,setScore4] = useState(50);
    let a = useSelector((state)=>{return state.select})
    return (
        <div className={styles.container} style={{backgroundColor:"#e1f5fe"}}>
            <div className={styles.top}>
                어느 계절에<br/>
                취미 활동을<br/>
                하고 싶으신가요?<br/><br/>
                <p className={styles.top_bottom}>원을 움직여서 선택해주세요!</p>
            </div>
            
            <div className={styles.bar}>
                <Box sx={{ width:"75%" }}>
                <Slider
                    aria-label="Temperature"
                    defaultValue={50}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    step={5}
                    marks
                    min={0}
                    max={100}
                    onChange={(e)=>{setScore4(e.target.value);}}
                />
                </Box>
                <br/>
                
            </div>
            <div className={styles.bar_comment}>
                <div>여름</div>
                <div>상관없음</div>
                <div>겨울</div>
            </div>
            <div className={styles.next_btn}>
                <div className={styles.btn} onClick={()=>{
                    dispatch(add_select(score4));
                    navigate('/hobby-result');
                }}>결과보기👉</div>
            </div>

        </div>
    );
};

function valuetext(value) {
    return `${value}°C`;
  }

export default Weather;