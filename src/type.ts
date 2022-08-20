export interface IAsset {
  asset_type: string;
  asset_sub_type: string;
  asset_info: string;
  uploaded_by: string;
}

export interface IGroupAsset {
  images: IAsset[];
  videos: IAsset[];
  text_notes: IAsset[];
  additional_items: IAsset[];
}
