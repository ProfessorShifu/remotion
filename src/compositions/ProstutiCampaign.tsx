import React from 'react';
import {
  AbsoluteFill, Easing, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig,
} from 'remotion';
import {theme,bengaliFont} from '../theme';
import {BrandMark} from '../components/BrandMark';
import {CategoryNode} from '../components/CategoryNode';
import {FeatureStrip} from '../components/FeatureStrip';
import {GlassPanel} from '../components/GlassPanel';

const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const ease={...clamp,easing:Easing.out(Easing.cubic)};
const Section:React.FC<{children:React.ReactNode;dark?:boolean;accent?:string}>=({children,dark=false,accent})=>(
 <AbsoluteFill style={{background:dark?'linear-gradient(135deg,#17243B 0%,#203E85 55%,#3158D8 100%)':'linear-gradient(125deg,#F7F9FD 0%,#EEF3FF 58%,#DCE9FF 100%)',color:dark?'#fff':theme.navy,overflow:'hidden',fontFamily:bengaliFont}}>
  <AbsoluteFill style={{background:accent||'radial-gradient(circle at 83% 18%,rgba(49,88,216,.13),transparent 35%),radial-gradient(circle at 12% 90%,rgba(100,220,180,.17),transparent 28%)'}}/>
  <div style={{position:'absolute',width:'65%',height:'130%',right:'-20%',top:'-15%',borderRadius:'50%',border:'1px solid rgba(255,255,255,.38)',transform:'rotate(-18deg)'}}/>
  {children}
 </AbsoluteFill>
);

const Reveal:React.FC<{children:React.ReactNode;delay?:number;style?:React.CSSProperties}>=({children,delay=0,style})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 const p=spring({frame:f-delay,fps,config:{damping:18,stiffness:90}});
 return <div style={{opacity:p,transform:'translateY('+((1-p)*30)+'px)',...style}}>{children}</div>;
};

const BrandIntro:React.FC=()=> {
 const f=useCurrentFrame();
 const scale=spring({frame:f-5,fps:30,config:{damping:12,stiffness:100}});
 const ring=interpolate(f,[0,42],[.4,1],clamp);
 return <Section dark>
  <AbsoluteFill style={{justifyContent:'center',alignItems:'center'}}>
   <div style={{position:'absolute',width:600*ring,height:600*ring,border:'1px solid rgba(255,255,255,.16)',borderRadius:'50%'}}/>
   <div style={{position:'absolute',width:780*ring,height:780*ring,border:'1px solid rgba(255,255,255,.10)',borderRadius:'50%'}}/>
   <div style={{transform:'scale('+scale+')',filter:'drop-shadow(0 22px 35px rgba(0,0,0,.25))'}}>
    <BrandMark scale={1.55}/>
   </div>
   <Reveal delay={25} style={{marginTop:44,fontSize:28,letterSpacing:2,color:'#DCE7FF',fontWeight:600}}>আপনার লক্ষ্যের পথে, একসাথে</Reveal>
  </AbsoluteFill>
 </Section>;
};

const ChallengeScene:React.FC=()=>(
 <Section>
  <div style={{position:'absolute',left:'8%',top:'20%',width:'48%'}}>
   <Reveal><div style={{fontSize:24,fontWeight:800,color:theme.blue,letterSpacing:1}}>পরীক্ষার প্রস্তুতি কি ছড়িয়ে-ছিটিয়ে?</div></Reveal>
   <Reveal delay={10}><div style={{fontSize:76,fontWeight:900,lineHeight:1.2,marginTop:24}}>অনেক বিষয়।<div style={{color:theme.blue}}>একটাই লক্ষ্য।</div></div></Reveal>
   <Reveal delay={24}><div style={{fontSize:31,color:theme.muted,lineHeight:1.5,marginTop:24,fontWeight:600}}>প্রয়োজন একটি গোছানো পরিকল্পনা, নিয়মিত অনুশীলন এবং নিজের প্রস্তুতি যাচাই করার সুযোগ।</div></Reveal>
  </div>
  <div style={{position:'absolute',right:'8%',top:'20%',width:'33%',height:'60%'}}>
   {['বই ও নোট','প্রশ্নের অনুশীলন','সময় ব্যবস্থাপনা','নিজের অগ্রগতি'].map((x,i)=><Reveal key={x} delay={8+i*9} style={{position:'absolute',top:(i*23)+'%',left:(i%2)*10+'%',width:'85%'}}>
    <GlassPanel style={{padding:'22px 28px',display:'flex',alignItems:'center',gap:20,fontSize:27,fontWeight:800}}>
     <span style={{fontSize:30,color:theme.blue}}>{['▤','✎','◷','↗'][i]}</span>{x}
    </GlassPanel>
   </Reveal>)}
  </div>
 </Section>
);

