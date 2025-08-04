import Image from "next/image";

interface FeatureCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlignment?: "left" | "right";
}

export default function FeatureCard({
  title,
  description,
  imageSrc,
  imageWidth = 300,
  imageHeight = 250,
  imageAlignment = "right",
}: FeatureCardProps) {
  const orderClass = imageAlignment === "left" ? "lg:order-first" : "lg:order-last";

  return (
    <section className="py-12 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Text Section */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-blue-800">
              {title}
            </h2>
            <p className="text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
              {description}
            </p>
          </div>

          {/* Image Section */}
          <div className={`lg:w-1/2 ${orderClass}`}>
            <Image
              src={imageSrc}
              alt={title}
              width={imageWidth}
              height={imageHeight}
              className="mx-auto lg:mx-0 rounded"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
