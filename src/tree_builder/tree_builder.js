let count = 0;

export function get_tree(obj, nodes=[], edges=[])
{
    switch (obj.type)
    {
        case "Program":
            return build_program(obj, nodes, edges);

        case "ExpressionStatement":
            return get_tree(obj.expression, nodes, edges);

        case "BinaryExpression":
            return build_binary_expression(obj, nodes, edges);

        case "Literal":
            return build_literal(obj, nodes, edges);

        default:
            return build_default(obj, nodes, edges);
    }
}

function build_default(obj, nodes=[], edges=[])
{
    nodes.push({
        id: count+"",
        text: obj.type
    });
    count++;

    return {
        nodes: nodes,
        edges: edges
    };
}

function build_program(obj, nodes=[], edges=[])
{
    let root = count;

    nodes.push({
        id: count+"",
        text: "Program"
    });
    count++;

    for (let i = 0; i < obj.body.length; i++)
    {
        let child = obj.body[i];

        edges.push({
            id: root+"->"+count,
            from: root+"",
            to: count+""
        });

        let sub_result = get_tree(child, nodes, edges);
        nodes = sub_result.nodes;
        edges = sub_result.edges;
    }

    return {
        nodes: nodes,
        edges: edges
    };
}

function build_binary_expression(obj, nodes=[], edges=[])
{
    let root = count;

    nodes.push({
        id: count+"",
        text: obj.operator
    });
    count++;

    edges.push({
        id: root+"->"+count,
        from: root+"",
        to: count+""
    });

    let sub_result = get_tree(obj.left, nodes, edges);
    nodes = sub_result.nodes;
    edges = sub_result.edges;

    edges.push({
        id: root+"->"+count,
        from: root+"",
        to: count+""
    });

    sub_result = get_tree(obj.right, nodes, edges);
    nodes = sub_result.nodes;
    edges = sub_result.edges;

    return {
        nodes: nodes,
        edges: edges
    };
}

function build_literal(obj, nodes=[], edges=[])
{
    nodes.push({
        id: count+"",
        text: (typeof obj.value == "string" ? '"' : "") + obj.value+"" + (typeof obj.value == "string" ? '"' : "")
    });
    count++;

    return {
        nodes: nodes,
        edges: edges
    };
}
