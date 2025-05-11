import { useLocalStorage } from "@/hooks";
import { createContext, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router";
import { toast } from "sonner";

interface Cart {
	items: {
		product: Schema["models.Product"];
		amount: number;
	}[];
}

export const CartContext = createContext<
	Readonly<{
		cart: Cart;
		add: ({
			product,
			amount,
		}: {
			product: Schema["models.Product"];
			amount: number;
		}) => void;
		update: ({
			product,
			amount,
		}: {
			product: Schema["models.Product"];
			amount: number;
		}) => void;
		remove: (product: Schema["models.Product"]) => void;
		removeAll: () => void;
		inTheCart: (product: Schema["models.Product"]) => boolean;
	}>
>({
	cart: { items: [] },
	add: () => {},
	update: () => {},
	remove: () => {},
	removeAll: () => {},
	inTheCart: () => false,
});

export const CartProvider = () => {
	const [value, setValue, removeValue] = useLocalStorage<Cart>("cart", {
		items: [],
	});
	const [cart, setCart] = useState<Cart>({ items: [] });

	const updateLocalStorage = (updatedCart: Cart) => {
		setCart(updatedCart);
		setValue(updatedCart);
	};

	const add = ({
		product,
		amount,
	}: {
		product: Schema["models.Product"];
		amount: number;
	}) => {
		const item = cart.items.find(
			(item) => item.product?.productId === product?.productId,
		);

		let updatedCart = [...cart.items];

		const currentAmount = item?.amount || 0;
		const totalAmount = currentAmount + amount;

		if (totalAmount > product.stock!) {
			toast.warning("Atenção!", {
				description: `A quantidade total no carrinho excede o estoque disponível (${product.stock} unidades).`,
			});
			return;
		}

		if (item) {
			updatedCart = updatedCart.map((item) =>
				item.product?.productId === product?.productId
					? { ...item, amount: item.amount! + amount }
					: item,
			);
		} else {
			updatedCart.push({ product: { ...product }, amount });
		}

		updateLocalStorage({ items: updatedCart });
	};

	const update = ({
		product,
		amount,
	}: {
		product: Schema["models.Product"];
		amount: number;
	}) => {
		const itemIndex = cart.items.findIndex(
			(item) => item.product?.productId === product?.productId,
		);

		if (itemIndex !== -1) {
			if (amount > product.stock!) {
				toast.warning("Atenção!", {
					description: `A quantidade máxima disponível em estoque é de ${product.stock} unidades.`,
					position: "bottom-left",
				});
				return;
			}

			if (amount === 0) {
				remove(product);
				return;
			}

			const updatedCart = [...cart.items];
			updatedCart[itemIndex] = { product: { ...product }, amount };
			updateLocalStorage({ items: updatedCart });
		}
	};

	const remove = (product: Schema["models.Product"]) => {
		const updatedCart = cart.items.filter(
			(item) => item.product?.productId !== product?.productId,
		);
		updateLocalStorage({ items: updatedCart });
	};

	const removeAll = () => {
		updateLocalStorage({ items: [] });
	};

	const inTheCart = (product: Schema["models.Product"]) => {
		return cart.items.some(
			(item) => item.product?.productId === product?.productId,
		);
	};

	useEffect(() => {
		if (value && value.items) {
			setCart(value);
		} else {
			removeValue();
		}
	}, [value, removeValue]);

	return (
		<CartContext.Provider
			value={{ cart, add, update, remove, removeAll, inTheCart }}
		>
			<Outlet />
		</CartContext.Provider>
	);
};

export const useCart = () => {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
};
