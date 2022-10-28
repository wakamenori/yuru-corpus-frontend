import {
  Box,
  Grid,
} from "@mui/material";
import {Summary} from "../../types/episode/summary";
import styled from "styled-components"
import {Chip} from "../ui/Chip"


const StyledImg = styled.img`
  width: 256px;
  height: 144px;
  object-fit: cover;
  margin: auto;

  @media (max-width: 600px) {
    width: 144px;
    height: 81px;
  }
`

const StyledTitle = styled.p`
  margin: 0.4rem 0;
  font-size: 0.8rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  @media (min-width: 600px) {
    font-size: 1.2rem;
  }
`


export const Card = (summary: Summary) => {
  return (
    <Grid item xs={12} md={12} lg={6}>
      <Box sx={{display: 'flex', borderRadius: 1, overflow: "hidden", boxShadow: 4, m: 1}}>
        <Box justifyContent="center" alignItems="center" textAlign="center" display="flex">
          <StyledImg
            src={summary.thumbnailUrl}
          />
        </Box>
        <Box sx={{pl: 1, pr: 1}}>
          <StyledTitle>
            {summary.title}
          </StyledTitle>
          <Chip label={summary.publicationDate.replace(/-/g, "/")}/>
        </Box>
      </Box>
    </Grid>
  );
}
