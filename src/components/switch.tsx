import styled from "styled-components";

const Outer = styled.div<{ $checked: boolean }>`
  /* The switch - the box around the slider */
  position: relative;
  display: inline-block;
  width: 60px;
  height: 31px;
  transition: all 0.3s ease-out;
  border-radius: 4px;
  background-color: ${({ $checked }) => ($checked ? "#8884d8" : "#ccc")};

  &:before {
    position: absolute;
    content: "";
    height: 25px;
    width: 25px;
    left: 4px;
    bottom: 3px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 4px;
    box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.3);

    transform: ${({ $checked }) => ($checked ? "translateX(27px)" : "")};
  }
`;

type Props = {
  label: string;
  checked: boolean;
  onChange: () => void;
};

export default function Switch({ label, checked, onChange }: Props) {
  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        alignItems: "center",
        outline: "1px solid #ccc",
        borderRadius: "8px",
        padding: "6px",
      }}
    >
      <span style={{ fontSize: "16px" }}>{label}</span>
      <Outer $checked={checked} onClick={onChange} />
    </div>
  );
}
