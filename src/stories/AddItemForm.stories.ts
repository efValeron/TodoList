import type { Meta, StoryObj } from '@storybook/react';
import {AddItemForm} from "../components/AddItemForm";


const meta: Meta<typeof AddItemForm> = {
  title: 'Todolist/AddItemForm',
  component: AddItemForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

export const AddItemFormDefault: Story = {};