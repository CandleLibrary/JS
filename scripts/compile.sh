hydrocarbon compile\
    --threads 6\
    --out_path "./source/typescript/parser/parser.ts"\
    --type ts\
    --recognizer wasm\
    ./source/grammar/javascript.hcg

cp \
    ./source/typescript/parser/*.wasm\
    ./build/library/parser/