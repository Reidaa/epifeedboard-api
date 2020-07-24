export function arrayContains<T>({thing, arrayOfThings}: {thing: T, arrayOfThings: T[]}): boolean {
    return (arrayOfThings.indexOf(thing) > -1);
}
