import { FC, PropsWithChildren } from "react";

type TProps = Pick<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	'type' | 'className' | 'onClick' | 'disabled'
>

export const Button: FC<PropsWithChildren<TProps>> = ({
	children,
	type,
	className,
	disabled,
	onClick
}) => {
	return (
		<button
			type={type}
			disabled={disabled}
			className={`flex justify-center rounded-md bg-indigo-600 px-3 py-1.5
				text-sm font-semibold leading-6 text-white shadow-sm outline-0
				hover:bg-indigo-500 focus-visible:bg-indigo-500 ${className}
			`}
			onClick={onClick}
		>
			{children}
		</button>
	)
}
