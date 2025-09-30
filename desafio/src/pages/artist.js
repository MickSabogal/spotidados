import Image from "next/image";

export default function Artist() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Image src="/logo.png" alt="Spotidados Logo" width={100} height={100} />
      <input type="text" placeholder="Search for an artist..." />
    </div>
  );
}
