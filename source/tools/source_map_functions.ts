export function getLastLine(map: Array<number[]>) {
    if (map.length == 0)
        map.push([]);
    return map[map.length - 1];
};
export function addNewLines(map: Array<number[]>, number_of_lines: number) {
    getLastLine(map);
    for (let i = 0; i < number_of_lines; i++)
        map.push([]);
}
;
export function incrementColumn(map: Array<number[]>, column: number) {
    const ln = getLastLine(map);
    ln[ln.length - 5] += column;
}
;
export function addNewColumn(map: Array<number[]>, column: number, source_index: number = -1, original_line: number = 0, original_col: number = 0, name: string = "", names: Map<string, number> = null) {
    let name_index = -1;
    if (name && names) {
        if (!names.has(name))
            names.set(name, names.size);
        name_index = names.get(name);
    }
    if (column > 0)
        getLastLine(map).push(column, source_index, original_line, original_col, name_index);
}
;
