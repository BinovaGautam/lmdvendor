import { PlayIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { VideoModal } from '../../components';
import WhiteBoxWithShadow from '../../components/Wrappers/WhiteBoxWithShadow';
import { IAsset } from '../../type';
import { handleImageOnError, handleVideoThumbnailOnError } from '../../utils/helpers';

const AssetsController = ({ asset_type, asset_info, uploaded_by }: IAsset) => {
  // ------------------: Video Settings :-------------------
  const [show, setShow] = useState<boolean>(false);

  if (asset_type === '1') {
    return (
      <div className='h-28 w-40 rounded-xl overflow-hidden'>
        <img src={asset_info} alt='' className='w-full h-full' onError={handleImageOnError} />
      </div>
    );
  }

  if (asset_type === '2') {
    return (
      <div className='h-28 w-40 relative rounded-xl overflow-hidden flex items-center justify-center'>
        <img
          src={asset_info}
          alt=''
          className='w-full h-full'
          onError={handleVideoThumbnailOnError}
        />
        <VideoModal url={asset_info} show={show} setShow={setShow} />
        <PlayIcon
          onClick={() => setShow(true)}
          className='cursor-pointer absolute w-11 h-11 bg-white rounded-full text-primary-2'
        />
      </div>
    );
  }

  if (asset_type === '3') {
    return <p className='text-sm'>{asset_info}</p>;
  }

  if (asset_type === '4') {
    return (
      <WhiteBoxWithShadow classNames=''>
        <div className='py-3 px-6'>
          <p>{asset_info}</p>
        </div>
      </WhiteBoxWithShadow>
    );
  }

  return null;
};

export default AssetsController;
