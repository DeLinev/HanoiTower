import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    'architecture',
    {
      type: 'category',
      label: 'Components',
      items: [
        'components/common-components',
        'components/game-components',
        'components/layout-components',
      ],
    },
    {
      type: 'category',
      label: 'Hooks',
      items: [
        'hooks/use-game',
        'hooks/use-timer',
        'hooks/use-game-validation',
        'hooks/use-disk-movement',
        'hooks/use-tower-selection',
        'hooks/use-local-storage',
      ],
    },
    {
      type: 'category',
      label: 'State Management',
      items: [
        'stores/game-settings-store',
        'stores/game-state-store',
        'stores/scoreboard-store',
      ],
    },
    'pages',
    'types',
    'utils',
  ],
};

export default sidebars;
