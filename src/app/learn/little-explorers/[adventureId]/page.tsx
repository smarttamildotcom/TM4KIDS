import { notFound } from "next/navigation";
import { littleExplorers } from "@/lib/little-explorers";
import { learningWorlds } from "@/lib/learning-worlds";
import { LittleExplorerLesson } from "@/components/sections/LittleExplorerLesson";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
export function generateStaticParams(){return littleExplorers.map(l=>({adventureId:String(l.id)}));}
export default async function Page({params}:{params:Promise<{adventureId:string}>}){
 const {adventureId}=await params;
 const lesson=littleExplorers.find(l=>String(l.id)===adventureId);
 if(!lesson)notFound();
 return <><SiteHeader/><LittleExplorerLesson lesson={lesson} title={learningWorlds[0].titles[lesson.id-1]}/><SiteFooter/></>;
}
