import { useNavigate } from "@tanstack/react-router";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";

import { Button } from "../../../components/Button";
import { Skeleton } from "../../../components/Skeleton";
import { Typography } from "../../../components/Typography";
import { IconButton } from "../../../components/IconButton";
import type { Photo } from "../../../models/photo";

interface PhotoNavigatorProps {
  loading?: boolean;
  photo?: Photo & {
    nextPhotoId?: string;
    previousPhotoId?: string;
  };
}

export function PhotoNavigator({ photo, loading }: PhotoNavigatorProps) {
  const navigate = useNavigate({ from: "/photo-details/$photoId" });

  return (
    <header className="mb-5 flex items-center justify-between">
      {loading ? (
        <>
          <Skeleton className="h-6 w-60" />

          <div className="flex items-center gap-2">
            <Skeleton className="size-10" />
            <Skeleton className="h-10 w-32" />
          </div>
        </>
      ) : (
        <>
          <Typography
            as="h2"
            variant="heading-lg"
            className="text-heading truncate"
          >
            {photo?.title}
          </Typography>
          <div className="flex items-center gap-2">
            <IconButton
              variant="secondary"
              icon={CaretLeftIcon}
              disabled={!photo?.previousPhotoId}
              onClick={() =>
                navigate({
                  to: "/photo-details/$photoId",
                  params: {
                    photoId: photo?.previousPhotoId,
                  },
                })
              }
            />

            <Button
              variant="secondary"
              className="gap-1"
              disabled={!photo?.nextPhotoId}
              onClick={() =>
                navigate({
                  to: "/photo-details/$photoId",
                  params: {
                    photoId: photo?.nextPhotoId,
                  },
                })
              }
            >
              Próxima imagem <CaretRightIcon className="size-4" />
            </Button>
          </div>
        </>
      )}
    </header>
  );
}
