import React from 'react';
import {AbsoluteFill,interpolate,spring,useCurrentFrame,useVideoConfig} from 'remotion';
import {theme,bengaliFont} from '../theme';

type Props={eyebrow?:string;title:string;accent?:string;detail?:string;start?:number;align?:'left'|'center';width?:string};
export const SceneTitle:React.FC<Props>=({eyebrow,title,accent,detail,start=0,align='left',width='100%'})=>{
 const f=useCurrentFrame(); const {fps}=useVideoConfig();
 const p=spring({frame:f-start,fps,config:{damping:18,stiffness:90}});
 return <AbsoluteFill style={{justifyContent:'center',alignItems:align==='center'?'center':'flex-start',padding:'0 8%'}}>
  <div style={{width,textAlign:align,opacity:p,transform:'translateY('+((1-p)*34)+'px)',fontFamily:bengaliFont}}>
   {eyebrow&&<div style={{display:'inline-block',padding:'10px 18px',borderRadius:999,background:'rgba(49,88,216,.10)',color:theme.blue,fontSize:23,fontWeight:800,letterSpacing:.2,marginBottom:28}}>{eyebrow}</div>}
   <div style={{fontSize:76,fontWeight:900,lineHeight:1.18,color:theme.navy}}>{title}{accent&&<div style={{color:theme.blue}}>{accent}</div>}</div>
   {detail&&<div style={{fontSize:30,lineHeight:1.55,color:theme.muted,fontWeight:600,marginTop:24,maxWidth:980}}>{detail}</div>}
  </div>
 </AbsoluteFill>;
};
