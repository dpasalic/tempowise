import Image from "next/image";
import rightSectionImg from "../../public/images/pexels-andrey-grushnikov-223358-707676.jpg";
import leftSectionImg from "../../public/images/mesh-gradient2.png";
import { QuoteDownIcon } from "@/public/icons";

export default function LoginSignup({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="grid lg:grid-cols-2 min-h-screen">
      <section className="">
        <div className="relative flex justify-center items-center h-full p-6">
          {children} {/* form */}
        </div>
      </section>
      <section className="relative hidden lg:block">
        <div className="h-full">
          <Image
            src={rightSectionImg}
            fill={true}
            alt="Picture of the author"
            placeholder="blur"
            style={{ objectFit: "cover", objectPosition: "0% 0%" }}
          />
        </div>
        <div className="absolute left-0 top-0 flex flex-col justify-center gap-0 w-auto h-full">
          <div className="grid grid-cols-2 h-full">
            <div className="glass"></div>
            <div></div>
            <div className="glass glass-bg-2"></div>
            <div className="glass glass-bg-3"></div>
          </div>
          <div className="glass glass-bg-1 flex flex-col justify-center w-[360px] px-6 py-[66px]">
            <QuoteDownIcon width={50} height={50} />
            <p className="pt-4 text-white text-4xl">For every minute spent organizing, an hour is earned</p>
          </div>
          <div className="grid grid-cols-2 h-full">
            <div className="glass glass-bg-2"></div>
            <div className="glass glass-bg-3"></div>
            <div className="glass"></div>
          </div>
        </div>
      </section>
    </main>
  );
}