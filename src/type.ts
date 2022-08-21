export interface IAsset {
  asset_type: string;
  asset_sub_type: string;
  asset_info: string;
  uploaded_by: string;
}

export interface IAssetObj {
  before: IAsset[];
  after: IAsset[];
}

export interface IGroupAsset {
  images: IAssetObj;
  videos: IAssetObj;
  text_notes: IAssetObj;
  additional_items: IAssetObj;
}
