import Image from "next/image";

export default function About() {
    return (
        <main className="flex flex-col justify-start items-center border-none h-full px-4 py-3 shadow-sm mt-16 lg:px-8  text-primary/90">
            <div className="">
                <h1 className="text-5xl font-bold ">Welcome to the Cookbook</h1>
                <p className="text-lg text-center">A collection of recipes</p>
            </div>
        </main>
    );
}
