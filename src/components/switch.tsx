import styled from "styled-components";

const Outer = styled.div<{ $checked: boolean }>`
  /* The switch */
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
  transition: all 0.3s ease-out;
  border-radius: 4px;
  background-color: ${({ $checked }) => ($checked ? "#8884d8" : "#ccc")};

  /* The slider */
  &:before {
    position: absolute;
    content: "";
    height: 24px;
    width: 25px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 4px;
    box-shadow: 0 -1px 1px 1px rgba(0, 0, 0, 0.3),
      0 2px 2px 1px rgba(0, 0, 0, 0.3);

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
        borderRadius: "4px",
        padding: "4px",
        backgroundColor: "#8884d840",
      }}
    >
      <span>{label}</span>
      <Outer $checked={checked} onClick={onChange} />
    </div>
  );
}
