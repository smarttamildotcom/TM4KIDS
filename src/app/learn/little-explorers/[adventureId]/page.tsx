import { notFound } from "next/navigation";
import { learningWorlds } from "@/lib/learning-worlds";
import { LittleExplorerLesson } from "@/components/sections/LittleExplorerLesson";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
export function generateStaticParams(){return learningWorlds[0].titles.map((_,i)=>({adventureId:String(i+1)}));}
export default async function Page({params}:{params:Promise<{adventureId:string}>}){
 const {adventureId}=await params;const id=Number(adventureId);
 if(!Number.isInteger(id)||id<1||id>learningWorlds[0].titles.length||String(id)!==adventureId)notFound();
 return <><SiteHeader/><LittleExplorerLesson key={id} id={id} title={learningWorlds[0].titles[id-1]}/><SiteFooter/></>;
}
