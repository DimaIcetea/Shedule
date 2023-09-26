export async function sleep(ms: number) {
    await new Promise<void>((res) => {
        const id = setTimeout(() => {
          res();
          clearTimeout(id);
        }, ms);
      });
}

export function objectHasValue(obj: object, value: unknown) {
    for (const key of Object.keys(obj)) {
        if (obj[key as keyof typeof obj] === value) return true
    }
    return false
}