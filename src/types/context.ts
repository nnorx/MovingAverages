export type SmaContext = {
  sma: number;
  setSma: React.Dispatch<React.SetStateAction<number>>;
};

export type ViewContext = {
  detailView: boolean;
  setDetailView: React.Dispatch<React.SetStateAction<boolean>>;
};
