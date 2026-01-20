import { Link } from "@tanstack/react-router";

import type { Photo } from "../../../models/photo";

import { Box } from "../../../components/Box";
import { Tag } from "../../../components/Tag";
import { Typography } from "../../../components/Typography";
import { buttonVariants } from "../../../components/Button";
import { ImagePreview } from "../../../components/ImagePreview";

interface PhotoWidgetProps {
  photo: Photo;
}

export function PhotoWidget({ photo }: PhotoWidgetProps) {
  return (
    <Box className="flex flex-col gap-4">
      <ImagePreview
        className="w-photo-widget h-photo-widget"
        src={`${import.meta.env.VITE_IMAGES_URL}/${photo.imageId}`}
      />

      <Typography variant="label-md" className="text-accent-paragraph truncate">
        {photo.title}
      </Typography>

      <Box className="inline-flex h-6 gap-1.5 truncate">
        {photo.albums.slice(0, 1).map((album) => (
          <Tag key={album.id} label={album.title} />
        ))}

        {photo?.albums.length > 1 && (
          <Tag label={`+${photo.albums.length - 1}`} />
        )}
      </Box>

      <Link
        to="/photo-details/$photoId"
        params={{
          photoId: photo.id,
        }}
        className={buttonVariants({
          variant: "secondary",
          className: "px-2",
        })}
      >
        <Typography variant="label-sm">Detalhes da imagem</Typography>
      </Link>
    </Box>
  );
}
