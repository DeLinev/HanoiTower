import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";
import { Card } from "./Card";

const meta = {
    component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        variant: 'primary',
        size: 'medium',
        children: 'Primary Button',
    },
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        size: 'medium',
        children: 'Secondary Button',
    },
};

export const Success: Story = {
    args: {
        variant: 'success',
        size: 'medium',
        children: 'Success Button',
    },
};

export const ConfirmationPopup: Story = {
    args: {
        variant: 'primary',
        size: 'medium',
        children: 'Confirm',
    },
    render: (args) => (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-sm flex flex-col gap-4 border border-gray-700">
                <h2 className="text-xl font-bold text-white">Reset Progress?</h2>
                <p className="text-gray-400 text-sm">
                    Are you sure you want to reset the game? All current progress will be lost.
                </p>
                <div className="flex gap-3 justify-end">
                    <Button variant="secondary" size="medium">
                        Cancel
                    </Button>
                    <Button {...args} />
                </div>
            </div>
        </div>
    ),
};

export const CookieBanner: Story = {
    args: {
        variant: 'primary',
        size: 'small',
        children: 'Accept All',
    },
    render: (args) => (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 p-4 shadow-lg">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4">
                <p className="text-gray-300 text-sm flex-1">
                    🍪 We use cookies to improve your experience. By continuing you agree
                    to our <span className="underline cursor-pointer text-blue-400">Privacy Policy</span>.
                </p>
                <div className="flex gap-2 shrink-0">
                    <Button variant="secondary" size="small">
                        Reject
                    </Button>
                    <Button {...args} />
                </div>
            </div>
        </div>
    ),
};

export const CompactToolbar: Story = {
    args: {
        variant: 'primary',
        size: 'small',
        children: '▶ Resume',
    },
    render: (args) => (
        <div className="bg-gray-900 rounded-xl p-3 flex items-center justify-between max-w-xl mx-auto border border-gray-700">
            <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm font-mono">⏱ 02:45</span>
                <span className="text-gray-600">|</span>
                <span className="text-gray-400 text-sm">Moves: 12</span>
            </div>
            <div className="flex gap-2">
                <Button {...args} />
                <Button variant="secondary" size="small">
                    ⟳ Reset
                </Button>
                <Button variant="success" size="small">
                    ✓ Finish
                </Button>
            </div>
        </div>
    ),
};

export const DisabledInForm: Story = {
    args: {
        variant: 'primary',
        size: 'medium',
        fullWidth: true,
        disabled: true,
        children: 'Start Game',
    },
    render: (args) => (
        <Card title="New Game">
            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <label className="text-gray-400 text-sm">Player Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name..."
                        className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <p className="text-amber-400 text-xs">⚠ Please enter a name to continue</p>
                <Button {...args} />
            </div>
        </Card>
    ),
};