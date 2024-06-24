import AuthButton from "@/components/AuthButton";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <h1
      className="text-2xl font-semibold text-center py-10 pb-4"
      >
        Phantom login
      </h1>
      <div
      className="flex justify-center"
      >
        <AuthButton />
      </div>
    </main>
  );
}
