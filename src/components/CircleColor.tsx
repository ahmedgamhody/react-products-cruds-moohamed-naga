interface ICircleColorProps extends React.HTMLAttributes<HTMLSpanElement> {
  color: string;
}
function CircleColor({ color, ...rest }: ICircleColorProps) {
  return (
    <span
      style={{ backgroundColor: color }}
      className={`block w-5 h-5 bg-[${color}] rounded-full cursor-pointer mb-1`}
      {...rest}
    ></span>
  );
}

export default CircleColor;
