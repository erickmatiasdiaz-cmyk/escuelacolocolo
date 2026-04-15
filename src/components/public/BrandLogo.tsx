import Image from 'next/image';

type BrandLogoProps = {
  size?: number;
  className?: string;
};

export default function BrandLogo({ size = 52, className = '' }: BrandLogoProps) {
  return (
    <div
      className={`overflow-hidden rounded-full border border-white/16 bg-white/95 shadow-[0_14px_30px_rgba(5,10,20,0.18)] ${className}`.trim()}
      style={{ width: size, height: size }}
    >
      <Image
        src="/imagenes/colo.jpg"
        alt="Logo inspirado en Colo-Colo"
        width={size}
        height={size}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
