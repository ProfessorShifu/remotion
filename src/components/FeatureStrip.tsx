import React from 'react';
import {spring,useCurrentFrame,useVideoConfig} from 'remotion';
import {theme} from '../theme';

const items=[
 ['▤','বিষয়ভিত্তিক','MCQ অনুশীলন'],
 ['◷','সময় ধরে','মডেল টেস্ট'],
 ['▥','ফলাফল ও','উত্তর ব্যাখ্যা'],
 ['◇','গুরুত্বপূর্ণ','প্রশ্ন সেভ করুন'],
 ['▱','পূর্ববর্তী প্রশ্ন','অনুশীলন'],
];
export const FeatureStrip:React.FC<{start?:number;scale?:number}> = ({start=0,scale=1})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 return <div style={{position:'absolute',left:'4%',right:'4%',bottom:'7%',display:'flex',gap:14*scale}}>
 {items.map((it,i)=>{const p=spring({frame:f-start-i*7,fps,config:{damping:18,stiffness:100}});
 return <div key={it[0]} style={{flex:1,minWidth:0,opacity:p,transform:'translateY('+((1-p)*28)+'px)',display:'flex',alignItems:'center',gap:12*scale,padding:16*scale,borderRadius:20*scale,background:'rgba(255,255,255,.91)',border:'1px solid white',boxShadow:'0 12px 30px rgba(24,50,100,.08)'}}>
 <div style={{width:48*scale,height:48*scale,flexShrink:0,display:'grid',placeItems:'center',borderRadius:15*scale,background:'#EAF0FF',color:theme.blue,fontSize:28*scale,fontWeight:900}}>{it[0]}</div>
 <div><div style={{fontSize:17*scale,color:theme.muted,fontWeight:700}}>{it[1]}</div><div style={{fontSize:20*scale,color:theme.navy,fontWeight:900,lineHeight:1.2}}>{it[2]}</div></div></div>})}
 </div>;
};
