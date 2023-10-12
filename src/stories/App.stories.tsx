import type {Meta, StoryObj} from '@storybook/react';
import App from '../App';
import {Provider} from "react-redux";
import {store} from "../state/store";
import {ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator";

const meta: Meta<typeof App> = {
  title: 'Todolist/App',
  component: App,
  tags: ['autodocs'],
  decorators: [
    ReduxStoreProviderDecorator
  ]
};

export default meta;
type Story = StoryObj<typeof App>;

export const AppStory: Story = {};