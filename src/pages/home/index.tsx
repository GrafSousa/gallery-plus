import { createFileRoute } from "@tanstack/react-router";

import { usePhotosApi } from "../../hooks/usePhotosApi";

import { Box } from "../../components/Box";
import { Tag } from "../../components/Tag";
import { Skeleton } from "../../components/Skeleton";

import { PhotoWidget } from "./-components/PhotoWidget";
import { AlbumFilter } from "./-components/AlbumFilter";

export const Route = createFileRoute("/home/")({
  component: HomePage,
});

function HomePage() {
  const { photos, isLoading } = usePhotosApi();

  return (
    <>
      <AlbumFilter />
      <ul className="mt-10 grid grid-cols-5 gap-9">
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <li key={index}>
                <Box className="flex flex-col gap-4">
                  <Skeleton
                    rounded="lg"
                    className="w-photo-widget h-photo-widget"
                  />
                  <Skeleton className="h-6 w-full" />
                  <Box className="inline-flex h-6 gap-1.5 truncate">
                    {Array.from({ length: 3 }).map((_, item) => (
                      <Tag label="" loading key={item} />
                    ))}
                  </Box>

                  <Skeleton rounded="sm" className="h-10 w-full" />
                </Box>
              </li>
            ))
          : photos.map((photo) => (
              <li key={photo.id}>
                <PhotoWidget photo={photo} />
              </li>
            ))}
      </ul>
    </>
  );
}
