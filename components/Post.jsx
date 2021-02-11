import { Box, Button, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const Post = ({ post }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Box
        w="300px"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg="white"
        m={5}
      >
        <Box p="6" display="flex" flexDirection="column">
          <Text as="h1" fontSize="25px" fontWeight="600">
            {post.title}
          </Text>
          <Text>{post.description}</Text>
          <Link href={`posts/${post._id}`}>
            <Button
              mt="10"
              bg="#7928CA"
              _hover={{
                bg: '#9e47f5',
                fontWeight: '700',
              }}
              color="white"
              fontWeight="600"
            >
              Ver post
            </Button>
          </Link>
        </Box>
      </Box>
    </motion.div>
  );
};
