// components/Button.tsx
import React from 'react';

interface ButtonProps {
    text: string;
    onClick?: () => any;
    style?: string;
    loading?: boolean;
    submit?:boolean;
}

export default function Button({ text, onClick, style, loading,submit=false }: ButtonProps) {
    return (
        <button
            disabled={loading}
            className={`w-full flex bg-blurple justify-center gap-2 active:bg-blurple-active disabled:bg-blurple-active text-white p-2 rounded ${style}`}
            onClick={onClick}
            type={submit ? 'submit' : 'button'}
        >
            {loading && <img src="/icons/loading.svg" className="size-4" />}
            {text}
        </button>
    );
}