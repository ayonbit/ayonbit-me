type AsyncFunction<T = unknown> = (...args: unknown[]) => Promise<T>;

export function debounce<TArgs extends unknown[], TReturn>(
  func: (...args: TArgs) => TReturn,
  wait: number,
  immediate = false,
): (...args: TArgs) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: TArgs): void => {
    const later = (): void => {
      timeoutId = null;

      if (!immediate) {
        func(...args);
      }
    };

    const callNow = immediate && !timeoutId;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(later, wait);

    if (callNow) {
      func(...args);
    }
  };
}

export function asyncDebounce<T extends AsyncFunction>(
  func: T,
  wait: number,
  immediate = false,
): (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  let pendingResolves: Array<(value: Awaited<ReturnType<T>>) => void> = [];

  return (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    return new Promise((resolve) => {
      pendingResolves.push(resolve);

      const later = async (): Promise<void> => {
        timeoutId = null;

        if (!immediate) {
          const result = (await func(...args)) as Awaited<ReturnType<T>>;

          pendingResolves.forEach((r) => r(result));

          pendingResolves = [];
        }
      };

      const callNow = immediate && !timeoutId;

      timeoutId = setTimeout(later, wait);

      if (callNow) {
        (async () => {
          const result = (await func(...args)) as Awaited<ReturnType<T>>;

          pendingResolves.forEach((r) => r(result));

          pendingResolves = [];
        })();
      }
    });
  };
}
