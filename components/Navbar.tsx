'use client'
import Link from "next/link"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { MenuIcon, Mountain } from 'lucide-react'
import { SignInButton } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useUser, UserButton } from "@clerk/nextjs"
import { ModeToggle } from "./ModeToggle"


export default function Component() {
    const { isSignedIn } = useUser()
    const pathname = usePathname()
    return (
        <header className="w-full bg-background px-4 py-3 shadow-sm md:px-6 lg:px-8 text-primary">
            <div className="container mx-auto flex items-center justify-between">
                <Link href="#" className="flex items-center" prefetch={false}>
                    <Mountain />
                    <span className="ml-2 text-lg font-bold">Cookbook</span>
                </Link>
                <nav className="hidden space-x-8 md:flex">
                    <div className="space-x-3">

                        <Link href="/">
                            <Button variant="ghost" className={cn({ "bg-secondary/[0.25]": pathname == "/" })}>
                                Home
                            </Button>
                        </Link>
                        <Link href="/about">
                            <Button variant="ghost" className={cn({ "bg-secondary/[0.25]": pathname.includes("/about") })}>
                                About
                            </Button>
                        </Link>

                    </div>
                    <ModeToggle />

                    {isSignedIn ? (
                        <UserButton />

                    ) : (
                        <SignInButton>
                            <Link href={'/sign-in'}>
                                <Button> Get Started </Button>
                            </Link>
                        </SignInButton>
                    )}

                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="md:hidden">
                            <MenuIcon className="h-6 w-6" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <div className="grid gap-4 p-4">
                            <Link href="/">
                                <Button variant="ghost" className="w-full pl-1">Home</Button>
                            </Link>
                            <Link href="/about">
                                <Button variant="ghost" className="w-full pl-1">About</Button>
                            </Link>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header >
    )
}
