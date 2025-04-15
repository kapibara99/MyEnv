import type { Meta, StoryObj } from "@storybook/react";
import TestParts from "./test-parts";

const meta = {
  title: "Example",
  component: TestParts,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<typeof meta>;
export const TestOne: Story = {
  args: {
    primary: true,
    label: "test parts",
  },
};
