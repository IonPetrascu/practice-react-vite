export type CardProps = {
  id: number;
  index: number;
  column: string;
  title: string;
  onDelete: () => void;
};
