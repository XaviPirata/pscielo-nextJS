"use client";

type ProfessionalCardProps = {
  name: string;
  title: string;
  imageSrc: string;
  imageWebp?: string;
  imagePosition?: string;
  onClick: () => void;
};

export const ProfessionalCard = ({ name, title, imageSrc, imageWebp, imagePosition, onClick }: ProfessionalCardProps) => {
  return (
    <div
      onClick={onClick}
      className="group relative w-full h-full rounded-2xl overflow-hidden cursor-pointer shadow-lg"
    >
      {/* Efecto Glow Sutil */}
      <div className="absolute inset-0 z-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-r from-palette-accent-1/50 to-palette-accent-2/50 blur-3xl"></div>
      </div>

      {/* Imagen de Fondo - Con filtro Warm Sepia Rose + picture webp/jpeg fallback */}
      <picture>
        {imageWebp && <source srcSet={imageWebp} type="image/webp" />}
        <img
          src={imageSrc}
          alt={`Fotografía de ${name}`}
          className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out
                     sepia-[0.6] saturate-[0.7] hue-rotate-[-15deg] brightness-[1.05]
                     group-hover:sepia-0 group-hover:saturate-100 group-hover:hue-rotate-0 group-hover:brightness-100
                     group-hover:scale-105
                     object-cover ${imagePosition ? '' : 'object-top'}`}
          style={imagePosition ? { objectPosition: imagePosition } : undefined}
          loading="lazy"
        />
      </picture>

      {/* Capa de tinte rosa cálido - Se desvanece al hacer hover */}
      <div className="absolute inset-0 bg-gradient-to-br
                from-pink-200/[0.15]
                via-amber-100/[0.10]
                to-pink-100/[0.12]
                transition-opacity duration-700
                group-hover:opacity-0">
      </div>

      {/* Overlay de Información */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/50 to-transparent p-2 sm:p-3 flex flex-col justify-end z-10">
        <h3 className="font-heading text-sm sm:text-base md:text-lg font-bold text-white leading-tight">{name}</h3>
        <p className="card-text text-[10px] sm:text-xs md:text-sm text-white/80 leading-tight line-clamp-2">{title}</p>
      </div>
    </div>
  );
};