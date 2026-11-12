import React from 'react';

type Props = {children:React.ReactNode;style?:React.CSSProperties;radius?:number};
export const GlassPanel:React.FC<Props> = ({children,style,radius=24}) => (
  <div style={{background:'rgba(255,255,255,.82)',border:'1px solid rgba(255,255,255,.96)',borderRadius:radius,boxShadow:'0 22px 60px rgba(32,61,126,.11)',backdropFilter:'blur(18px)',...style}}>{children}</div>
);
