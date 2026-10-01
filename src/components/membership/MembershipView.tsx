"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, LogIn, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PayNowCard } from "@/components/payment/PayNowCard";
import { BankTransferCard } from "@/components/payment/BankTransferCard";
import { ContributionForm } from "@/components/membership/ContributionForm";
import { PendingVerification } from "@/components/membership/PendingVerification";
import { MembershipRejected } from "@/components/membership/MembershipRejected";
import { useAuth } from "@/lib/auth/AuthProvider";

export function MembershipView() {
  const { user, isLoaded } = useAuth(); const [justSubmitted,setJustSubmitted]=useState(false); const [resubmitting,setResubmitting]=useState(false); const status=user?.membershipStatus??"FREE";
  if(isLoaded&&status==="ACTIVE") return null;
  if(isLoaded&&(status==="PENDING"||justSubmitted)) return <section className="py-16 sm:py-24"><Container><PendingVerification/></Container></section>;
  if(isLoaded&&status==="REJECTED"&&!resubmitting) return <section className="py-16 sm:py-24"><Container><MembershipRejected onResubmit={()=>setResubmitting(true)}/></Container></section>;
  return <>
    <section className="py-12 sm:py-16"><Container><div className="mx-auto max-w-3xl rounded-[2rem] border-2 border-green-200 bg-green-50 p-7 text-center shadow-sm"><Sparkles className="mx-auto h-8 w-8 text-green-700"/><h2 className="mt-3 font-display text-2xl font-bold text-detective-blue-900">Learning stays free.</h2><p className="mt-3 text-lg text-detective-blue-700">Every child can explore all 15 adventures without paying. The options below are only for adults who voluntarily wish to support the initiative.</p></div></Container></section>
    <section className="bg-detective-blue-50/70 py-16 sm:py-24"><Container><motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.3}} className="mx-auto max-w-3xl rounded-[2rem] border-2 border-detective-orange-200 bg-white p-8 shadow-sm sm:p-12"><div className="flex items-center gap-3"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-detective-orange-500 text-white"><Heart className="h-6 w-6"/></span><h2 className="font-display text-2xl font-bold text-detective-blue-900 sm:text-3xl">Optional Support ❤️</h2></div><p className="mt-6 text-lg leading-relaxed text-detective-blue-700/85">Voluntary contributions can help IP2Kids continue creating educational adventures for children. Donations are made periodically by the founder to children&apos;s charities in Singapore, including organisations supporting children affected by cancer.</p></motion.div></Container></section>
    <section className="py-16 sm:py-24"><Container><SectionHeading eyebrow="Optional contribution" title="Choose a Support Method" subtitle="Adults who wish to support IP2Kids may make a one-time SGD 10 contribution. This is not required for learning access."/><div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2"><PayNowCard/><BankTransferCard/></div></Container></section>
    <section className="bg-detective-blue-50/70 py-16 sm:py-24"><Container><SectionHeading title="I've Completed My Contribution"/><div className="mx-auto mt-12 max-w-2xl rounded-[2rem] border-2 border-detective-blue-100 bg-white p-6 shadow-sm sm:p-10">{!isLoaded?<p className="text-center font-display font-semibold text-detective-blue-700">Checking your account…</p>:user?<ContributionForm onSubmitted={()=>setJustSubmitted(true)}/>:<div className="text-center"><p className="text-lg text-detective-blue-700/85">Please log in or create a free account if you want us to link your optional contribution to your account.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"><Link href="/login?redirect=%2Fmembership" className="inline-flex items-center justify-center gap-2 rounded-full bg-detective-orange-500 px-8 py-4 font-display text-lg font-semibold text-white"><LogIn className="h-5 w-5"/>Login</Link><Link href="/register?redirect=%2Fmembership" className="inline-flex items-center justify-center gap-2 rounded-full bg-detective-blue-600 px-8 py-4 font-display text-lg font-semibold text-white"><Sparkles className="h-5 w-5"/>Create Free Account</Link></div></div>}</div></Container></section>
  </>;
}
