for (const { node } of traverse(n, "nodes")
    .then(bit_filter("type", 1 << 15))
) {

}