const SolutionScene:React.FC=()=> {
 const f=useCurrentFrame();
 const {width,height}=useVideoConfig();
 const vertical=height>width;
 return <Section>
  <AbsoluteFill style={{padding:'8%',justifyContent:'center'}}>
   <Reveal><div style={{fontSize:24,color:theme.blue,fontWeight:800}}>এক প্ল্যাটফর্মে</div></Reveal>
   <Reveal delay={8}><div style={{fontSize:vertical?62:78,fontWeight:900,lineHeight:1.2,marginTop:16}}>প্রস্তুতি হোক<div style={{color:theme.blue}}>আরও গোছানো।</div></div></Reveal>
   <Reveal delay={19}><div style={{fontSize:29,color:theme.muted,marginTop:20}}>লক্ষ্য অনুযায়ী প্রস্তুতির বিষয়গুলো সাজিয়ে নিন।</div></Reveal>
   <div style={{position:'absolute',right:vertical?'8%':'7%',top:vertical?'48%':'22%',width:vertical?'84%':'42%',height:vertical?'32%':'58%'}}>
    <svg width="100%" height="100%" viewBox="0 0 760 520">
     <g stroke={theme.blue} strokeWidth="4" strokeDasharray="700" strokeDashoffset={700*(1-interpolate(f,[32,94],[0,1],clamp))} fill="none">
      <path d="M380 255 L140 90 M380 255 L620 90 M380 255 L140 420 M380 255 L620 420"/>
     </g>
     {[[140,90],[620,90],[140,420],[620,420]].map(([x,y],i)=><g key={i}><rect x={x-105} y={y-39} width="210" height="78" rx="19" fill="white" stroke="#DCE6FF" strokeWidth="2"/><circle cx={x-75} cy={y} r="8" fill={theme.blue}/><text x={x+12} y={y+8} textAnchor="middle" fontSize="22" fontWeight="700" fill={theme.navy}>{['বিসিএস','ব্যাংক','শিক্ষক নিবন্ধন','সরকারি চাকরি'][i]}</text></g>)}
     <circle cx="380" cy="255" r="94" fill="#DDE7FF"/><circle cx="380" cy="255" r="78" fill="white" stroke={theme.blue} strokeWidth="4"/>
     <text x="380" y="249" textAnchor="middle" fontSize="27" fontWeight="800" fill={theme.navy}>প্রস্তুতি</text><text x="380" y="280" textAnchor="middle" fontSize="17" fill={theme.blue}>এক প্ল্যাটফর্ম</text>
    </svg>
   </div>
  </AbsoluteFill>
 </Section>;
};

