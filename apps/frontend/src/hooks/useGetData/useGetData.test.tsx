import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, MockedFunction, vi } from 'vitest';
import { useGetData } from './useGetData';

global.fetch = vi.fn();

describe('useGetData', () => {
  describe('when lazy is true', () => {
    it('should not call getData on mount', () => {
      const { result } = renderHook(() =>
        useGetData({ endpoint: 'test', lazy: true }),
      );
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toBe(undefined);
      expect(result.current.error).toBe(undefined);
      expect(fetch).not.toHaveBeenCalled();
    });
    it('should call fetch when getData is called', async () => {
      const { result } = renderHook(() =>
        useGetData({ endpoint: 'test', lazy: true }),
      );
      await result.current.getData();
      expect(fetch).toHaveBeenCalled();
    });
  });
  describe('when lazy is false', () => {
    it('should call getData on mount', () => {
      renderHook(() => useGetData({ endpoint: 'test', lazy: false }));
      expect(fetch).toHaveBeenCalled();
    });
  });
  describe('when fetch is successful', () => {
    beforeEach(() => {
      (fetch as MockedFunction<() => Promise<any>>).mockResolvedValue({
        ok: true,
        json: async () => ({ data: 'test' }),
      });
    });
    it('should set data on success', async () => {
      const { result } = renderHook(() => useGetData({ endpoint: 'test' }));
      await waitFor(() =>
        expect(result.current.data).toEqual({ data: 'test' }),
      );
    });
  });
  describe('when fetch fails', () => {
    describe('when response is not ok', () => {
      beforeEach(() => {
        (fetch as MockedFunction<() => Promise<any>>).mockRejectedValue({
          ok: false,
          json: async () => ({ error: 'test' }),
        });
      });
      it('should set error on failure', async () => {
        const { result } = renderHook(() => useGetData({ endpoint: 'test' }));
        await waitFor(() =>
          expect(result.current.error).toEqual(
            new Error('An unknown error occurred: {"ok":false}'),
          ),
        );
      });
    });
    describe('when fetch throws', () => {
      it('should set error on failure', async () => {
        (fetch as MockedFunction<() => Promise<any>>).mockImplementation(() => {
          throw new Error('fetch failede for whatever reason');
        });
        const { result } = renderHook(() => useGetData({ endpoint: 'test' }));
        await waitFor(() =>
          expect(result.current.error).toEqual(
            new Error('fetch failede for whatever reason'),
          ),
        );
      });
    });
  });
  describe('when fetch is in progress', () => {
    beforeEach(() => {
      (fetch as MockedFunction<() => Promise<any>>).mockResolvedValue(
        new Promise(() => {}),
      );
    });
    it('should set loading to true', async () => {
      const { result } = renderHook(() => useGetData({ endpoint: 'test' }));
      expect(result.current.loading).toBe(true);
    });
  });
});
