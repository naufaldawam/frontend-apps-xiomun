"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../partials/header/HeaderComponent";


const MenuPage = () => {

  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const router = useRouter();

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("https://f581c9bb-5ce0-4e12-b4c2-c2c04e2ed04a-00-3bemsrk26jok6.riker.replit.dev/getMenu", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: "oke" }),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setMenuData(data.result.menu);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  if (loading) return <p className="text-[#723c16] text-center">Loading menu...</p>;
  if (error) return <p className="text-red-600 text-center">Error: {error}</p>;
  if (menuData.length === 0) return <p className="text-[#723c16] text-center">No menu items found.</p>;

  return (
    <>
      <Header mode="menu" cart={cart} setShowCart={setShowCart} />

      <main className="bg-[#fef6ee] min-h-screen text-brown-900 scroll-smooth">
        <div className="py-10 px-6 max-w-6xl mx-auto bg-[#fff8f0] rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-8 text-center text-[#723c16]">Our Menu</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {menuData.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  // src={`https://via.placeholder.com/300x180?text=${encodeURIComponent(item.name)}`}
                  src={item.image}
                  alt={item.name}
                  className="w-full h-44 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold mb-2 text-[#723c16]">{item.name}</h3>
                {item.description && (
                  <p className="text-sm text-[#5a4a3b] mb-2">{item.description}</p>
                )}
                <p className="text-[#a35e20] font-bold mb-1">
                  Rp {item.price.toLocaleString("id-ID")}
                </p>
                <p className="text-xs italic text-[#cba258]">{item.category}</p>
                <button
                  onClick={() => addToCart(item)}
                  className="mt-3 bg-[#a35e20] text-white text-sm px-3 py-1 rounded hover:bg-[#723c16] transition-colors"
                >
                  Add To Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>


      {/* Backdrop */}
      <div
        onClick={() => setShowCart(false)}
        className={`fixed inset-0 bg-opacity-50 z-40 transition-opacity duration-300 ${showCart ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      ></div>

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-4 z-50 overflow-y-auto
    transition-transform duration-300 ease-in-out
    transform ${showCart ? "translate-x-0" : "translate-x-full"}`}
      >
        <h3 className="text-xl font-bold mb-4 text-[#723c16]">Your Cart</h3>
        {cart.length === 0 ? (
          <p className="text-gray-600">Cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-3">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-semibold text-black">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity} — Rp {item.price.toLocaleString("id-ID")}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t pt-2">
              <p className="font-bold text-[#723c16]">
                Total: Rp{" "}
                {cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString("id-ID")}
              </p>
            </div>
          </>
        )}

        <button
          onClick={() => setShowCart(false)}
          className="mt-4 w-full bg-[#a35e20] text-white py-2 rounded hover:bg-[#723c16]"
        >
          Close Cart
        </button>

        {cart.length > 0 && (
          <button
            onClick={() => {
              setShowCart(false);
              router.push("/confirmation-payment");
            }}
            className="mt-2 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Proses Pembayaran
          </button>
        )}
      </div>

    </>
  );
}

export default MenuPage;


// buat coba2
// {showCart && (
//   <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowCart(false)}></div>
// )}

// {showCart && (
//     <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-4 z-50 overflow-y-auto">
//       <h3 className="text-xl font-bold mb-4 text-[#723c16]">Your Cart</h3>
//       {cart.length === 0 ? (
//         <p className="text-gray-600">Cart is empty.</p>
//       ) : (
//         <>
//           <ul className="space-y-3">
//             {cart.map((item) => (
//               <li key={item.id} className="flex justify-between items-center border-b pb-2">
//                 <div>
//                   <p className="font-semibold text-black">{item.name}</p>
//                   <p className="text-sm text-gray-600">
//                     Qty: {item.quantity} — Rp {item.price.toLocaleString("id-ID")}
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => removeFromCart(item.id)}
//                   className="text-red-500 text-sm hover:underline"
//                 >
//                   Remove
//                 </button>
//               </li>
//             ))}
//           </ul>
//           <div className="mt-4 border-t pt-2">
//             <p className="font-bold text-[#723c16]">
//               Total: Rp{" "}
//               {cart
//                 .reduce((sum, item) => sum + item.price * item.quantity, 0)
//                 .toLocaleString("id-ID")}
//             </p>
//           </div>
//         </>
//       )}

//       <button
//         onClick={() => setShowCart(false)}
//         className="mt-4 w-full bg-[#a35e20] text-white py-2 rounded hover:bg-[#723c16]"
//       >
//         Close Cart
//       </button>


//       {cart.length > 0 && (
//         <button
//           onClick={() => {
//             setShowCart(false);
//             router.push("/payment");
//           }}
//           className="mt-2 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
//         >
//           Proses Pembayaran
//         </button>
//       )}
//     </div>
//   )}

