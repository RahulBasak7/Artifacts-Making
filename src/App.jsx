import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, ChevronRight, ChevronLeft, Heart } from "lucide-react";

const MOCK_MOBILES = [
  {
    id: "rm-narzo-n53",
    name: "Realme Narzo N53",
    price: 7499,
    source: "Gostor.com + others",
    img: "https://m.media-amazon.com/images/I/71DSxfKzkJL.jpg",
  },
  {
    id: "realme-c21y",
    name: "Realme C21Y",
    price: 5599,
    source: "Fliptwirls.com + others",
    img: "https://m.media-amazon.com/images/I/71yP50Z4KrL._AC_UF894,1000_QL80_.jpg",
  },
  {
    id: "motorola-g31",
    name: "Motorola G31",
    price: 7417,
    source: "amazon.in + others",
    img: "https://m.media-amazon.com/images/I/51UmP5fdZzL._AC_UF894,1000_QL80_.jpg",
  },
  {
    id: "xiaomi-redmi-10",
    name: "Xiaomi Redmi 10",
    price: 9299,
    source: "amazon.in + others",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhFSxkEYE9-6Ao1bAlpAgjMMGEqDeeEB_rFA&s",
  },
  {
    id: "samsung-m13",
    name: "Samsung Galaxy M13",
    price: 8999,
    source: "flipkart.com + others",
    img: "https://m.media-amazon.com/images/I/81KS+-vrBWL._AC_UF894,1000_QL80_.jpg",
  },
  {
    id: "poco-m4",
    name: "POCO M4 Pro",
    price: 12999,
    source: "amazon.in + others",
    img: "https://m.media-amazon.com/images/I/71dQzKo3XiL._AC_UF894,1000_QL80_.jpg",
  },
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const scrollRef = useRef(null);

  function addToCart(product) {
    setCart((c) => {
      const exists = c.find((x) => x.id === product.id);
      if (exists) return c.map((x) => (x.id === product.id ? { ...x, qty: x.qty + 1 } : x));
      return [...c, { ...product, qty: 1 }];
    });
  }

  function handleScroll() {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }

  function scrollNext() {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  }

  function scrollPrev() {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <header className="max-w-7xl mx-auto flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
            <span className="text-white text-lg">✓</span>
          </div>
          <h1 className="text-lg font-bold">Recommended Mobiles Under ₹15,000</h1>
        </div>
        <button
          aria-label="Open cart"
          className="relative inline-flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm bg-white"
        >
          <ShoppingCart size={18} />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center rounded-full bg-red-500 text-white text-xs w-5 h-5">
              {cart.length}
            </span>
          )}
        </button>
      </header>

      <main className="max-w-7xl mx-auto relative">
        <div className="relative">
          {/* Scrollable container */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {MOCK_MOBILES.map((m) => (
              <motion.article
                key={m.id}
                whileHover={{ scale: 1.02 }}
                className="flex-shrink-0 w-72 rounded-xl bg-white p-4 shadow-sm border border-gray-100"
              >
                <div className="relative">
                  <img
                    src={m.img}
                    alt={m.name}
                    className="w-full h-64 object-contain rounded-lg bg-gray-50"
                  />
                </div>

                <div className="mt-4">
                  <h2 className="font-semibold text-base">{m.name}</h2>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="text-lg font-bold">₹{m.price.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">• {m.source}</div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => addToCart(m)}
                      className="flex-1 rounded-lg py-2.5 px-4 font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm hover:shadow-md transition-shadow"
                    >
                      Add to Cart
                    </button>
                    <button className="w-11 h-11 rounded-lg flex items-center justify-center border border-gray-200 hover:bg-gray-50">
                      <Heart size={18} className="text-gray-600" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Left button */}
          {showLeftButton && (
            <button
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 border border-gray-200 z-10"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} className="text-gray-700" />
            </button>
          )}

          {/* Right button */}
          {showRightButton && (
            <button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 border border-gray-200 z-10"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} className="text-gray-700" />
            </button>
          )}
        </div>
      </main>

      {/* Cart summary (optional) */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
          <div className="text-sm font-semibold mb-2">Cart Items: {cart.length}</div>
          <div className="text-xs text-gray-600">
            Total: ₹{cart.reduce((sum, item) => sum + item.price * item.qty, 0).toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
}