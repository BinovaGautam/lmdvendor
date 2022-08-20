import { useEffect, useState } from 'react';
import { IUserGroupAssets } from './type';
import { IAsset, IGroupAsset } from '../type';

const useGroupAssets = (assets: IAsset[] | undefined) => {
  console.log('Catch Assets', assets);

  const [groupAssets, setGroupAssets] = useState<IGroupAsset>({
    images: [],
    videos: [],
    text_notes: [],
    additional_items: [],
  });

  // -------------: LOGIC :------------------
  useEffect(() => {
    if (assets) {
      let images = assets.filter((as: IAsset, index: number) => as.asset_type === '1');
      let videos = assets.filter((as: IAsset, index: number) => as.asset_type === '2');
      let text_notes = assets.filter((as: IAsset, index: number) => as.asset_type === '3');
      let additional_items = assets.filter((as: IAsset, index: number) => as.asset_type === '4');
      setGroupAssets({
        images,
        videos,
        text_notes,
        additional_items,
      });
    }
  }, [assets]);

  return { ...groupAssets };
};

export default useGroupAssets;
