import type { Meta, StoryObj } from '@storybook/react';
import {EditableSpan} from "../components/EditableSpan";
import {action} from "@storybook/addon-actions";

const meta: Meta<typeof EditableSpan> = {
  title: 'Todolist/EditableSpan',
  component: EditableSpan,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    changeTitle: {
      action: 'changeTitle',
    }
  },
  args: {
    title: 'Some Title',
  }
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanDefault: Story = {};