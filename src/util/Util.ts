export type StringIndexable = { [x: string]: any; }
export function getKeysWithValueTrue(object: { [x: string]: any; }) {
    return Object.keys(object).filter(key => object[key] === true).map((key) => {
        return key
    })
}

export function paginate(array: any[], page_size: number, page_number: number) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array?.slice((page_number - 1) * page_size, page_number * page_size);
}