const CategoryScene:React.FC=()=> {
 const {width,height}=useVideoConfig();const vertical=height>width;
 const labels=['বিসিএস প্রস্তুতি','ব্যাংক চাকরি','শিক্ষক নিবন্ধন','সরকারি চাকরি'];
 return <Section dark>
  <AbsoluteFill style={{padding:'8%',justifyContent:'center'}}>
   <Reveal><div style={{fontSize:24,color:'#AFC5FF',fontWeight:800}}>আপনার লক্ষ্য, আপনার প্রস্তুতি</div></Reveal>
   <Reveal delay={8}><div style={{fontSize:vertical?65:78,fontWeight:900,lineHeight:1.2,marginTop:20}}>যে পরীক্ষার লক্ষ্য,<div style={{color:'#AFC5FF'}}>সেই প্রস্তুতির পথে।</div></div></Reveal>
   <div style={{position:'absolute',left:'8%',right:'8%',top:vertical?'48%':'59%',display:'grid',gridTemplateColumns:vertical?'1fr 1fr':'repeat(4,1fr)',gap:18}}>
    {labels.map((x,i)=><Reveal key={x} delay={24+i*8}><GlassPanel style={{padding:vertical?'20px 12px':'26px 16px',textAlign:'center',fontSize:vertical?22:25,fontWeight:900,color:theme.navy}}><div style={{fontSize:35,color:theme.blue,marginBottom:12}}>✦</div>{x}</GlassPanel></Reveal>)}
   </div>
  </AbsoluteFill>
 </Section>;
};

