import React from "react";
// import { useRouter } from "next/router";

type Props = {
  params: {
    id: string;
  };
};

const page = ({ params: { id } }: Props) => {
  //   const router = useRouter();
  //   const { date } = router.query;

  return <div>{id}</div>;
};

export default page;
