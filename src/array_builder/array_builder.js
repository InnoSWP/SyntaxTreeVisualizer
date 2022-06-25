export function get_parallel_array(tree)
{
    let array = [];

    if (tree.nodes.length === 0)
        return array;

    let max_depth = 0;
    for (let node of tree.nodes)
        max_depth = node.depth > max_depth ? node.depth : max_depth;
    max_depth++;

    for (let node of tree.nodes)
        array.push(create_row(node, max_depth));

    accumulation(array);

    return array;
}

function accumulation(array)
{
    for (let i = 1; i < array[0].length; i++)
    {
        let addition = 0;
        for (let row of array)
        {
            row[i] += addition;
            addition = row[i];
        }
    }
}

function create_row(node, max_depth)
{
    let row = [node.text];
    for (let i = 0; i < max_depth; i++)
        row.push(0);
    row[node.depth+1] = 1;

    return row;
}
