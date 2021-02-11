import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  FormControl,
  FormLabel,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Input,
  useToast,
} from '@chakra-ui/react';

import { useMutation, useQueryClient } from 'react-query';

const CreatePostModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');
  const toast = useToast();

  const queryClient = useQueryClient();
  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const createPost = useMutation(
    async (post) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return fetch(
        `${process.env.PROTOCOL}${process.env.NEXT_PUBLIC_VERCEL_URL}/api/posts`,
        {
          method: 'POST',
          body: JSON.stringify(post),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('posts');
        onClose();
        toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 1000,
          isClosable: true,
          position: 'top',
        });
      },
    }
  );

  const handlerCreatePost = (title, desc) => {
    createPost.mutate({ title, desc });
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={true}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Creat Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Titulo</FormLabel>
              <Input
                ref={initialRef}
                placeholder="titulo...."
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Descripción</FormLabel>
              <Input
                placeholder="descripcion..."
                onChange={(e) => setDesc(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handlerCreatePost(title, description)}
            >
              {createPost.isLoading
                ? '...wait'
                : createPost.error
                ? 'Ups!..'
                : createPost.isSuccess
                ? 'listo :)'
                : 'Crear post'}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePostModal;
