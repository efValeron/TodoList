import type { Meta, StoryObj } from '@storybook/react';
import {Task} from "../components/Task";

const meta: Meta<typeof Task> = {
  title: 'Todolist/Task',
  component: Task,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Task>;

export const DoneTask: Story = {};