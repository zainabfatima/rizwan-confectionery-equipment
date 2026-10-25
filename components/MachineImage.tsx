import Image from "next/image";

type MachineImageProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

export function MachineImage({ src, alt, sizes, priority = false, className }: MachineImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className ?? "object-cover"}
    />
  );
}
