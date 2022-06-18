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

        case "Identifier":
            return build_identifier(obj, nodes, edges);

        case "VariableDeclaration":
            return build_variable_declaration(obj, nodes, edges);

        case "VariableDeclarator":
            return build_variable_declarator(obj, nodes, edges);

        case "FunctionDeclaration":
            return build_function_declaration(obj, nodes, edges);

        case "CallExpression":
            return build_call_expression(obj, nodes, edges);

        case "MemberExpression":
            return build_member_expression(obj, nodes, edges);

        case "IfStatement":
            return build_if_statement(obj, nodes, edges);

        case "ForStatement":
            return build_for_statement(obj, nodes, edges);

        case "UpdateExpression":
            return build_update_expression(obj, nodes, edges);

        case "WhileStatement":
            return build_while_statement(obj, nodes, edges);

        case "LogicalExpression":
            return build_logical_expression(obj, nodes, edges);

        case "ReturnStatement":
            return build_return_statement(obj, nodes, edges);

        case "AssignmentExpression":
            return build_assignment_expression(obj, nodes, edges);

        default:
            return build_default(obj, nodes, edges);
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

function build_default(obj, nodes, edges)
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

function build_program(obj, nodes, edges)
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

        if (child.type === "EmptyStatement")
            continue;

        edges.push({
            id: root+"->"+count,
            from: root+"",
            to: count+"",
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

function build_binary_expression(obj, nodes, edges)
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

function build_literal(obj, nodes, edges)
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

function build_identifier(obj, nodes, edges)
{
    nodes.push({
        id: count+"",
        text: obj.name
    });
    count++;

    return {
        nodes: nodes,
        edges: edges
    };
}

function build_variable_declaration(obj, nodes, edges)
{
    let root = count;

    nodes.push({
        id: count+"",
        text: obj.kind
    });
    count++;

    for (let i = 0; i < obj.declarations.length; i++)
    {
        edges.push({
            id: root+"->"+count,
            from: root+"",
            to: count+""
        });

        let sub_result = get_tree(obj.declarations[i], nodes, edges);
        nodes = sub_result.nodes;
        edges = sub_result.edges;
    }

    return {
        nodes: nodes,
        edges: edges
    };
}

function build_variable_declarator(obj, nodes, edges)
{
    let root = count;

    nodes.push({
        id: count+"",
        text: obj.id.name + (obj.init != null ? "=" : "")
    });
    count++;

    if (obj.init != null)
    {
        edges.push({
            id: root+"->"+count,
            from: root+"",
            to: count+""
        });

        let sub_result = get_tree(obj.init, nodes, edges);
        nodes = sub_result.nodes;
        edges = sub_result.edges;
    }

    return {
        nodes: nodes,
        edges: edges
    };
}

function build_function_declaration(obj, nodes, edges)
{
    let root = count;

    nodes.push({
        id: count+"",
        text: "function " + obj.id.name
    });
    count++;

    for (let i = 0; i < obj.params.length; i++)
    {
        edges.push({
            id: root+"->"+count,
            from: root+"",
            to: count+"",
            text: "arg " + (i+1)
        });

        let sub_result = get_tree(obj.params[i], nodes, edges);
        nodes = sub_result.nodes;
        edges = sub_result.edges;
    }

    for (let i = 0; i < obj.body.body.length; i++)
    {
        edges.push({
            id: root+"->"+count,
            from: root+"",
            to: count+"",
            text: "body"
        });

        let sub_result = get_tree(obj.body.body[i], nodes, edges);
        nodes = sub_result.nodes;
        edges = sub_result.edges;
    }


    return {
        nodes: nodes,
        edges: edges
    };
}

function build_call_expression(obj, nodes, edges)
{
    let root = count;

    nodes.push({
        id: count+"",
        text: "call " + get_member_expression_name(obj.callee)
    });
    count++;

    for (let i = 0; i < obj.arguments.length; i++)
    {
        edges.push({
            id: root+"->"+count,
            from: root+"",
            to: count+"",
            text: "arg " + (i + 1)
        });

        let sub_result = get_tree(obj.arguments[i], nodes, edges);
        nodes = sub_result.nodes;
        edges = sub_result.edges;
    }

    return {
        nodes: nodes,
        edges: edges
    };
}

function build_member_expression(obj, nodes, edges)
{
    nodes.push({
        id: count+"",
        text: get_member_expression_name(obj)
    });
    count++;

    return {
        nodes: nodes,
        edges: edges
    };
}

function build_else_block(obj, nodes, edges)
{
    let root = count;

    nodes.push({
        id: count+"",
        text: "else"
    });
    count++;

    if (obj.type === "ExpressionStatement")
    {
        edges.push({
            id: root+"->"+count,
            from: root+"",
            to: count+"",
        });

        let sub_result = get_tree(obj.expression, nodes, edges);
        nodes = sub_result.nodes;
        edges = sub_result.edges;
    }
    else
        for (let i = 0; i < obj.body.length; i++)
        {
            edges.push({
                id: root+"->"+count,
                from: root+"",
                to: count+"",
                text: "body"
            });

            let sub_result = get_tree(obj.body[i], nodes, edges);
            nodes = sub_result.nodes;
            edges = sub_result.edges;
        }



    return {
        nodes: nodes,
        edges: edges
    };
}

function build_if_statement(obj, nodes, edges)
{
    let root = count;

    nodes.push({
        id: count+"",
        text: "if"
    });
    count++;

    edges.push({
        id: root+"->"+count,
        from: root+"",
        to: count+"",
        text: "condition"
    });

    let sub_result = get_tree(obj.test, nodes, edges);
    nodes = sub_result.nodes;
    edges = sub_result.edges;

    if (obj.consequent.type === "ExpressionStatement")
    {
        edges.push({
            id: root+"->"+count,
            from: root+"",
            to: count+"",
            text: "body"
        });

        let sub_result = get_tree(obj.consequent.expression, nodes, edges);
        nodes = sub_result.nodes;
        edges = sub_result.edges;
    }
    else
        for (let i = 0; i < obj.consequent.body.length; i++)
        {
            edges.push({
                id: root+"->"+count,
                from: root+"",
                to: count+"",
                text: "body"
            });

            let sub_result = get_tree(obj.consequent.body[i], nodes, edges);
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

        let sub_result = build_else_block(obj.alternate, nodes, edges);
        nodes = sub_result.nodes;
        edges = sub_result.edges;
    }

    return {
        nodes: nodes,
        edges: edges
    };
}


function build_for_statement(obj, nodes, edges)
{
    let root = count;

    nodes.push({
        id: count+"",
        text: "for"
    });
    count++;

    if (obj.init != null)
    {
        edges.push({
            id: root+"->"+count,
            from: root+"",
            to: count+"",
            text: "init"
        });

        let sub_result = get_tree(obj.init, nodes, edges);
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

        let sub_result = get_tree(obj.test, nodes, edges);
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

        let sub_result = get_tree(obj.update, nodes, edges);
        nodes = sub_result.nodes;
        edges = sub_result.edges;
    }

    if (obj.body.type === "ExpressionStatement")
    {
        edges.push({
            id: root+"->"+count,
            from: root+"",
            to: count+"",
            text: "body"
        });

        let sub_result = get_tree(obj.body.expression, nodes, edges);
        nodes = sub_result.nodes;
        edges = sub_result.edges;
    }
    else
        for (let i = 0; i < obj.body.body.length; i++)
        {
            edges.push({
                id: root+"->"+count,
                from: root+"",
                to: count+"",
                text: "body"
            });

            let sub_result = get_tree(obj.body.body[i], nodes, edges);
            nodes = sub_result.nodes;
            edges = sub_result.edges;
        }

    return {
        nodes: nodes,
        edges: edges
    };
}

function build_update_expression(obj, nodes, edges)
{
    let root = count;

    if (obj.argument.type === "Identifier")
    {
        nodes.push({
            id: count+"",
            text: (obj.prefix ? obj.operator : "") +
                obj.argument.name +
                (!obj.prefix ? obj.operator : "")
        });
        count++;
    }
    else
    {
        nodes.push({
            id: count+"",
            text: (obj.prefix ? obj.operator : "") +
                "..." +
                (!obj.prefix ? obj.operator : "")
        });
        count++;

        edges.push({
            id: root+"->"+count,
            from: root+"",
            to: count+"",
        });

        let sub_result = get_tree(obj.argument, nodes, edges);
        nodes = sub_result.nodes;
        edges = sub_result.edges;
    }

    return {
        nodes: nodes,
        edges: edges
    };
}

function build_while_statement(obj, nodes, edges)
{
    let root = count;

    nodes.push({
        id: count+"",
        text: "while"
    });
    count++;

    edges.push({
        id: root+"->"+count,
        from: root+"",
        to: count+"",
        text: "condition"
    });

    let sub_result = get_tree(obj.test, nodes, edges);
    nodes = sub_result.nodes;
    edges = sub_result.edges;

    if (obj.body.type === "ExpressionStatement")
    {
        edges.push({
            id: root+"->"+count,
            from: root+"",
            to: count+"",
            text: "body"
        });

        let sub_result = get_tree(obj.body.expression, nodes, edges);
        nodes = sub_result.nodes;
        edges = sub_result.edges;
    }
    else
        for (let i = 0; i < obj.body.body.length; i++)
        {
            edges.push({
                id: root+"->"+count,
                from: root+"",
                to: count+"",
                text: "body"
            });

            let sub_result = get_tree(obj.body.body[i], nodes, edges);
            nodes = sub_result.nodes;
            edges = sub_result.edges;
        }

    return {
        nodes: nodes,
        edges: edges
    };
}

function build_logical_expression(obj, nodes, edges)
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

function build_return_statement(obj, nodes, edges)
{
    let root = count;

    nodes.push({
        id: count+"",
        text: "return"
    });
    count++;

    if (obj.argument != null)
    {
        edges.push({
            id: root+"->"+count,
            from: root+"",
            to: count+""
        });

        let sub_result = get_tree(obj.argument, nodes, edges);
        nodes = sub_result.nodes;
        edges = sub_result.edges;
    }

    return {
        nodes: nodes,
        edges: edges
    };
}

function build_assignment_expression(obj, nodes, edges)
{
    let root = count;

    if (obj.left.type === "Identifier")
    {
        nodes.push({
            id: count+"",
            text: obj.left.name + obj.operator
        });
        count++;

        edges.push({
            id: root+"->"+count,
            from: root+"",
            to: count+""
        });

        let sub_result = get_tree(obj.right, nodes, edges);
        nodes = sub_result.nodes;
        edges = sub_result.edges;
    }
    else
    {
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
    }

    return {
        nodes: nodes,
        edges: edges
    };
}
