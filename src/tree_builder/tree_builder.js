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

        case "UnaryExpression":
            return build_unary_expression(obj, nodes, edges, depth+1);

        case "ArrayExpression":
            return build_array_expression(obj, nodes, edges, depth+1);

        case "ForOfStatement":
            return build_for_of_statement(obj, nodes, edges, depth+1);

        case "ClassDeclaration":
            return build_class_declaration(obj, nodes, edges, depth+1);

        case "MethodDefinition":
            return build_method_definition(obj, nodes, edges, depth+1);

        case "PropertyDefinition":
            return build_property_definition(obj, nodes, edges, depth+1);

        case "ThisExpression":
            return build_this_expression(obj, nodes, edges, depth+1);

        case "NewExpression":
            return build_new_expression(obj, nodes, edges, depth+1);

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
    else if (tmp.type === "ThisExpression")
        name = "this" + name;

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
        height: 25,
        obj: obj
    };
}

function build_body(obj, root, nodes, edges, depth)
{
    if (obj.type === "BlockStatement" || obj.type === "ClassBody")
        for (let child of obj.body)
        {
            edges.push({
                id: root+"->"+count,
                from: root+"",
                to: count+"",
                text: obj.type === "BlockStatement" ? "body" : ""
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

        let sub_result = get_tree(obj, nodes, edges, depth);
        nodes = sub_result.nodes;
        edges = sub_result.edges;
    }

    return {
        nodes: nodes,
        edges: edges
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

    let sub_result;
    for (let i = 0; i < obj.params.length; i++)
    {
        edges.push({
            id: root+"->"+count,
            from: root+"",
            to: count+"",
            text: "arg " + (i+1)
        });

        sub_result = get_tree(obj.params[i], nodes, edges, depth);
        nodes = sub_result.nodes;
        edges = sub_result.edges;
    }

    sub_result = build_body(obj.body, root, nodes, edges, depth);
    nodes = sub_result.nodes;
    edges = sub_result.edges;

    return {
        nodes: nodes,
        edges: edges
    };
}

function build_call_expression(obj, nodes, edges, depth)
{
    let root = count;

    let text = "call " + (obj.callee.type === "MemberExpression" ? get_member_expression_name(obj.callee) : obj.callee.type);
    nodes.push(create_node(obj, text, depth));

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
    if (obj.computed)
        return build_computed_member_expression(obj, nodes, edges, depth);

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

    let sub_result = build_body(obj, root, nodes, edges, depth);
    nodes = sub_result.nodes;
    edges = sub_result.edges;

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

    sub_result = build_body(obj.consequent, root, nodes, edges, depth);
    nodes = sub_result.nodes;
    edges = sub_result.edges;

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

    let sub_result;
    if (obj.init != null)
    {
        edges.push({
            id: root+"->"+count,
            from: root+"",
            to: count+"",
            text: "init"
        });

        sub_result = get_tree(obj.init, nodes, edges, depth);
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

        sub_result = get_tree(obj.test, nodes, edges, depth);
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

        sub_result = get_tree(obj.update, nodes, edges, depth);
        nodes = sub_result.nodes;
        edges = sub_result.edges;
    }

    sub_result = build_body(obj.body, root, nodes, edges, depth);
    nodes = sub_result.nodes;
    edges = sub_result.edges;

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

    sub_result = build_body(obj.body, root, nodes, edges, depth);
    nodes = sub_result.nodes;
    edges = sub_result.edges;

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

function build_unary_expression(obj, nodes, edges, depth)
{
    return build_update_expression(obj, nodes, edges, depth);
}

function build_computed_member_expression(obj, nodes, edges, depth)
{
    let root = count;

    nodes.push(create_node(obj, get_member_expression_name(obj.object) + "[...]", depth));

    edges.push({
        id: root+"->"+count,
        from: root+"",
        to: count+""
    });

    let sub_result = get_tree(obj.property, nodes, edges, depth);
    nodes = sub_result.nodes;
    edges = sub_result.edges;

    return {
        nodes: nodes,
        edges: edges
    };
}

function build_array_expression(obj, nodes, edges, depth)
{
    let root = count;

    nodes.push(create_node(obj, "[" + (obj.elements.length === 0 ? "" : "...") + "]", depth));

    for (let i = 0; i < obj.elements.length; i++)
    {
        edges.push({
            id: root+"->"+count,
            from: root+"",
            to: count+"",
            text: "elem" + (i+1)
        });

        let sub_result = get_tree(obj.elements[i], nodes, edges, depth);
        nodes = sub_result.nodes;
        edges = sub_result.edges;
    }

    return {
        nodes: nodes,
        edges: edges
    };
}

function build_for_of_statement(obj, nodes, edges, depth)
{
    let root = count;

    nodes.push(create_node(obj, "for", depth));

    edges.push({
        id: root+"->"+count,
        from: root+"",
        to: count+"",
        text: "init"
    });

    let sub_result = get_tree(obj.left, nodes, edges, depth);
    nodes = sub_result.nodes;
    edges = sub_result.edges;

    edges.push({
        id: root+"->"+count,
        from: root+"",
        to: count+"",
        text: "of"
    });

    sub_result = get_tree(obj.right, nodes, edges, depth);
    nodes = sub_result.nodes;
    edges = sub_result.edges;

    sub_result = build_body(obj.body, root, nodes, edges, depth);
    nodes = sub_result.nodes;
    edges = sub_result.edges;

    return {
        nodes: nodes,
        edges: edges
    };
}

function build_method_definition(obj, nodes, edges, depth)
{
    let root = count;

    let text = obj.kind + (obj.kind === "method" ? " " + obj.key.name : "");
    nodes.push(create_node(obj, text, depth));

    let sub_result;
    for (let i = 0; i < obj.value.params.length; i++)
    {
        edges.push({
            id: root+"->"+count,
            from: root+"",
            to: count+"",
            text: "arg " + (i+1)
        });

        sub_result = get_tree(obj.value.params[i], nodes, edges, depth);
        nodes = sub_result.nodes;
        edges = sub_result.edges;
    }

    sub_result = build_body(obj.value.body, root, nodes, edges, depth);
    nodes = sub_result.nodes;
    edges = sub_result.edges;

    return {
        nodes: nodes,
        edges: edges
    };
}

function build_property_definition(obj, nodes, edges, depth)
{
    let root = count;

    nodes.push(create_node(obj, "property " + obj.key.name + (obj.value != null ? "=" : ""), depth));

    if (obj.value != null)
    {
        edges.push({
            id: root+"->"+count,
            from: root+"",
            to: count+"",
        });

        let sub_result = get_tree(obj.value, nodes, edges, depth);
        nodes = sub_result.nodes;
        edges = sub_result.edges;
    }

    return {
        nodes: nodes,
        edges: edges
    };
}

function build_class_declaration(obj, nodes, edges, depth)
{
    let root = count;

    nodes.push(create_node(obj, "class " + obj.id.name, depth));

    let sub_result;
    if (obj.superClass != null)
    {
        edges.push({
            id: root+"->"+count,
            from: root+"",
            to: count+"",
            text: "super"
        });

        sub_result = get_tree(obj.superClass, nodes, edges, depth);
        nodes = sub_result.nodes;
        edges = sub_result.edges;
    }

    sub_result = build_body(obj.body, root, nodes, edges, depth);
    nodes = sub_result.nodes;
    edges = sub_result.edges;

    return {
        nodes: nodes,
        edges: edges
    };
}

function build_this_expression(obj, nodes, edges, depth)
{
    nodes.push(create_node(obj, "this", depth));

    return {
        nodes: nodes,
        edges: edges
    }
}

function build_new_expression(obj, nodes, edges, depth)
{
    let root = count;

    nodes.push(create_node(obj, "new " + obj.callee.name, depth));

    let sub_result;
    for (let i = 0; i < obj.arguments.length; i++)
    {
        edges.push({
            id: root+"->"+count,
            from: root+"",
            to: count+"",
            text: "arg " + (i+1)
        });

        sub_result = get_tree(obj.arguments[i], nodes, edges, depth);
        nodes = sub_result.nodes;
        edges = sub_result.edges;
    }

    return {
        nodes: nodes,
        edges: edges
    }
}
