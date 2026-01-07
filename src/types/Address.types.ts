export interface DaumPostcodeData {
  address: string;
  sido?: string;
  region_1depth_name?: string;
}

export interface DaumPostcodeOptions {
  oncomplete: (data: DaumPostcodeData) => void;
}

export interface DaumPostcodeConstructor {
  new (options: DaumPostcodeOptions): {
    open: () => void;
  };
}

declare global {
  interface Window {
    daum?: {
      Postcode?: DaumPostcodeConstructor;
    };
  }
}

export interface AddressSearchProps {
  value?: string;
  onSelect: (address: string) => void;
}
