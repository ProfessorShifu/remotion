import React from 'react';
import {Img, staticFile} from 'remotion';

type Props = {scale?: number; showWordmark?: boolean};

export const BrandMark: React.FC<Props> = ({scale = 1, showWordmark = true}) => (
  <div style={{display:'flex',alignItems:'center',gap:18*scale}}>
    <div style={{width:76*scale,height:76*scale,borderRadius:22*scale,background:'#FFFFFF',border:'1px solid rgba(49,88,216,.12)',boxShadow:'0 12px 35px rgba(23,36,59,.10)',display:'grid',placeItems:'center',overflow:'hidden'}}>
      <Img src={staticFile('assets/prostuti-logo.png')} style={{width:'100%',height:'100%',objectFit:'contain'}} onError={() => undefined}/>
    </div>
    {showWordmark && <div>
      <div style={{fontSize:42*scale,fontWeight:900,lineHeight:1,color:'#17243B'}}>প্রস্তুতি</div>
      <div style={{fontFamily:'Arial,sans-serif',fontSize:15*scale,letterSpacing:4,color:'#63718A',marginTop:7}}>PROSTUTI.CO</div>
    </div>}
  </div>
);
