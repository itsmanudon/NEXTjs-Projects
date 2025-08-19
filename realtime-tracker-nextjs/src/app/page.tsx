import Image from "next/image";
import dynamic from "next/dynamic";

const LiveMap = dynamic(() => import("../components/LiveMap").then(m => m.default), {
    ssr: false,
});

export default function Home() {
    return (
        <div className="font-sans min-h-screen p-6 sm:p-10">
            <main className="flex flex-col gap-6 max-w-6xl mx-auto w-full">
                <div className="flex items-center gap-3">
                    <Image
                        className="dark:invert"
                        src="/next.svg"
                        alt="Next.js logo"
                        width={120}
                        height={26}
                        priority
                    />
                    <h1 className="text-xl font-semibold tracking-tight">Realtime Tracker</h1>
                </div>
                <LiveMap />
            </main>
        </div>
    );
}