const FeatureScene:React.FC=()=> {
 const {width,height}=useVideoConfig();const vertical=height>width;
 return <Section>
  <AbsoluteFill style={{padding:'8%',justifyContent:'flex-start'}}>
   <Reveal><div style={{fontSize:24,color:theme.blue,fontWeight:800}}>প্রস্তুতির প্রয়োজনীয় টুলস</div></Reveal>
   <Reveal delay={8}><div style={{fontSize:vertical?62:78,fontWeight:900,lineHeight:1.2,marginTop:18}}>অনুশীলন থেকে মূল্যায়ন,<div style={{color:theme.blue}}>সব একসাথে।</div></div></Reveal>
   <div style={{position:'absolute',left:'7%',right:'7%',top:vertical?'39%':'52%',display:'grid',gridTemplateColumns:vertical?'1fr 1fr':'repeat(5,1fr)',gap:16}}>
    {[
     ['▤','বিষয়ভিত্তিক','MCQ অনুশীলন'],['◷','সময় ধরে','মডেল টেস্ট'],['▥','ফলাফল ও','উত্তর ব্যাখ্যা'],['◇','গুরুত্বপূর্ণ','প্রশ্ন সেভ করুন'],['▱','পূর্ববর্তী প্রশ্ন','অনুশীলন']
    ].map((it,i)=><Reveal key={it[0]} delay={18+i*9}><GlassPanel style={{padding:vertical?'20px 12px':'26px 16px',height:vertical?180:250,display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',textAlign:'center'}}>
     <div style={{width:64,height:64,borderRadius:18,background:'#EAF0FF',display:'grid',placeItems:'center',fontSize:34,color:theme.blue,fontWeight:900,marginBottom:18}}>{it[0]}</div>
     <div style={{fontSize:vertical?21:22,color:theme.muted,fontWeight:700}}>{it[1]}</div><div style={{fontSize:vertical?24:26,color:theme.navy,fontWeight:900,marginTop:8}}>{it[2]}</div>
    </GlassPanel></Reveal>)}
   </div>
  </AbsoluteFill>
 </Section>;
};

const WorkflowScene:React.FC=()=> {
 const f=useCurrentFrame();
 const {width,height}=useVideoConfig();const vertical=height>width;
 const steps=[['১','বিষয় বেছে নিন'],['২','অনুশীলন করুন'],['৩','সময় ধরে পরীক্ষা দিন'],['৪','ফলাফল দেখুন']];
 return <Section dark>
  <AbsoluteFill style={{justifyContent:'center',padding:'8%'}}>
   <Reveal><div style={{fontSize:24,color:'#B8CAFF',fontWeight:800}}>একটি সহজ প্রস্তুতি-চক্র</div></Reveal>
   <Reveal delay={8}><div style={{fontSize:vertical?62:76,fontWeight:900,marginTop:20}}>পরিকল্পনা থেকে অগ্রগতি।</div></Reveal>
   <div style={{display:'flex',flexDirection:vertical?'column':'row',alignItems:'center',gap:vertical?16:22,marginTop:vertical?70:90}}>
    {steps.map((s,i)=><React.Fragment key={s[0]}>
     <Reveal delay={22+i*13}><GlassPanel style={{width:vertical?620:380,padding:'24px 18px',display:'flex',alignItems:'center',gap:20,color:theme.navy}}>
      <div style={{width:66,height:66,borderRadius:20,background:theme.blue,color:'#fff',display:'grid',placeItems:'center',fontSize:30,fontWeight:900}}>{s[0]}</div>
      <div style={{fontSize:vertical?29:27,fontWeight:900}}>{s[1]}</div>
     </GlassPanel></Reveal>
     {i<3&&!vertical&&<div style={{fontSize:42,color:'#B7CBFF'}}>→</div>}
    </React.Fragment>)}
   </div>
  </AbsoluteFill>
 </Section>;
};

const CTAOutro:React.FC=()=> {
 const f=useCurrentFrame();const p=spring({frame:f-5,fps:30,config:{damping:14,stiffness:80}});
 return <Section dark>
  <AbsoluteFill style={{justifyContent:'center',alignItems:'center',textAlign:'center',padding:'8%'}}>
   <div style={{transform:'scale('+p+')'}}><BrandMark scale={1.45}/></div>
   <Reveal delay={18}><div style={{fontSize:66,fontWeight:900,marginTop:58,lineHeight:1.2}}>লক্ষ্য থাকুক স্পষ্ট,<div style={{color:'#AFC5FF'}}>প্রস্তুতি হোক গোছানো।</div></div></Reveal>
   <Reveal delay={36}><div style={{marginTop:44,display:'inline-block',padding:'20px 42px',borderRadius:999,background:'#FFFFFF',color:theme.blue,fontSize:31,fontWeight:900}}>প্রস্তুতি শুরু করুন আজই　→</div></Reveal>
   <Reveal delay={52}><div style={{fontFamily:'Arial,sans-serif',fontSize:27,letterSpacing:5,marginTop:46,color:'#DCE7FF'}}>PROSTUTI.CO</div></Reveal>
  </AbsoluteFill>
 </Section>;
};

const CameraAwareCampaign:React.FC=()=>{
 const f=useCurrentFrame();const {width,height}=useVideoConfig();const vertical=height>width;
 const opening=vertical?0.78:1;
 const x=interpolate(f,[0,250,480,800,1100,1350],[0,-12,8,-8,5,0],clamp);
 const y=interpolate(f,[0,250,480,800,1100,1350],[0,7,-5,5,-3,0],clamp);
 return <AbsoluteFill style={{transform:'translate('+x+'px,'+y+'px)'}}>
  <Sequence from={0} durationInFrames={100}><BrandIntro/></Sequence>
  <Sequence from={100} durationInFrames={170}><ChallengeScene/></Sequence>
  <Sequence from={270} durationInFrames={210}><SolutionScene/></Sequence>
  <Sequence from={480} durationInFrames={220}><CategoryScene/></Sequence>
  <Sequence from={700} durationInFrames={240}><FeatureScene/></Sequence>
  <Sequence from={940} durationInFrames={220}><WorkflowScene/></Sequence>
  <Sequence from={1160} durationInFrames={460}><CTAOutro/></Sequence>
 </AbsoluteFill>;
};

export const ProstutiCampaign:React.FC=()=>{
 const {width,height}=useVideoConfig();
 const isLandscape=width>height;
 return <AbsoluteFill style={{background:theme.background,fontFamily:bengaliFont,overflow:'hidden'}}>
  <CameraAwareCampaign/>
  <AbsoluteFill style={{pointerEvents:'none',border:'1px solid rgba(49,88,216,.08)'}}/>
  <div style={{position:'absolute',right:'3%',top:'2%',fontFamily:'Arial,sans-serif',fontSize:14,color:'rgba(23,36,59,.35)',letterSpacing:2}}>PROSTUTI • {isLandscape?'BRAND FILM':'SOCIAL FILM'}</div>
 </AbsoluteFill>;
};
