import { Box, Button, Text } from '@chakra-ui/react';
const Porduct = ({ post }) => {
  return (
    <Box
      w="100%"
      bg="gray.100"
      height="100vh"
      display="flex"
      justifyContent="center"
    >
      <Box
        maxH="400px"
        py={16}
        w="500px"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg="white"
        m={5}
      >
        <Box p="6" display="flex" flexDirection="column">
          <Text as="h1" fontSize="25px" fontWeight="600" textAlign="center">
            {post.title}
          </Text>
          <Text textAlign="center" py="10">
            {post.description}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export async function getStaticPaths() {
  // get all the paths for your posts from an API
  // or file system
  console.log(`${process.env.DATABASE_URL}`);
  console.log(`Connection: ${global.mongo.client}`);
  try {
    const results = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/posts`,
      {
        method: 'GET',
        headers: {
          // update with your user-agent
          'User-Agent':
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36',
          Accept: 'application/json; charset=UTF-8',
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(results);
    const { data } = await results.json();
    const paths = data.map((post) => ({ params: { id: String(post._id) } }));
    /*
      [
        {params: {slug: 'get-started-with-node'}},
        {params: {slug: 'top-frameworks'}}
      ]
      */
    return { paths, fallback: true };
  } catch (error) {
    throw new Error(error);
  }
}

export async function getStaticProps({ params }) {
  console.log(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/posts`);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/posts/${params.id}`,
      {
        method: 'GET',
        headers: {
          // update with your user-agent
          'User-Agent':
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36',
          Accept: 'application/json; charset=UTF-8',
          'Content-Type': 'application/json',
        },
      }
    );
    const { data } = await res.json();
    console.log(data[0]);
    return {
      props: { post: data[0] },
    };
  } catch (error) {
    throw new Error(error);
  }
}

export default Porduct;
