import React from 'react';
import {staticFile, Img} from 'remotion';
import {theme,bengaliFont} from '../theme';

type Props={scale?:number;showWordmark?:boolean};
export const BrandMark:React.FC<Props>=({scale=1,showWordmark=true})=>{
 const logoPath=staticFile('assets/prostuti-logo.png');
 return <div style={{display:'flex',alignItems:'center',gap:18*scale}}>
  <div style={{width:82*scale,height:82*scale,borderRadius:20*scale,background:'#fff',border:'1px solid rgba(49,88,216,.12)',boxShadow:'0 12px 35px rgba(23,36,59,.12)',display:'grid',placeItems:'center',overflow:'hidden'}}>
   <Img src={logoPath} style={{width:'100%',height:'100%',objectFit:'contain'}}/>
  </div>
  {showWordmark&&<div style={{fontFamily:bengaliFont}}>
   <div style={{fontSize:44*scale,fontWeight:900,lineHeight:1,color:theme.navy}}>প্রস্তুতি</div>
   <div style={{fontFamily:'Arial,sans-serif',fontSize:15*scale,letterSpacing:4,color:theme.muted,marginTop:7}}>PROSTUTI.CO</div>
  </div>}
 </div>;
};
