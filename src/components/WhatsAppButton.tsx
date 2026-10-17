import { useEffect, useRef, useState, type PointerEvent } from "react";

const WHATSAPP_NUMBER = "971541398983";
const WHATSAPP_MESSAGE = "Hello 1HALIQ, I'd like to enquire about a shipment.";

const DRAG_THRESHOLD = 6;
const EDGE_GAP = 8;

/**
 * Floating WhatsApp chat button. Sits in the bottom-right corner by default and can be
 * dragged anywhere on screen. A tap or click (without dragging) opens the chat.
 */
export function WhatsAppButton() {
  const ref = useRef<HTMLAnchorElement>(null);
  const drag = useRef<{ x: number; y: number; ox: number; oy: number; rect: DOMRect; moved: boolean } | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  // Phones only: distance from the screen bottom that keeps the button inside the blue hero.
  const [phoneBottom, setPhoneBottom] = useState<number | null>(null);
  // Stay hidden until the first measurement, so the button never visibly jumps into place.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const place = () => {
      const partners = document.getElementById("partners");
      if (window.innerWidth >= 640 || !partners) {
        setPhoneBottom(null);
      } else {
        const heroBottom = partners.getBoundingClientRect().top + window.scrollY;
        setPhoneBottom(Math.max(12, Math.round(window.innerHeight - heroBottom + 10)));
      }
      setReady(true);
    };
    const reset = () => {
      setOffset({ x: 0, y: 0 });
      place();
    };
    place();
    window.addEventListener("resize", reset);
    window.addEventListener("load", place);
    const observer = new ResizeObserver(place);
    observer.observe(document.body);
    return () => {
      window.removeEventListener("resize", reset);
      window.removeEventListener("load", place);
      observer.disconnect();
    };
  }, []);

  const onPointerDown = (e: PointerEvent<HTMLAnchorElement>) => {
    if (e.button !== 0 || !ref.current) return;
    ref.current.setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y, rect: ref.current.getBoundingClientRect(), moved: false };
  };

  const onPointerMove = (e: PointerEvent<HTMLAnchorElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (!d.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
    d.moved = true;
    // Keep the whole button inside the viewport.
    const minDx = EDGE_GAP - d.rect.left;
    const maxDx = window.innerWidth - EDGE_GAP - d.rect.right;
    const minDy = EDGE_GAP - d.rect.top;
    const maxDy = window.innerHeight - EDGE_GAP - d.rect.bottom;
    setOffset({
      x: d.ox + Math.min(Math.max(dx, minDx), maxDx),
      y: d.oy + Math.min(Math.max(dy, minDy), maxDy),
    });
  };

  const endDrag = () => {
    // Leave drag.current.moved readable for the click that may follow this pointerup.
    setTimeout(() => {
      drag.current = null;
    }, 0);
  };

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      ref={ref}
      href={href}
      draggable={false}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClick={(e) => {
        if (drag.current?.moved) e.preventDefault();
      }}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        opacity: ready ? 1 : 0,
        ...(phoneBottom !== null ? { bottom: phoneBottom } : {}),
      }}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
      className="group fixed bottom-3 right-3 z-50 transition-opacity duration-300 flex cursor-grab touch-none select-none flex-col items-center gap-1.5 rounded-full focus-visible:outline-none active:cursor-grabbing sm:bottom-5 sm:right-5"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/25 transition-transform group-hover:scale-105 group-focus-visible:ring-4 group-focus-visible:ring-[#25D366]/40 sm:h-16 sm:w-16">
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 sm:h-9 sm:w-9" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
      </span>
      <span className="rounded-full bg-white px-2.5 py-0.5 text-[0.68rem] font-bold leading-tight text-[#128C7E] shadow-md shadow-black/20 sm:text-xs">
        Chat with us
      </span>
    </a>
  );
}
