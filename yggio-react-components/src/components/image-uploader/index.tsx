import React from 'react';
import ImageUploading, {ImageListType} from 'react-images-uploading';
import {
  Flex,
  Box,
  Button as ChakraButton,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import {MdImage as ImageIcon} from 'react-icons/md';
import {ImageDropZone} from './styled';
import {COLORS} from '../../constants';

interface ImageUploaderProps {
  description: string;
  multiple?: boolean;
  images: ImageListType;
  maxFileSize?: number;
  onClick: (images: ImageListType) => void;
}

const ImageUploader = (props: ImageUploaderProps) => {
  const onChange = (
    imageList: ImageListType,
  ) => {
    props.onClick(imageList);
  };

  return (
    <Box m='10px' p='20px'>
      <ImageUploading
        multiple={props.multiple}
        value={props.images}
        onChange={onChange}
        maxFileSize={props.maxFileSize}
        maxNumber={100}
        acceptType={['jpg', 'gif', 'png']}
        dataURLKey="data"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemove,
          isDragging,
          dragProps,
          errors,
        }) => (
          <Box>
            <Text
              w='400px'
              marginY='10px'
              fontSize='sm'
            >
              {props.description}
            </Text>
            <Flex>
              <button
                style={isDragging ? {color: 'red'} : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                <ImageDropZone>
                  <ImageIcon size={22} />
                  Click or drop image here
                </ImageDropZone>
              </button>
              {imageList.map((image, index) => (
                <Flex m='10px' alignItems='flex-start' key={index}>
                  <img src={image.data as string} alt="" width="200" />
                  <ChakraButton
                    bg={COLORS.transparent}
                    color={COLORS.red}
                    minW='20px'
                    p='0px'
                    h='20px'
                    fontSize='18'
                    onClick={() => onImageRemove(index)}
                    _hover={{
                      bg: COLORS.transparent,
                      color: COLORS.redDark
                    }}
                  >
                    ✖
                  </ChakraButton>
                </Flex>
              ))}
            </Flex>
            {errors && (
              <Box m='10px'>
                {errors?.acceptType && (
                  <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle>Your selected file type is not allowed</AlertTitle>
                    <AlertDescription>Only jpg, gif and png are allowed</AlertDescription>
                  </Alert>
                )}
                {errors?.maxFileSize && (
                  <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle>Your file's size exceeds maximum file size.</AlertTitle>
                    <AlertDescription>Maximum file size is 1 MB</AlertDescription>
                  </Alert>
                )}
              </Box>
            )}
          </Box>
        )}
      </ImageUploading>
    </Box>
  );
};

export default ImageUploader;
