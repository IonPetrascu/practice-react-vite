import { renderHook, act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('возвращает начальное значение сразу', () => {
    const { result } = renderHook(() => useDebounce('hello'));

    expect(result.current).toBe('hello');
  });

  it('не обновляет значение до истечения задержки', () => {
    const { result, rerender } = renderHook<string, { value: string }>(
      ({ value }) => useDebounce(value),
      { initialProps: { value: 'hello' } },
    );

    rerender({ value: 'world' });

    expect(result.current).toBe('hello');
  });

  it('обновляет значение после истечения задержки', () => {
    const { result, rerender } = renderHook<string, { value: string }>(
      ({ value }) => useDebounce(value),
      { initialProps: { value: 'hello' } },
    );

    rerender({ value: 'world' });

    act(() => {
      vi.runAllTimers();
    });

    expect(result.current).toBe('world');
  });
});
