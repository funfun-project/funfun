'use client';

import { useEffect, useRef, useState } from 'react';

type Options = {
  minHeight: number;
  maxHeight: number;
  initialHeight: number;
  expandedOffset?: number;
  onHeightChange?: (h: number) => void;
  onHeightCommit?: (h: number) => void;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function useBottomSheetResize(opts: Options) {
  const {
    minHeight,
    maxHeight,
    initialHeight,
    expandedOffset = 70,
    onHeightChange,
    onHeightCommit,
  } = opts;

  const sheetRef = useRef<HTMLDivElement | null>(null);
  const handleRef = useRef<HTMLDivElement | null>(null);

  const [height, setHeight] = useState(() => clamp(initialHeight, minHeight, maxHeight));

  const heightRef = useRef(height);
  heightRef.current = height;

  const onHeightChangeRef = useRef(onHeightChange);
  const onHeightCommitRef = useRef(onHeightCommit);
  useEffect(() => {
    onHeightChangeRef.current = onHeightChange;
    onHeightCommitRef.current = onHeightCommit;
  }, [onHeightChange, onHeightCommit]);

  useEffect(() => {
    const handleEl = handleRef.current;
    const sheetEl = sheetRef.current;
    if (!handleEl || !sheetEl) return;

    const init = clamp(initialHeight, minHeight, maxHeight);

    const floor = init;

    sheetEl.style.height = `${init}px`;
    setHeight(init);

    sheetEl.style.transition = 'height 180ms ease';

    let dragging = false;
    let startY = 0;
    let startHeight = init;

    let canShrinkThisDrag = false;

    const EXPANDED_EPS = 6;

    handleEl.style.touchAction = 'none';

    const applyLive = (h: number) => {
      const next = clamp(h, floor, maxHeight);
      sheetEl.style.transition = 'none';
      sheetEl.style.height = `${next}px`;
      setHeight(next);
      onHeightChangeRef.current?.(next);
    };

    const applyCommit = (h: number) => {
      const next = clamp(h, floor, maxHeight);
      sheetEl.style.transition = 'height 180ms ease';
      sheetEl.style.height = `${next}px`;
      setHeight(next);
      onHeightCommitRef.current?.(next);
    };

    const computeExpandedHeight = () => {
      const target = window.innerHeight - expandedOffset; // 100vh - offset
      return clamp(target, floor, maxHeight);
    };

    const isAtExpanded = (h: number) => {
      const expandedH = computeExpandedHeight();
      return h >= expandedH - EXPANDED_EPS;
    };

    const endDrag = () => {
      if (!dragging) return;
      dragging = false;

      const current = heightRef.current;
      const expandedH = computeExpandedHeight();

      if (canShrinkThisDrag) {
        const mid = (init + expandedH) / 2;
        const finalH = current < mid ? init : expandedH;
        applyCommit(finalH);
      } else {
        const finalH = current > initialHeight ? expandedH : init;
        applyCommit(finalH);
      }

      canShrinkThisDrag = false;

      document.documentElement.style.userSelect = '';
      document.documentElement.style.cursor = '';
    };

    const onHandlePointerDown: (this: HTMLElement, ev: PointerEvent) => void = function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;

      dragging = true;
      startY = e.clientY;
      startHeight = heightRef.current;

      canShrinkThisDrag = isAtExpanded(startHeight);

      try {
        handleEl.setPointerCapture(e.pointerId);
      } catch (err) {
        console.log(err);
      }

      document.documentElement.style.userSelect = 'none';
      document.documentElement.style.cursor = 'ns-resize';
    };

    const onWindowPointerMove: (this: Window, ev: PointerEvent) => void = function (e) {
      if (!dragging) return;

      const deltaY = e.clientY - startY;
      const next = startHeight - deltaY;

      if (!canShrinkThisDrag && next < heightRef.current) return;

      applyLive(next);
    };

    const onWindowPointerUp: (this: Window, ev: PointerEvent) => void = function () {
      endDrag();
    };

    const onWindowPointerCancel: (this: Window, ev: PointerEvent) => void = function () {
      endDrag();
    };

    const ac = new AbortController();
    const { signal } = ac;

    handleEl.addEventListener('pointerdown', onHandlePointerDown, { signal });
    window.addEventListener('pointermove', onWindowPointerMove, { passive: true, signal });
    window.addEventListener('pointerup', onWindowPointerUp, { passive: true, signal });
    window.addEventListener('pointercancel', onWindowPointerCancel, { passive: true, signal });

    return () => {
      ac.abort();
      document.documentElement.style.userSelect = '';
      document.documentElement.style.cursor = '';
    };
  }, [minHeight, maxHeight, initialHeight, expandedOffset]);

  return { sheetRef, handleRef, height, setHeight };
}
