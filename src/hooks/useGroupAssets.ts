import { useEffect, useState } from 'react';
import { IAsset, IGroupAsset } from '../type';

const useGroupAssets = (assets: IAsset[] | undefined) => {
  const [groupAssets, setGroupAssets] = useState<IGroupAsset>({
    images: {
      before: [],
      after: [],
    },

    videos: {
      before: [],
      after: [],
    },
    text_notes: {
      before: [],
      after: [],
    },
    additional_items: {
      before: [],
      after: [],
    },
  });

  // -------------: LOGIC :------------------
  useEffect(() => {
    if (assets) {
      let images_before = assets.filter(
        (as: IAsset, index: number) => as.asset_type === '1' && as.asset_sub_type === '1'
      );
      let images_after = assets.filter(
        (as: IAsset, index: number) => as.asset_type === '1' && as.asset_sub_type === '2'
      );
      let videos_before = assets.filter(
        (as: IAsset, index: number) => as.asset_type === '2' && as.asset_sub_type === '1'
      );
      let videos_after = assets.filter(
        (as: IAsset, index: number) => as.asset_type === '2' && as.asset_sub_type === '2'
      );
      let text_notes_before = assets.filter(
        (as: IAsset, index: number) => as.asset_type === '3' && as.asset_sub_type === '1'
      );
      let text_notes_after = assets.filter(
        (as: IAsset, index: number) => as.asset_type === '3' && as.asset_sub_type === '2'
      );
      let additional_items_before = assets.filter(
        (as: IAsset, index: number) => as.asset_type === '4' && as.asset_sub_type === '1'
      );
      let additional_items_after = assets.filter(
        (as: IAsset, index: number) => as.asset_type === '4' && as.asset_sub_type === '2'
      );

      setGroupAssets({
        images: {
          before: images_before,
          after: images_after,
        },
        videos: {
          before: videos_before,
          after: videos_after,
        },
        text_notes: {
          before: text_notes_before,
          after: text_notes_after,
        },
        additional_items: {
          before: additional_items_before,
          after: additional_items_after,
        },
      });
    }
  }, [assets]);

  return { ...groupAssets };
};

export default useGroupAssets;
