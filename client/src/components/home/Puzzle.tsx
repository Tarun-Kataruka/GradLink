import Image from "next/image";

type PuzzleProps = {
  image: string;
};

export default function Puzzle({ image }: PuzzleProps) {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-[#e4f0ff] via-[#f2f7ff] to-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-gray-800">
          <span className="text-blue-800">Reconnect</span>.{" "}
          <span className="text-blue-800">Rediscover</span>.{" "}
          <span className="text-blue-800">Reunite</span>.
        </h2>

        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-12 leading-relaxed">
          Your journey doesn&apos;t end at graduation. Join a vibrant community of
          <span className="font-medium text-blue-800"> achievers</span>, 
          <span className="font-medium text-blue-800"> mentors</span>, and 
          <span className="font-medium text-blue-800"> old friends</span>.
        </p>

        <div className="flex justify-center">
          <div className="p-4 rounded-xl">
            <Image
              src={image}
              alt="Puzzle Illustration"
              width={500}
              height={300}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
