import React from 'react';
import {interpolate,spring,useCurrentFrame,useVideoConfig} from 'remotion';
import {theme} from '../theme';

type Props={label:string;index:number;left?:string;top?:string;delay?:number;compact?:boolean};
export const CategoryNode:React.FC<Props>=({label,index,left='0%',top='0%',delay=0,compact=false})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 const p=spring({frame:f-delay-index*8,fps,config:{damping:16,stiffness:100}});
 const float=Math.sin((f+index*18)/18)*6;
 return <div style={{position:'absolute',left,top,opacity:p,transform:'translateY('+((1-p)*24+float)+'px) scale('+(.94+.06*p)+')',padding:compact?'13px 18px':'17px 26px',borderRadius:18,background:'rgba(255,255,255,.9)',border:'1px solid white',boxShadow:'0 14px 34px rgba(30,60,120,.12)',fontSize:compact?20:26,fontWeight:800,color:theme.navy,whiteSpace:'nowrap'}}>
  <span style={{color:theme.blue,marginRight:12}}>✦</span>{label}
 </div>;
};
