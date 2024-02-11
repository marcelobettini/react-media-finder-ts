interface Props {
  message: string;
}
export default function Error({ message }: Props) {
  return (
    <div>
      <p>{message}</p>
    </div>
  );
}
