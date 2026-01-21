import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";

import { debounce } from "../../helpers/debounce";
import Logo from "../../assets/images/gallery-plus-full-logo.svg?react";

import { Box } from "../Box";
import { Button } from "../Button";
import { Divider } from "../Divider";
import { TextField } from "../TextField";
import { usePhotosApi } from "../../hooks/usePhotosApi";

export function Header() {
  const {
    filters: { q, setQ },
  } = usePhotosApi();
  const [searchValue, setSearchValue] = useState(q);

  const debouncedSearch = useMemo(
    () =>
      debounce((text: string) => {
        setQ(text);
      }, 500),
    [setQ],
  );

  function handleSearchInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event?.target.value;

    setSearchValue(value);
    debouncedSearch(value);
  }

  return (
    <Box as="header" className="mb-20 flex items-center justify-between gap-10">
      <Link to="/home">
        <Logo className="h-5" />
      </Link>

      <TextField.Root className="flex-1">
        <TextField.Prefix>
          <MagnifyingGlassIcon className="fill-placeholder size-4" />
        </TextField.Prefix>
        <TextField.Control
          value={searchValue}
          placeholder="Buscar fotos"
          onChange={handleSearchInputChange}
        />
      </TextField.Root>

      <Divider orientation="vertical" className="h-10" />

      <Box className="flex items-center gap-3">
        <Button>Criar album</Button>
      </Box>
    </Box>
  );
}
