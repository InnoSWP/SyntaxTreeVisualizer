let count = 0;

export function get_tree(obj, nodes=[], edges=[], depth=-1)
{
    if (depth === -1)
        count = 0;

    switch (obj.type)
    {
        case "Program":
            return build_program(obj, nodes, edges, depth+1);

        case "ExpressionStatement":
            return get_tree(obj.expression, nodes, edges, depth);

        case "BinaryExpression":
            return build_binary_expression(obj, nodes, edges, depth+1);

        case "Literal":
            return build_literal(obj, nodes, edges, depth+1);

        case "Identifier":
            return build_identifier(obj, nodes, edges, depth+1);

        case "VariableDeclaration":
            return build_variable_declaration(obj, nodes, edges, depth+1);

        case "VariableDeclarator":
            return build_variable_declarator(obj, nodes, edges, depth+1);

        case "FunctionDeclaration":
            return build_function_declaration(obj, nodes, edges, depth+1);

        case "CallExpression":
            return build_call_expression(obj, nodes, edges, depth+1);

        case "MemberExpression":
            return build_member_expression(obj, nodes, edges, depth+1);

        case "IfStatement":
            return build_if_statement(obj, nodes, edges, depth+1);

        case "ForStatement":
            return build_for_statement(obj, nodes, edges, depth+1);

        case "UpdateExpression":
            return build_update_expression(obj, nodes, edges, depth+1);

        case "WhileStatement":
            return build_while_statement(obj, nodes, edges, depth+1);

        case "LogicalExpression":
            return build_logical_expression(obj, nodes, edges, depth+1);

        case "ReturnStatement":
            return build_return_statement(obj, nodes, edges, depth+1);

        case "AssignmentExpression":
            return build_assignment_expression(obj, nodes, edges, depth+1);

        default:
            return build_default(obj, nodes, edges, depth+1);
    }
}

function get_member_expression_name(member_expression)
{
    let name = "";
    let tmp = member_expression;
    while (tmp.type === "MemberExpression")
    {
        name = name + "." + tmp.property.name;
        tmp = tmp.object;
    }
    if (tmp.type === "Identifier")
        name = tmp.name + name;

    if (name === "")
        name = "MemberExpression"

    return name;
}

function create_node(obj, text, depth)
{
    return {
        id: count+++"",
        text: text,
        depth: depth,
        start: obj.start,
        end: obj.end,
        height: 25
    };
}

function build_default(obj, nodes, edges, depth)
{
    nodes.push(create_node(obj, obj.type, depth));

    return {
        nodes: nodes,
        edges: edges
    };
}

function build_program(obj, nodes, edges, depth)
{
    let root = count;

    nodes.push(create_node(obj, "Program", depth));

    for (let child of obj.body)
    {
        if (child.type === "EmptyStatement")
            continue;

        edges.push({
            id: root+"->"+count,
            from: root+"",
            to: count+"",
        });

        let sub_result = get_tree(child, nodes, edges, depth);
        nodes = sub_result.nodes;
        edges = sub_result.edges;
    }

    return {
        nodes: nodes,
        edges: edges
    };
}

function build_binary_expression(obj, nodes, edges, depth)
{
    let root = count;

    nodes.push(create_node(obj, obj.operator, depth));

    edges.push({
        id: root+"->"+count,
        from: root+"",
        to: count+""
    });

    let sub_result = get_tree(obj.left, nodes, edges, depth);
    nodes = sub_result.nodes;
    edges = sub_result.edges;

    edges.push({
        id: root+"->"+count,
        from: root+"",
        to: count+""
    });

    sub_result = get_tree(obj.right, nodes, edges, depth);
    nodes = sub_result.nodes;
    edges = sub_result.edges;

    return {
        nodes: nodes,
        edges: edges
    };
}

function build_literal(obj, nodes, edges, depth)
{
    nodes.push(create_node(obj, (typeof obj.value == "string" ? '"' : "") + obj.value+"" + (typeof obj.value == "string" ? '"' : ""), depth));

    return {
        nodes: nodes,
        edges: edges
    };
}

function build_identifier(obj, nodes, edges, depth)
{
    nodes.push(create_node(obj, obj.name, depth));

    return {
        nodes: nodes,
        edges: edges
    };
}

function build_variable_declaration(obj, nodes, edges, depth)
{
    let root = count;

    nodes.push(create_node(obj, obj.kind, depth));

    for (let declaration of obj.declarations)
    {
        edges.push({
            id: root+"->"+count,
            from: root+"",
            to: count+""
        });

        let sub_result = get_tree(declaration, nodes, edges, depth);
        nodes = sub_result.nodes;
        edges = sub_result.edges;
    }

    return {
        nodes: nodes,
        edges: edges
    };
}

