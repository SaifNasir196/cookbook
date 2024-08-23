'use client'
import Link from "next/link"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, Heart, Mountain, Bell } from 'lucide-react'
import { SignInButton } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useUser, UserButton } from "@clerk/nextjs"
import { ModeToggle } from "./ModeToggle"
import { SignOutButton } from "@clerk/nextjs"


export default function Component() {
    const { isSignedIn } = useUser()
    const pathname = usePathname()
    return (
        <header className="w-full bg-background px-4 py-3 shadow-sm md:px-6 lg:px-8">
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

                        <Link href="/explore">
                            <Button variant="ghost" className={cn({ "bg-secondary/[0.25]": pathname.includes("/explore") })}>
                                Explore
                            </Button>
                        </Link>

                        <Link href="/about">
                            <Button variant="ghost" className={cn({ "bg-secondary/[0.25]": pathname.includes("/about") })}>
                                About
                            </Button>
                        </Link>
                    </div>

                    <div className="flex gap-6">

                        <Link href="/notifications">
                            <Button variant="ghost" size="icon" className={cn({ "bg-secondary/[0.25]": pathname == "/notifications" })}>
                                <Bell size={19} />
                            </Button>
                        </Link>

                        <Link href="/favourites">
                            <Button variant="ghost" size="icon" className={cn({ "bg-secondary/[0.25]": pathname == "/favourites" })}>
                                <Heart size={19} />
                            </Button>
                        </Link>

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
                    </div>

                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="md:hidden">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="flex flex-col justify-between">
                        <div className="grid gap-4 p-4">
                            <Link href="/">
                                <Button variant="ghost" className={cn("w-full", { "bg-secondary/[0.25]": pathname == "/" })}>
                                    Home
                                </Button>
                            </Link>

                            <Link href="/explore">
                                <Button variant="ghost" className={cn("w-full", { "bg-secondary/[0.25]": pathname.includes("/explore") })}>
                                    Explore
                                </Button>
                            </Link>

                            <Link href="/about">
                                <Button variant="ghost" className={cn("w-full", { "bg-secondary/[0.25]": pathname == "/about" })}>
                                    About
                                </Button>
                            </Link>


                            <Link href="/notifications">
                                <Button variant="ghost" className={cn("w-full", { "bg-secondary/[0.25]": pathname == "/notifications" })}>
                                    Notifications
                                </Button>
                            </Link>

                            <ModeToggle mobile />

                        </div>
                        <div className="p-4">
                            {isSignedIn ? (
                                <SignOutButton>
                                    <Button variant="ghost" className="w-full">Sign out</Button>
                                </SignOutButton>
                            ) : (
                                <SignInButton>
                                    <Link href={'/sign-in'}>
                                        <Button className="w-full"> Get Started </Button>
                                    </Link>
                                </SignInButton>
                            )}
                        </div>

                    </SheetContent>
                </Sheet>
            </div >
        </header >
    )
}
