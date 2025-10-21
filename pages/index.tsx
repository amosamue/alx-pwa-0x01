// pages/index.tsx
import { GetServerSideProps } from "next";

export default function Home() {
  return null; // No need to render anything
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/movies",
      permanent: false, // temporary redirect
    },
  };
};
