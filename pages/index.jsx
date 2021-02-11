import { Box, Flex } from '@chakra-ui/react';
import { connectToDB, getPosts } from '../db';
import { Post } from '../components/Post';
import { useQuery } from 'react-query';

export default function Home({ posts }) {
  console.log(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/posts`);
  const { data } = useQuery(
    'posts',
    () =>
      fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/posts`).then((data) =>
        data.json()
      ),
    {
      initialData: { data: posts },
    }
  );

  return (
    <Box bg="gray.100" h="100vh" py={16} pb="200px">
      <Flex
        as="main"
        justifyContent="flex-start"
        alignItems="center"
        flexDirection="column"
        h="100%"
        maxW="100%"
        margin="10 auto"
      >
        {data?.data.map((post) => (
          <Post key={post._id} post={post}></Post>
        ))}
      </Flex>
    </Box>
  );
}

export async function getStaticProps(context) {
  const { db } = await connectToDB();
  const posts = await getPosts(db);

  return {
    props: {
      posts,
    },
  };
}
