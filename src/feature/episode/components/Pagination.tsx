import {Box, Pagination as MuiPagination, Stack} from "@mui/material";
import React, {ChangeEvent} from 'react'


type Props = {
  totalPages: number;
  page: number;
  handleChange: (event: ChangeEvent<unknown>, value: number) => void;
}

export const Pagination = ({totalPages, page, handleChange}: Props) => {
  return (
    <Box sx={{position: "fixed", bottom: 0, bgcolor: "white", width: "100%", pt: 2, pb: 2}}>
      <Stack spacing={2} alignItems="center">
        <MuiPagination count={totalPages} page={page} onChange={handleChange}/>
      </Stack>
    </Box>
  )
}