function build_variable_declarator(obj, nodes, edges, depth)
{
    let root = count;

    nodes.push(create_node(obj, obj.id.name + (obj.init != null ? "=" : ""), depth));

    if (obj.init != null)
    {
        edges.push({
            id: root+"->"+count,
            from: root+"",
            to: count+""
        });

        let sub_result = get_tree(obj.init, nodes, edges, depth);
        nodes = sub_result.nodes;
        edges = sub_result.edges;
    }

    return {
        nodes: nodes,
        edges: edges
    };
}

function build_function_declaration(obj, nodes, edges, depth)
{
    let root = count;

    nodes.push(create_node(obj, "function " + obj.id.name, depth));

    for (let i = 0; i < obj.params.length; i++)
    {
        edges.push({
            id: root+"->"+count,
            from: root+"",
            to: count+"",
            text: "arg " + (i+1)
        });

        let sub_result = get_tree(obj.params[i], nodes, edges, depth);
        nodes = sub_result.nodes;
        edges = sub_result.edges;
    }

    for (let child of obj.body.body)
    {
        edges.push({
            id: root+"->"+count,
            from: root+"",
            to: count+"",
            text: "body"
        });

        let sub_result = get_tree(child, nodes, edges, depth);
        nodes = sub_result.nodes;
        edges = sub_result.edges;
    }


    return {
        nodes: nodes,
        edges: edges
    };
}

function build_call_expression(obj, nodes, edges, depth)
{
    let root = count;

    nodes.push(create_node(obj, "call " + get_member_expression_name(obj.callee), depth));

    for (let i = 0; i < obj.arguments.length; i++)
    {
        edges.push({
            id: root+"->"+count,
            from: root+"",
            to: count+"",
            text: "arg " + (i + 1)
        });

        let sub_result = get_tree(obj.arguments[i], nodes, edges, depth);
        nodes = sub_result.nodes;
        edges = sub_result.edges;
    }

    return {
        nodes: nodes,
        edges: edges
    };
}

function build_member_expression(obj, nodes, edges, depth)
{
    nodes.push(create_node(obj, get_member_expression_name(obj), depth));

    return {
        nodes: nodes,
        edges: edges
    };
}

function build_else_block(obj, nodes, edges, depth)
{
    let root = count;

    nodes.push(create_node(obj, "else", depth));

    if (obj.type === "BlockStatement")
        for (let child of obj.body)
        {
            edges.push({
                id: root+"->"+count,
                from: root+"",
                to: count+"",
                text: "body"
            });

            let sub_result = get_tree(child, nodes, edges, depth);
            nodes = sub_result.nodes;
            edges = sub_result.edges;
        }
    else
    {
        edges.push({
            id: root+"->"+count,
            from: root+"",
            to: count+"",
        });

        let sub_result = get_tree(obj, nodes, edges, depth);
        nodes = sub_result.nodes;
        edges = sub_result.edges;
    }

    return {
        nodes: nodes,
        edges: edges
    };
}

function build_if_statement(obj, nodes, edges, depth)
{
    let root = count;

    nodes.push(create_node(obj, "if", depth));

    edges.push({
        id: root+"->"+count,
        from: root+"",
        to: count+"",
        text: "condition"
    });

    let sub_result = get_tree(obj.test, nodes, edges, depth);
    nodes = sub_result.nodes;
    edges = sub_result.edges;

    if (obj.consequent.type === "BlockStatement")
        for (let child of obj.consequent.body)
        {
            edges.push({
                id: root+"->"+count,
                from: root+"",
                to: count+"",
                text: "body"
            });

            sub_result = get_tree(child, nodes, edges, depth);
            nodes = sub_result.nodes;
            edges = sub_result.edges;
        }
    else
    {
        edges.push({
            id: root+"->"+count,
            from: root+"",
            to: count+"",
            text: "body"
        });

        sub_result = get_tree(obj.consequent, nodes, edges, depth);
        nodes = sub_result.nodes;
        edges = sub_result.edges;
    }

    if (obj.alternate != null)
    {
        edges.push({
            id: root+"->"+count,
            from: root+"",
            to: count+"",
        });

        sub_result = build_else_block(obj.alternate, nodes, edges, depth);
        nodes = sub_result.nodes;
        edges = sub_result.edges;
    }

    return {
        nodes: nodes,
        edges: edges
    };
}


