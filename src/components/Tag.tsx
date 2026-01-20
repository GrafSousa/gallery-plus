import { Box } from "./Box";
import { Skeleton } from "./Skeleton";
import { Typography } from "./Typography";

interface TagProps {
  label: string;
  loading?: boolean;
}

export function Tag({ label, loading }: TagProps) {
  if (loading) {
    return <Skeleton rounded="sm" className="h-6 w-16" />;
  }

  return (
    <Box className="border-border-active inline-flex h-6 items-center justify-center truncate rounded-sm border px-2 py-0.5">
      <Typography variant="label-sm" className="text-label">
        {label}
      </Typography>
    </Box>
  );
}
