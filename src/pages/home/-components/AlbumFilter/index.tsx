import { useAlbums } from "../../../../hooks/useAlbums";

import { Box } from "../../../../components/Box";
import { Typography } from "../../../../components/Typography";
import { Skeleton } from "../../../../components/Skeleton";

import { AlbumFilterItem } from "./AlbumFilterItem";

export function AlbumFilter() {
  const { albums, isLoadingAlbums } = useAlbums();

  return (
    <Box className="flex flex-row items-center">
      <Typography variant="heading-sm" className="text-heading">
        Albums
      </Typography>

      <ul className="ml-3.5 flex flex-1 flex-row items-center gap-3">
        {isLoadingAlbums
          ? Array.from({ length: 5 }).map((_, index) => (
              <Skeleton rounded="lg" className="h-7 w-16" key={index} />
            ))
          : [{ id: "all", title: "Todos" }, ...albums].map((album) => (
              <AlbumFilterItem album={album} key={album.id} />
            ))}
      </ul>
    </Box>
  );
}