function build_for_statement(obj, nodes, edges, depth)
{
    let root = count;

    nodes.push(create_node(obj, "for", depth));

    if (obj.init != null)
    {
        edges.push({
            id: root+"->"+count,
            from: root+"",
            to: count+"",
            text: "init"
        });

        let sub_result = get_tree(obj.init, nodes, edges, depth);
        nodes = sub_result.nodes;
        edges = sub_result.edges;
    }

    if (obj.test != null)
    {
        edges.push({
            id: root+"->"+count,
            from: root+"",
            to: count+"",
            text: "condition"
        });

        let sub_result = get_tree(obj.test, nodes, edges, depth);
        nodes = sub_result.nodes;
        edges = sub_result.edges;
    }

    if (obj.update != null)
    {
        edges.push({
            id: root+"->"+count,
            from: root+"",
            to: count+"",
            text: "update"
        });

        let sub_result = get_tree(obj.update, nodes, edges, depth);
        nodes = sub_result.nodes;
        edges = sub_result.edges;
    }

    if (obj.body.type === "BlockStatement")
        for (let child of obj.body.body)
        {
            edges.push({
                id: root+"->"+count,
                from: root+"",
                to: count+"",
                text: "body"
            });

            let sub_result = get_tree(child, nodes, edges, depth);
            nodes = sub_result.nodes;
            edges = sub_result.edges;
        }
    else
    {
        edges.push({
            id: root+"->"+count,
            from: root+"",
            to: count+"",
            text: "body"
        });

        let sub_result = get_tree(obj.body, nodes, edges, depth);
        nodes = sub_result.nodes;
        edges = sub_result.edges;
    }

    return {
        nodes: nodes,
        edges: edges
    };
}

function build_update_expression(obj, nodes, edges, depth)
{
    let root = count;

    if (obj.argument.type === "Identifier")
    {
        nodes.push(create_node(obj,
            (obj.prefix ? obj.operator : "") +
            obj.argument.name +
            (!obj.prefix ? obj.operator : ""),
            depth));
    }
    else
    {
        nodes.push(create_node(obj,
            (obj.prefix ? obj.operator : "") +
            "..." +
            (!obj.prefix ? obj.operator : ""),
            depth));

        edges.push({
            id: root+"->"+count,
            from: root+"",
            to: count+"",
        });

        let sub_result = get_tree(obj.argument, nodes, edges, depth);
        nodes = sub_result.nodes;
        edges = sub_result.edges;
    }

    return {
        nodes: nodes,
        edges: edges
    };
}

function build_while_statement(obj, nodes, edges, depth)
{
    let root = count;

    nodes.push(create_node(obj, "while", depth));

    edges.push({
        id: root+"->"+count,
        from: root+"",
        to: count+"",
        text: "condition"
    });

    let sub_result = get_tree(obj.test, nodes, edges, depth);
    nodes = sub_result.nodes;
    edges = sub_result.edges;

    if (obj.body.type === "BlockStatement")
        for (let child of obj.body.body)
        {
            edges.push({
                id: root+"->"+count,
                from: root+"",
                to: count+"",
                text: "body"
            });

            sub_result = get_tree(child, nodes, edges, depth);
            nodes = sub_result.nodes;
            edges = sub_result.edges;
        }
    else
    {
        edges.push({
            id: root+"->"+count,
            from: root+"",
            to: count+"",
            text: "body"
        });

        sub_result = get_tree(obj.body, nodes, edges, depth);
        nodes = sub_result.nodes;
        edges = sub_result.edges;
    }

    return {
        nodes: nodes,
        edges: edges
    };
}

function build_logical_expression(obj, nodes, edges, depth)
{
    return build_binary_expression(obj, nodes, edges, depth);
}

function build_return_statement(obj, nodes, edges, depth)
{
    let root = count;

    nodes.push(create_node(obj, "return", depth));

    if (obj.argument != null)
    {
        edges.push({
            id: root+"->"+count,
            from: root+"",
            to: count+""
        });

        let sub_result = get_tree(obj.argument, nodes, edges, depth);
        nodes = sub_result.nodes;
        edges = sub_result.edges;
    }

    return {
        nodes: nodes,
        edges: edges
    };
}

function build_assignment_expression(obj, nodes, edges, depth)
{
    if (obj.left.type === "Identifier")
    {
        let root = count;

        nodes.push(create_node(obj, obj.left.name + obj.operator, depth));

        edges.push({
            id: root+"->"+count,
            from: root+"",
            to: count+""
        });

        let sub_result = get_tree(obj.right, nodes, edges, depth);
        nodes = sub_result.nodes;
        edges = sub_result.edges;
    }
    else
    {
        return build_binary_expression(obj, nodes, edges, depth);
    }

    return {
        nodes: nodes,
        edges: edges
    };
}
