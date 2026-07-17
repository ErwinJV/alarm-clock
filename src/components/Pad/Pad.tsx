interface PadProps {
  amt: number;
  row?: boolean;
}
export default function Pad({ amt, row }: PadProps) {
  return (
    <div
      style={{
        height: row ? undefined : amt,
        width: row ? amt : undefined,
      }}
    ></div>
  );
}
