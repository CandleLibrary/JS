export default function(string, tab_count = 1, indent = "    "){
	const indent_string = indent.repeat(tab_count);
	return indent_string + string.replace(/\n/g, "\n" + indent_string);
}; // 4 Spaces per tab default