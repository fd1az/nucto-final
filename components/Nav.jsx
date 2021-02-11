import { useState } from 'react';
import Link from 'next/link';
import { Box, Flex, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useDisclosure } from '@chakra-ui/react';
import CreatePostModal from './CreatePostModa';
const Nav = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      p={8}
      {...props}
      borderBottom="1px"
    >
      <Link href="/">
        <Box
          bg="black"
          color="white"
          width="100px"
          borderRadius="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="50px"
          fontSize="2xl"
          fontWeight="700"
          cursor="pointer"
        >
          Nuc.to
        </Box>
      </Link>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Box
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          color="white"
          width="100px"
          borderRadius="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="50px"
          fontSize="100"
          fontWeight="600"
          cursor="pointer"
          onClick={onOpen}
        >
          Crear Post
        </Box>
      </motion.div>
      {isOpen && <CreatePostModal isOpen={isOpen} onClose={onClose} />}
    </Flex>
  );
};

export default Nav;
