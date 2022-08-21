import React from 'react';
import { IVideoModal } from '../type';
import ModalVideo from 'react-modal-video';

const VideoModal = ({ url, show, setShow }: IVideoModal) => {
  return <ModalVideo url={url} channel='custom' isOpen={show} onClose={() => setShow(false)} />;
};

export default VideoModal;
