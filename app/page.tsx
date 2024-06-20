import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerTitle,
    DrawerTrigger,
} from "@/app/_components/drawer";
import { LanguageSwitch } from "@/app/_components/language-switch";
import { MessageInput } from "@/app/_components/message-input";
import prisma from "@/prisma";
import {
    Braces,
    BrainCircuit,
    ExternalLink,
    Eye,
    Github,
    Globe,
    Home,
    Mail,
    MessageCircle,
    Twitter,
    Watch,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";

export const dynamicParams = true;
export const dynamic = "force-static";
export const revalidate = 1;

async function updateCount() {
    try {
        await prisma.counter.upsert({
            where: { id: 1 },
            update: { visitCount: { increment: 1 } },
            create: { id: 1, visitCount: 1 },
        });
    } catch (error) {
        console.error(error);
    }
}

async function UpdateServerCounter() {
    await updateCount();
    return null;
}

async function getPageViewCount() {
    const data = await prisma.counter.findUnique({ where: { id: 1 } });
    return data?.visitCount ?? "?";
}

async function PageViews() {
    const pageViewCount = await getPageViewCount();
    return (
        <span className="flex items-center text-xs text-muted-foreground/80">
            <Eye className="mr-1 h-4 w-4" />
            {pageViewCount} page views
        </span>
    );
}

export default function HomePage() {
    return (
        <main
            id="main"
            tabIndex={-1}
            className="gutter-stable relative isolate z-0 mb-24 h-full w-full min-w-0 max-w-full py-6 outline-none">
            <header className="container flex w-full items-center justify-between">
                <h1 className="text-sm font-medium text-foreground md:text-base">
                    <Link
                        href="/"
                        className="flex items-center underline-offset-1 hover:underline hover:opacity-80">
                        @gsmt
                    </Link>
                </h1>
                <LanguageSwitch />
            </header>
            <div className="container flex flex-col space-y-6 pt-9">
                <div className="flex w-full flex-col space-y-4">
                    <div className="flex w-full justify-between">
                        <span className="text-xs text-muted-foreground/90">
                            <span className="text-muted-foreground/60">IPA</span>&nbsp;
                            <i>/ˈɡɪlbət/</i> —&nbsp;software developer
                        </span>
                        <React.Suspense>
                            <PageViews />
                        </React.Suspense>
                    </div>
                    <p className="text-sm text-foreground">
                        Developer at heart, passionate about building a better web, creating great
                        experiences for end users, and trying to solve real-world{" "}
                        <Globe className="inline-block h-4 w-4 opacity-50" /> problems with an eye
                        for design and fluid experiences. I&apos;m also a fan of open-source
                        software, and cool looking watches{" "}
                        <Watch className="inline-block h-4 w-4 opacity-50" />.
                        <br />
                        <br />
                        Introduced to technology at a young age, I have been building software for
                        over 3 years now. Doing everything from data scrapers{" "}
                        <Braces className="inline-block h-4 w-4 opacity-50" />, dynamic websites and
                        APIs, native applications, fractal simulations and data visualizations.
                        <br />
                        <br />
                        Outside of programming, I enjoy doing photography and traveling. I&apos;m
                        always looking for new ways to use technology to make a positive impact on
                        people and consistently improve. I have been particularly interested in
                        using ML <BrainCircuit className="inline-block h-4 w-4 opacity-50" /> to
                        create more personalized and engaging experiences for users.
                    </p>
                </div>
            <h4 className="mt-6 flex w-full flex-col text-sm text-foreground">Links</h4>
            </div>
            <div className="container flex w-full flex-col items-center space-y-4 pt-6 md:flex-row md:space-x-4 md:space-y-0">
                <Link
                    href="https://twitter.com/meetgilberto"
                    title="Twitter"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex h-9 w-full items-center justify-center rounded-3xl border bg-transparent px-4 text-sm md:w-fit">
                    <Twitter className="mr-2 h-4 w-4" />
                    Twitter
                </Link>
                <Link
                    href="https://github.com/rortan134"
                    title="GitHub"
                    className="flex h-9 w-full items-center justify-center rounded-3xl border bg-transparent px-4 text-sm md:w-fit">
                    <Github className="mr-2 h-4 w-4" />
                    Github
                </Link>
                <Link
                    href="mailto:gsmt.dev@gmail.com"
                    title="Email"
                    className="flex h-9 w-full items-center justify-center rounded-3xl border bg-transparent px-4 text-sm md:w-fit">
                    <Mail className="mr-2 h-4 w-4" />
                    gsmt.dev@gmail.com
                </Link>
            </div>
            <div className="container pt-8">
                <span className="text-xs text-muted-foreground/50">
                    @ {new Date().getUTCFullYear()} GSMT. All rights reserved.
                </span>
            </div>
            <FloatingNavigation />
            <React.Suspense>
                <UpdateServerCounter />
            </React.Suspense>
        </main>
    );
}

function FloatingNavigation() {
    return (
        <nav className="fixed inset-x-0 bottom-0 bg-gradient-to-t from-black/15 pb-12">
            <div className="absolute bottom-3 left-1/2 flex w-64 -translate-x-1/2 items-center justify-between overflow-hidden rounded-3xl border bg-neutral-300/90 px-1 py-0.5 backdrop-blur-sm">
                <Link
                    href="/"
                    title="Home"
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-neutral-400/60 px-3 py-1.5">
                    <Home className="h-4 w-4" />
                    <span className="sr-only">Go to home</span>
                </Link>
                <Drawer>
                    <DrawerTrigger
                        title="Featured projects"
                        className="inline-flex w-full items-center justify-center rounded-2xl px-4 py-1.5 text-sm font-medium opacity-90">
                        Work
                        <span className="sr-only">Expand work drawer</span>
                    </DrawerTrigger>
                    <DrawerContent className="px-0">
                        <DrawerTitle className="px-4">Work</DrawerTitle>
                        <DrawerDescription className="max-w-lg px-4">
                            My focus these days is mainly on the web ecosystem, but I have worked
                            with many languages and platforms.{" "}
                            <span className="opacity-50">—&nbsp;Click on a project to expand</span>
                        </DrawerDescription>
                        <div className="mt-6 flex w-full flex-col space-y-4 md:space-y-16">
                            <div className="grid grid-cols-4 gap-4 md:grid-cols-1 md:gap-x-0">
                                <div className="relative col-span-1 flex flex-col overflow-hidden md:col-span-full md:row-span-full md:w-full md:py-4">
                                    <div className="absolute inset-0 hidden bg-neutral-200 object-cover md:block"></div>
                                    <div className="z-10 ml-4 aspect-square h-full max-h-20 w-auto max-w-[80px] rounded-md bg-neutral-300" />
                                </div>
                                <div className="col-span-3 flex w-full flex-col space-y-0.5 pr-4 md:pl-4">
                                    <h3 className="text-sm font-medium text-foreground">Project</h3>
                                    <p className="text-xs text-muted-foreground">
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                        Quo laborum veniam at nostrum quia tenetur magnam quasi
                                        vitae.
                                    </p>
                                    <div className="flex items-center space-x-4">
                                        <span className="truncate text-xs text-muted-foreground">
                                            Lorem • ipsum • dolor
                                        </span>
                                        <Link
                                            href="/"
                                            className="flex items-center justify-center text-xs text-muted-foreground underline-offset-2 active:underline md:hover:underline">
                                            View live
                                            <ExternalLink className="ml-1 h-3 w-3" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex w-full flex-col space-y-4 md:space-y-16">
                            <div className="grid grid-cols-4 gap-4 md:grid-cols-1 md:gap-x-0">
                                <div className="relative col-span-1 flex flex-col overflow-hidden md:col-span-full md:row-span-full md:w-full md:py-4">
                                    <div className="absolute inset-0 hidden bg-neutral-200 object-cover md:block"></div>
                                    <div className="z-10 ml-4 aspect-square h-full max-h-20 w-auto max-w-[80px] rounded-md bg-neutral-300" />
                                </div>
                                <div className="col-span-3 flex w-full flex-col space-y-0.5 pr-4 md:pl-4">
                                    <h3 className="text-sm font-medium text-foreground">Project</h3>
                                    <p className="text-xs text-muted-foreground">
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                        Quo laborum veniam at nostrum quia tenetur magnam quasi
                                        vitae.
                                    </p>
                                    <div className="flex items-center space-x-4">
                                        <span className="truncate text-xs text-muted-foreground">
                                            Lorem • ipsum • dolor
                                        </span>
                                        <Link
                                            href="/"
                                            className="flex items-center justify-center text-xs text-muted-foreground underline-offset-2 active:underline md:hover:underline">
                                            View live
                                            <ExternalLink className="ml-1 h-3 w-3" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DrawerContent>
                </Drawer>
                <Link
                    href="/reads"
                    title="Reads"
                    className="inline-flex w-full items-center justify-center rounded-2xl px-4 py-1.5 text-sm font-medium opacity-90">
                    Reads
                </Link>
                <Drawer>
                    <DrawerTrigger
                        title="Send a Message"
                        className="inline-flex w-full items-center justify-center rounded-2xl px-3 py-1.5 opacity-90">
                        <MessageCircle className="h-4 w-4" />
                        <span className="sr-only">Send a Message</span>
                    </DrawerTrigger>
                    <DrawerContent>
                        <MessageInput />
                    </DrawerContent>
                </Drawer>
            </div>
        </nav>
    );
}
