import { twMerge } from "tailwind-merge";

import type { Album } from "../../../../models/album";

import { Typography } from "../../../../components/Typography";

interface AlbumFilterItemProps {
  album: Album;
}

export function AlbumFilterItem({ album }: AlbumFilterItemProps) {
  return (
    <li>
      <input
        id={album.id}
        value={album.id}
        type="radio"
        name="album-filter"
        className="peer sr-only"
      />
      <Typography
        as="label"
        htmlFor={album.id}
        variant="paragraph-md"
        className={twMerge(
          "border-border-primary flex h-7 cursor-pointer items-center justify-center rounded-lg border px-3 py-1",
          "peer-checked:bg-accent-brand",
          "text-accent-paragraph",
        )}
      >
        {album.title}
      </Typography>
    </li>
  );
}
