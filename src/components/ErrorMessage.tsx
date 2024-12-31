interface IErrorMessageProps {
  msg: string;
}
export default function ErrorMessage({ msg }: IErrorMessageProps) {
  return msg ? (
    <span className="text-red-600 block font-semibold text-sm">{msg}</span>
  ) : null;
}
