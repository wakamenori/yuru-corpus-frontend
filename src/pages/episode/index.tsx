import {ChangeEvent} from 'react'
import axios from "axios";
import {useState} from "react";
import {GetStaticPropsResult, NextPage} from "next";
import {Summary} from "../../types/episode/summary";
import {Pagination} from "../../components/episode/Pagination"
import {CardList} from "../../components/episode/CardList"
import {animateScroll as scroll} from "react-scroll"

type Props = {
  summary: Summary[];
}
const Episode: NextPage<Props> = ({summary}) => {
  const [page, setPage] = useState(1);
  const cardPerPage = 10;
  const summarySlice = summary.slice((page - 1) * cardPerPage, page * cardPerPage);
  const totalPages = Math.ceil(summary.length / cardPerPage);

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
    scroll.scrollToTop({duration: 200});
  };

  return (
    <>
      <CardList summary={summarySlice}/>
      <Pagination totalPages={totalPages} page={page} handleChange={handleChange}/>
    </>
  )
}

type SummaryResponse = {
  summary: Summary[];
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  try {
    const {data} = await axios.get<SummaryResponse>(`${process.env.NEXT_PUBLICK_API_ROOT}/summary/`);
    return {props: {summary: data.summary}};
  } catch (error) {
    console.log(error);
    return {notFound: true};
  }
}


export default Episode;
