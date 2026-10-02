"use client";
import type { ReactNode } from "react"; import { Button } from "@/components/ui/Button";
type Props={children?:ReactNode;size?:"md"|"lg";variant?:"primary"|"secondary"|"outline";className?:string;href?:string};
export function AdventureButton({children="Explore Adventures",size="md",variant="primary",className,href="/#journey"}:Props){return <Button href={href} size={size} variant={variant} className={className}>{children}</Button>}
